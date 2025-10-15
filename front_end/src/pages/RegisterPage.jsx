import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/apiService.js';
import '../styles/RegisterStyles.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('employee');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    });
  }, [password]);

  const passwordsMatch = password && password === confirmPassword;
  const isPasswordValid = passwordValidation.length && passwordValidation.uppercase && passwordValidation.number;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch || !isPasswordValid) {
      setError("Please ensure passwords match and meet all strength requirements.");
      return;
    }
    setError(null);
    try {
      await registerUser({ name, email, password, department, role });
      alert('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const StrengthCheck = ({ text, isValid }) => (
    <div className={`strength-check ${isValid ? 'strength-valid' : 'strength-invalid'}`}>
      <svg width="16" height="16" style={{ marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isValid ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}></path></svg>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="brand-title">Create Account</h1>
          <p className="register-subtitle">Join BragBoard today</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" placeholder="Full Name" />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" placeholder="Company Email (e.g., you@company.com)" />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
              <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required className="form-input" style={{paddingLeft: '3.5rem'}}>
                <option value="" disabled>Select your department</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.51.056 1.02.083 1.531.083s1.02-.027 1.531-.083m-3.062 0c.205.022.41.033.618.033s.413-.011.618-.033m-4.244 5.042a2.122 2.122 0 013.258-2.062M15.828 17.155a2.122 2.122 0 01-3.258 2.062m-5.334-2.062a2.122 2.122 0 003.258-2.062" /></svg>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required className="form-input" style={{paddingLeft: '3.5rem'}}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* THIS IS THE CORRECTED PASSWORD SECTION */}
          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" placeholder="Password" />
            </div>
            {/* The strength meter is now outside the icon's container */}
            <div className="password-strength-meter">
              <StrengthCheck text="At least 8 characters" isValid={passwordValidation.length} />
              <StrengthCheck text="At least one uppercase letter" isValid={passwordValidation.uppercase} />
              <StrengthCheck text="At least one number" isValid={passwordValidation.number} />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="form-input" placeholder="Confirm Password" />
            </div>
          </div>

          <button type="submit" className="register-button" disabled={!passwordsMatch || !isPasswordValid}>
            Create Account
          </button>
        </form>
        <div className="register-link-container">
          Already have an account?{' '}
          <Link to="/login" className="register-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;