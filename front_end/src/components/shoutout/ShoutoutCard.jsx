import React, { useState } from 'react';
import { createComment, toggleReaction } from '../../api/apiService.js';

function SafeText(str, fallback = '') {
  try {
    if (typeof str === 'string') return str;
    if (str && typeof str === 'object') return String(str);
    return fallback;
  } catch (e) {
    return fallback;
  }
}

function ShoutoutCard({ shoutout = {}, onUpdate = () => {} }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Backend user model uses `full_name` and `email` fields
  const senderName = shoutout?.sender?.full_name ?? shoutout?.sender?.name ?? shoutout?.user?.full_name ?? shoutout?.user?.name ?? shoutout?.sender_name ?? shoutout?.sender?.email ?? SafeText(shoutout?.sender, 'Unknown');
  const createdAt = shoutout?.created_at ?? shoutout?.timestamp ?? shoutout?.createdAt ?? null;

  const reactions = Array.isArray(shoutout?.reactions) ? shoutout.reactions : [];
  const comments = Array.isArray(shoutout?.comments) ? shoutout.comments : [];

  const countReaction = (type) => reactions.filter((r) => r?.type === type).length;

  const handleReaction = async (type) => {
    try {
      await toggleReaction(shoutout?.id, { type });
      if (typeof onUpdate === 'function') onUpdate();
    } catch (err) {
      // Don't let a network error crash the whole component
      console.error('toggleReaction error', err);
      alert('Could not add reaction.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await createComment(shoutout?.id, { content: newComment });
      setNewComment('');
      if (typeof onUpdate === 'function') onUpdate();
    } catch (err) {
      console.error('createComment error', err);
      alert('Could not post comment.');
    }
  };

  // Compute initials from full name or email
  const computeInitials = (name) => {
    try {
      if (!name) return 'U';
      const parts = String(name).trim().split(/\s+/);
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } catch (e) {
      return 'U';
    }
  };

  return (
    <div className="shoutout-card">
      <div className="card-header">
        <div className="avatar">{computeInitials(senderName)}</div>
        <div className="sender-info">
          <p className="sender-name">{senderName}</p>
          <p className="timestamp">{createdAt ? new Date(createdAt).toLocaleString() : ''}</p>
        </div>
      </div>
      <p className="card-body">{SafeText(shoutout?.message ?? shoutout?.content ?? '')}</p>
      <div className="card-footer">
        <button onClick={() => handleReaction('like')}>👍 Like ({countReaction('like')})</button>
        <button onClick={() => handleReaction('clap')}>👏 Clap ({countReaction('clap')})</button>
        <button onClick={() => handleReaction('star')}>⭐️ Star ({countReaction('star')})</button>
        <button onClick={() => setShowComments(!showComments)} className="ml-auto">💬 Comment ({comments.length})</button>
      </div>
      {showComments && (
        <div className="comment-section">
          {comments.map((comment) => {
            const author = comment?.user?.full_name ?? comment?.user?.name ?? comment?.author_name ?? comment?.user?.email ?? 'Unknown';
            return (
              <div key={comment?.id ?? Math.random()} className="comment">
                <div className="avatar" style={{ width: '2rem', height: '2rem', marginRight: '0.75rem' }}>
                  {SafeText(computeInitials(author), 'U')}
                </div>
                <div>
                  <span className="font-semibold">{author}:</span> {SafeText(comment?.content ?? comment?.text ?? '')}
                </div>
              </div>
            );
          })}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="form-input" />
            <button type="submit" className="auth-button" style={{ width: 'auto', padding: '0.5rem 1rem' }}>Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ShoutoutCard;