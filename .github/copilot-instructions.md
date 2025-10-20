Project: BragBoard — quick facts for AI coding agents

Keep guidance short and actionable. When changing code, prefer minimal, well-tested edits. Run backend and frontend locally before opening large PRs.

- Big picture
  - Full-stack app: FastAPI backend (backend/app) + React + Vite frontend (front_end/).
  - Backend exposes a single versioned router under `/api/v1` defined in `backend/app/api/v1/api.py`.
  - Frontend talks to backend via axios instances in `front_end/src/api/apiService.js` (baseURL: `http://127.0.0.1:8000/api/v1`).
  - DB: SQLAlchemy models live under `backend/app/models/` with a small many-to-many table `shoutout_recipients` used by `Shoutout` and `User`.

- Important files to reference
  - Backend entrypoint: `backend/app/main.py` (app instance, CORS, DB create_all).
  - Settings: `backend/app/core/config.py` (env-backed Settings; SECRET_KEY and DATABASE_URL come from .env).
  - Auth/security: `backend/app/core/security.py` (bcrypt hashing + JWT creation). Token payloads include `sub` and `exp`.
  - DB session: `backend/app/db/session.py` (SessionLocal, `get_db()` dependency for endpoints).
  - Key endpoints: `backend/app/api/v1/endpoints/*` (auth.py, users, shoutouts, analytics).
  - Frontend API wrapper: `front_end/src/api/apiService.js` — adds Authorization header from localStorage token.
  - Frontend auth provider: `front_end/src/contexts/AuthContext.jsx` — stores token in localStorage and calls `getCurrentUser()` on startup.

- Developer workflows (how to run)
  - Backend (requires Python venv and PostgreSQL):
    - Create `.env` with `DATABASE_URL` (postgresql://USER:PASSWORD@HOST/DB`) and `SECRET_KEY`.
    - Install deps: `pip install -r backend/requirements.txt`.
    - Run: `uvicorn app.main:app --reload` (app served at http://127.0.0.1:8000).
  - Frontend:
    - Install deps: `cd front_end && yarn install`.
    - Dev server: `yarn dev` (Vite default: http://localhost:5173).

- Project-specific conventions & patterns
  - OAuth2 token endpoint expects form fields `username` and `password` (backend uses `OAuth2PasswordRequestForm`). Frontend uses `loginUser` which posts `new URLSearchParams(credentials)`; ensure `credentials` maps `username` -> email.
  - Models are registered via imports in `backend/app/main.py` (import `app.models`) so Alembic-less create_all works during local dev — keep that import if adding models.
  - Passwords use passlib bcrypt via `get_password_hash` and `verify_password` in `core/security.py`.
  - JWTs created with `create_access_token(data={"sub": user.email})` — downstream code uses `sub` as identifier.
  - DB sessions: endpoints receive `db: Session = Depends(get_db())` from `backend/app/db/session.py` — prefer using that dependency in new endpoints.

- Integration notes & gotchas
  - CORS origins are configured in `backend/app/main.py` (localhost ports 5173 and 3000). If running frontend on a different host/port, update CORS origins.
  - Frontend axios baseURL is hard-coded to `http://127.0.0.1:8000/api/v1` in `front_end/src/api/apiService.js` — update when backend host/port changes.
  - DB connection string in `backend/app/db/session.py` currently contains a local placeholder. Use the `.env` `DATABASE_URL` instead for deployment / CI.
  - Token storage: frontend stores raw JWT in localStorage under `token`. Use `AuthContext` helpers `login(token)` / `logout()` when updating auth flows.

- Testing & safety
  - There are no automated test suites in repo root. When adding tests, mirror backend patterns: use `TestClient` from FastAPI and `SessionLocal` overrides to a test DB.
  - When changing auth or password hashing, include a quick manual verification step: register user -> login -> call `/users/me`.

- Examples (small, concrete)
  - Add a new endpoint that needs DB access:
    - Create route in `backend/app/api/v1/endpoints/your_module.py`.
    - Use `db: Session = Depends(get_db)` and import models from `app.models`.
  - Update frontend fetch to include auth:
    - Modify or add wrapper in `front_end/src/api/apiService.js`; token is already injected by interceptor using `localStorage.getItem('token')`.

If anything above is unclear or you want the file to include extra policies (PR style, commit message format, tests), say what to add and I'll iterate.
