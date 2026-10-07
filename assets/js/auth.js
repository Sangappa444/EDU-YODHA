// =============================================================================
//  EDU YODHA — Authentication (Backend API + Google OAuth)
//  Backend: Express/MongoDB Atlas via JWT
//  Google Sign-In: Google Identity Services (GIS) — popup/One-Tap flow
// =============================================================================

// ── API Base URL ──────────────────────────────────────────────────────────────
// Dev (Localhost)  → 'http://localhost:5000'
// Production       → 'https://api.eduyodha.com'
const API_BASE_URL = (() => {
  const { hostname } = window.location;
  return (hostname === 'localhost' || hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://api.eduyodha.com';
})();

// Google OAuth Client ID (public-safe — visible in page source like any Google Sign-In site)
// The CLIENT SECRET lives ONLY in server/.env — never here.
const GOOGLE_CLIENT_ID = '713345187824-eivr9lt95h49hgaod3557hmuhndrdq17.apps.googleusercontent.com';

// ─────────────────────────────────────────────────────────────────────────────
// SESSION  (JWT + user stored in localStorage)
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'eduyodha_session';

function saveSession(token, user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH STATE
// ─────────────────────────────────────────────────────────────────────────────

function isLoggedIn() {
  const s = getSession();
  return !!(s && s.token && s.user);
}

function getCurrentUser() {
  const s = getSession();
  return s ? s.user : null;
}

function getToken() {
  const s = getSession();
  return s ? s.token : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// API HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

async function signUp(email, password, displayName) {
  const data = await apiPost('/api/auth/signup', { name: displayName, email, password });
  saveSession(data.token, data.user);
  return data.user;
}

async function login(email, password) {
  const data = await apiPost('/api/auth/login', { email, password });
  saveSession(data.token, data.user);
  return data.user;
}

async function loginWithGoogle(googleCredential) {
  const data = await apiPost('/api/auth/google', { credential: googleCredential });
  saveSession(data.token, data.user);
  return data.user;
}

async function sendPasswordReset(email) {
  await apiPost('/api/auth/forgot-password', { email });
}

async function logout() {
  try {
    const token = getToken();
    if (token) {
      fetch(`${API_BASE_URL}/api/auth/logout`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
  } catch (_) {}

  clearSession();

  // Revoke Google session so One-Tap doesn't auto-select next time
  try {
    if (window.google?.accounts?.id) {
      google.accounts.id.disableAutoSelect();
    }
  } catch (_) {}

  updateNavbarAuthState();

  // Redirect away from protected pages
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (['dashboard.html'].includes(currentPage)) {
    window.location.href = 'index.html';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// USER PROFILE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getUserDisplayName(user) {
  if (!user) return '';
  if (user.name) return user.name;
  return (user.email || '').split('@')[0] || 'Student';
}

function getUserInitials(user) {
  const name = getUserDisplayName(user);
  // Build initials from first letters of first two words
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR AUTH STATE
// Shows: Login button (logged out) | User avatar + name (logged in)
// Google users get their profile picture instead of initials
// ─────────────────────────────────────────────────────────────────────────────

function updateNavbarAuthState() {
  const user = getCurrentUser();

  const loginBtns  = document.querySelectorAll('.auth-login-btn');
  const userMenus  = document.querySelectorAll('.auth-user-menu');
  const uploadBtns = document.querySelectorAll('.trigger-upload-modal');
  const applyBtns  = document.querySelectorAll('.trigger-apply-modal');

  if (isLoggedIn() && user) {
    const name     = getUserDisplayName(user);
    const initials = getUserInitials(user);
    const picture  = user.picture || '';      // Google profile photo URL

    loginBtns.forEach(btn  => (btn.style.display = 'none'));
    userMenus.forEach(menu => (menu.style.display = 'flex'));

    // Update avatar: picture (Google users) OR coloured initials circle
    document.querySelectorAll('.auth-user-initials').forEach(el => {
      if (picture) {
        // Replace text initials with the actual Google profile photo
        el.textContent = '';
        el.style.cssText = `
          background-image: url('${picture}');
          background-size: cover;
          background-position: center;
          background-color: transparent;
          font-size: 0;
        `;
      } else {
        el.textContent = initials;
        el.style.cssText = '';
      }
    });

    // Update displayed name (truncate long names)
    document.querySelectorAll('.auth-user-name').forEach(el => {
      const firstName = name.split(' ')[0];   // show first name only in navbar
      el.textContent  = firstName;
    });

    // Unlock upload and apply buttons
    uploadBtns.forEach(btn => btn.removeAttribute('data-auth-required'));
    applyBtns.forEach(btn  => btn.removeAttribute('data-auth-required'));

    // Auto-fill logged in user info into application and upload forms if present
    const applyNameInput  = document.getElementById('applyFullName');
    const applyEmailInput = document.getElementById('applyEmail');
    const noteAuthorInput = document.getElementById('noteAuthor');
    if (applyNameInput && !applyNameInput.value)   applyNameInput.value = name;
    if (applyEmailInput && !applyEmailInput.value) applyEmailInput.value = user.email || '';
    if (noteAuthorInput && !noteAuthorInput.value) noteAuthorInput.value = name;

  } else {
    // Logged out state
    loginBtns.forEach(btn  => (btn.style.display = ''));
    userMenus.forEach(menu => (menu.style.display = 'none'));
    uploadBtns.forEach(btn => btn.setAttribute('data-auth-required', 'upload'));
    applyBtns.forEach(btn  => btn.setAttribute('data-auth-required', 'internship'));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH MODAL (Login / Signup / Forgot Password)
// ─────────────────────────────────────────────────────────────────────────────

function injectAuthModal() {
  if (document.getElementById('authModal')) return;

  const modal = document.createElement('div');
  modal.id        = 'authModal';
  modal.className = 'auth-modal-overlay';
  modal.setAttribute('role',       'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Login or Sign Up');

  modal.innerHTML = `
    <div class="auth-modal-card">

      <!-- Header -->
      <div class="auth-modal-header">
        <div class="auth-brand">
          <img src="assets/images/logo.png" alt="EDU YODHA" width="38" height="38">
          <div>
            <div class="auth-brand-title">EDU YODHA</div>
            <div class="auth-brand-sub">Empowering Students. Building Careers.</div>
          </div>
        </div>
        <button class="auth-modal-close" id="authModalClose" aria-label="Close">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Tabs -->
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Sign In</button>
        <button class="auth-tab"        data-tab="signup">Create Account</button>
      </div>

      <!-- Alert -->
      <div class="auth-alert" id="authAlert" style="display:none;"></div>

      <!-- Google Sign-In Container (Official GIS rendered button — No redirect_uri_mismatch) -->
      <div id="googleSignInBtnContainer" style="display:flex; justify-content:center; margin-bottom: 1rem; width:100%; min-height:44px;"></div>

      <!-- Divider -->
      <div class="auth-divider" id="authDivider"><span>or continue with email</span></div>

      <!-- ═══ LOGIN FORM ═══ -->
      <form class="auth-form active" id="loginForm" data-tab-form="login" novalidate>

        <div class="auth-form-group">
          <label class="auth-label" for="loginEmail">Email Address</label>
          <input type="email" id="loginEmail" class="auth-input"
            placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="loginEmailErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="loginPassword">Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="loginPassword" class="auth-input"
              placeholder="Enter your password" autocomplete="current-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="loginPassword" aria-label="Toggle visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="auth-field-error" id="loginPasswordErr"></span>
        </div>

        <div class="auth-form-row">
          <label class="auth-remember">
            <input type="checkbox" id="rememberMe"> Remember me
          </label>
          <button type="button" class="auth-forgot-link" id="forgotPasswordBtn">Forgot password?</button>
        </div>

        <button type="submit" class="auth-submit-btn" id="loginSubmitBtn">
          <span class="auth-btn-text">Sign In</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
              <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/>
            </svg>
          </span>
        </button>

        <p class="auth-switch-text">
          Don't have an account?
          <button type="button" class="auth-switch-btn" data-switch="signup">Create one free →</button>
        </p>
      </form>

      <!-- ═══ SIGNUP FORM ═══ -->
      <form class="auth-form" id="signupForm" data-tab-form="signup" novalidate>

        <div class="auth-form-group">
          <label class="auth-label" for="signupName">Full Name</label>
          <input type="text" id="signupName" class="auth-input"
            placeholder="e.g. Ananya Rao" autocomplete="name" required>
          <span class="auth-field-error" id="signupNameErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupEmail">Email Address</label>
          <input type="email" id="signupEmail" class="auth-input"
            placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="signupEmailErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupPassword">Create Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="signupPassword" class="auth-input"
              placeholder="Min 8 characters" autocomplete="new-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="signupPassword" aria-label="Toggle visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <div class="auth-password-strength"><div class="strength-fill" id="strengthFill"></div></div>
          <span class="auth-field-error" id="signupPasswordErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupConfirmPassword">Confirm Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="signupConfirmPassword" class="auth-input"
              placeholder="Re-enter password" autocomplete="new-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="signupConfirmPassword" aria-label="Toggle visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="auth-field-error" id="signupConfirmErr"></span>
        </div>

        <button type="submit" class="auth-submit-btn" id="signupSubmitBtn">
          <span class="auth-btn-text">Create Free Account</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
              <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/>
            </svg>
          </span>
        </button>

        <p class="auth-terms-text">
          By creating an account you agree to our
          <a href="terms-and-conditions.html" target="_blank">Terms</a> and
          <a href="privacy-policy.html" target="_blank">Privacy Policy</a>.
        </p>
        <p class="auth-switch-text">
          Already have an account?
          <button type="button" class="auth-switch-btn" data-switch="login">Sign In →</button>
        </p>
      </form>

      <!-- ═══ FORGOT PASSWORD FORM ═══ -->
      <form class="auth-form" id="forgotForm" data-tab-form="forgot" novalidate style="display:none;">
        <div class="auth-forgot-back">
          <button type="button" class="auth-back-btn" id="backToLoginBtn">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7-7l-7 7 7 7"/>
            </svg>
            Back to Login
          </button>
        </div>
        <h3 class="auth-forgot-title">Reset Password</h3>
        <p class="auth-forgot-desc">Enter your email and we'll send you a reset link.</p>

        <div class="auth-form-group">
          <label class="auth-label" for="forgotEmail">Email Address</label>
          <input type="email" id="forgotEmail" class="auth-input"
            placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="forgotEmailErr"></span>
        </div>

        <button type="submit" class="auth-submit-btn" id="forgotSubmitBtn">
          <span class="auth-btn-text">Send Reset Link</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
              <circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/>
            </svg>
          </span>
        </button>
      </form>

    </div>
  `;

  document.body.appendChild(modal);
  _bindModalEvents(modal);
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR INJECTION
// ─────────────────────────────────────────────────────────────────────────────

function injectNavbarAuthControls() {
  document.querySelectorAll('.nav-cta').forEach(navCta => {
    if (navCta.querySelector('.auth-login-btn')) return; // already done

    // ── Login button (shown when logged out) ──────────────────────────────
    const loginBtn = document.createElement('button');
    loginBtn.type      = 'button';
    loginBtn.className = 'btn auth-login-btn';
    loginBtn.style.cssText = [
      'display:inline-flex',
      'align-items:center',
      'gap:0.4rem',
      'font-size:0.82rem',
      'padding:0.48rem 1rem',
      'font-weight:700',
      'background:var(--accent-blue,#2563EB)',
      'color:#fff',
      'border:none',
      'border-radius:6px',
      'cursor:pointer',
      'white-space:nowrap',
    ].join(';');
    loginBtn.innerHTML = `
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      Login
    `;
    loginBtn.addEventListener('click', () => openAuthModal('login'));

    // ── User avatar + dropdown (shown when logged in) ─────────────────────
    const userMenu = document.createElement('div');
    userMenu.className    = 'auth-user-menu';
    userMenu.style.display = 'none';
    userMenu.innerHTML = `
      <button type="button" class="auth-avatar-btn" aria-label="Open user menu" aria-haspopup="true">
        <span class="auth-user-initials"></span>
        <span class="auth-user-name"></span>
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="auth-dropdown">
        <a href="dashboard.html" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
          </svg>
          My Dashboard
        </a>
        <a href="dashboard.html#uploads" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          My Uploads
        </a>
        <a href="dashboard.html#saved" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
          Saved Resources
        </a>
        <a href="dashboard.html#settings" class="auth-dropdown-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Account Settings
        </a>
        <div class="auth-dropdown-divider"></div>
        <button type="button" class="auth-dropdown-item auth-logout-item">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    `;

    // Insert before hamburger button
    const mobileToggle = navCta.querySelector('.mobile-toggle');
    if (mobileToggle) {
      navCta.insertBefore(loginBtn,  mobileToggle);
      navCta.insertBefore(userMenu,  mobileToggle);
    } else {
      navCta.appendChild(loginBtn);
      navCta.appendChild(userMenu);
    }

    // Avatar dropdown toggle
    const avatarBtn  = userMenu.querySelector('.auth-avatar-btn');
    const dropdown   = userMenu.querySelector('.auth-dropdown');
    const logoutItem = userMenu.querySelector('.auth-logout-item');

    avatarBtn?.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    logoutItem?.addEventListener('click', logout);

    // Close dropdown on outside click
    document.addEventListener('click', () => dropdown?.classList.remove('open'));
  });

  // Global event delegation for all static and dynamic auth controls
  document.addEventListener('click', e => {
    // 1. Sign In / Register buttons
    const signinBtn = e.target.closest('.trigger-auth-modal, .btn-auth-signin, .auth-login-btn');
    if (signinBtn && !signinBtn.hasAttribute('data-auth-required')) {
      e.preventDefault();
      openAuthModal('login');
      return;
    }

    // 2. Sign out buttons
    const logoutBtn = e.target.closest('.auth-logout-item');
    if (logoutBtn) {
      e.preventDefault();
      logout();
      return;
    }

    // 3. Avatar button toggle
    const avatarBtn = e.target.closest('.auth-avatar-btn');
    if (avatarBtn) {
      e.preventDefault();
      e.stopPropagation();
      const menu = avatarBtn.closest('.auth-user-menu');
      const dropdown = menu?.querySelector('.auth-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('open');
      }
    } else {
      // Close all dropdowns when clicking outside
      document.querySelectorAll('.auth-dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL OPEN / CLOSE / TABS
// ─────────────────────────────────────────────────────────────────────────────

function openAuthModal(tab = 'login') {
  if (!document.getElementById('authModal')) injectAuthModal();
  const modal = document.getElementById('authModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab);
  _renderGoogleButton();
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  clearAuthAlert();
  _clearAllFieldErrors();
}

function switchAuthTab(tab) {
  // Update tab button states
  document.querySelectorAll('.auth-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab));

  // Show/hide forms
  document.querySelectorAll('.auth-form').forEach(f => {
    if (f.dataset.tabForm === 'forgot') {
      f.style.display = 'none';
      f.classList.remove('active');
    } else {
      f.classList.toggle('active', f.dataset.tabForm === tab);
    }
  });

  // Show Google button + divider (hidden on forgot screen)
  _setGoogleDividerVisible(true);
  clearAuthAlert();
  _clearAllFieldErrors();
}

function _showForgotForm() {
  document.querySelectorAll('.auth-tab').forEach(t  => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => {
    f.classList.remove('active');
    f.style.display = 'none';
  });
  const ff = document.getElementById('forgotForm');
  if (ff) { ff.style.display = ''; ff.classList.add('active'); }
  _setGoogleDividerVisible(false);   // hide Google button on forgot-password screen
}

function _setGoogleDividerVisible(visible) {
  const container = document.getElementById('googleSignInBtnContainer');
  const divider   = document.getElementById('authDivider');
  const display   = visible ? 'flex' : 'none';
  if (container) container.style.display = display;
  if (divider)   divider.style.display   = visible ? '' : 'none';
}

// ─────────────────────────────────────────────────────────────────────────────
// BIND ALL MODAL EVENTS
// ─────────────────────────────────────────────────────────────────────────────

function _bindModalEvents(modal) {
  // Close button, overlay click, Escape key
  modal.querySelector('#authModalClose')?.addEventListener('click', closeAuthModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeAuthModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeAuthModal();
  });

  // Tab buttons
  modal.querySelectorAll('.auth-tab').forEach(tab =>
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab)));

  // Switch links ("Don't have an account? Create one →")
  modal.querySelectorAll('.auth-switch-btn').forEach(btn =>
    btn.addEventListener('click', () => switchAuthTab(btn.dataset.switch)));

  // Show/hide password toggle
  modal.querySelectorAll('.auth-show-hide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const show = (input.type === 'password');
      input.type = show ? 'text' : 'password';
      btn.querySelector('.eye-show').style.display = show ? 'none' : '';
      btn.querySelector('.eye-hide').style.display = show ? ''     : 'none';
    });
  });

  // Forgot password / back
  modal.querySelector('#forgotPasswordBtn')?.addEventListener('click', _showForgotForm);
  modal.querySelector('#backToLoginBtn')?.addEventListener('click', () => switchAuthTab('login'));

  // Password strength meter
  const pwInput = modal.querySelector('#signupPassword');
  if (pwInput) pwInput.addEventListener('input', () => _updateStrength(pwInput.value));

  // ── Google Sign-In button ────────────────────────────────────────────────
  modal.querySelector('#authGoogleBtn')?.addEventListener('click', _triggerGoogleSignIn);

  // ── LOGIN form submit ────────────────────────────────────────────────────
  modal.querySelector('#loginForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!_validateLoginForm()) return;

    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe')?.checked;

    _setLoading('loginSubmitBtn', true);
    clearAuthAlert();

    try {
      const user = await login(email, password);
      if (remember) localStorage.setItem('eduyodha_remember_email', email);
      _onLoginSuccess(user);
    } catch (err) {
      showAuthAlert('error', _friendlyError(err));
    } finally {
      _setLoading('loginSubmitBtn', false);
    }
  });

  // ── SIGNUP form submit ───────────────────────────────────────────────────
  modal.querySelector('#signupForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!_validateSignupForm()) return;

    const name     = document.getElementById('signupName').value.trim();
    const email    = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    _setLoading('signupSubmitBtn', true);
    clearAuthAlert();

    try {
      const user = await signUp(email, password, name);
      _onLoginSuccess(user, true);
    } catch (err) {
      showAuthAlert('error', _friendlyError(err));
    } finally {
      _setLoading('signupSubmitBtn', false);
    }
  });

  // ── FORGOT PASSWORD form submit ──────────────────────────────────────────
  modal.querySelector('#forgotForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      _showFieldError('forgotEmailErr', 'Please enter a valid email.');
      return;
    }
    _setLoading('forgotSubmitBtn', true);
    clearAuthAlert();
    try {
      await sendPasswordReset(email);
      showAuthAlert('success', '✉️ Reset link sent! Check your email inbox.');
    } catch (err) {
      showAuthAlert('error', _friendlyError(err));
    } finally {
      _setLoading('forgotSubmitBtn', false);
    }
  });
}

// Called after successful login or signup
function _onLoginSuccess(user, isNew = false) {
  const name = getUserDisplayName(user);
  const msg  = isNew
    ? `🎉 Welcome to EDU YODHA, ${name}!`
    : `👋 Welcome back, ${name}!`;
  showAuthAlert('success', msg);
  setTimeout(() => {
    closeAuthModal();
    updateNavbarAuthState();
  }, 900);
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE SIGN-IN (Official Google Identity Services - Rendered Button)
// ─────────────────────────────────────────────────────────────────────────────

function initGoogleSignIn() {
  if (typeof google === 'undefined' || !google.accounts?.id) return;
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.startsWith('YOUR_')) return;

  try {
    console.log('[Google Auth] Active Client ID:', GOOGLE_CLIENT_ID);
    console.log('[Google Auth] Current Origin (must match Google Cloud Authorized Origins):', window.location.origin);

    google.accounts.id.initialize({
      client_id:             GOOGLE_CLIENT_ID,
      callback:              _onGoogleCredential,
      auto_select:           false,
      cancel_on_tap_outside: true,
      itp_support:           true,
    });

    _renderGoogleButton();

    // Show One-Tap prompt if appropriate
    google.accounts.id.prompt();
  } catch (err) {
    console.warn('[Google Auth Init]', err);
  }
}

function _renderGoogleButton() {
  const container = document.getElementById('googleSignInBtnContainer');
  if (container && typeof google !== 'undefined' && google.accounts?.id) {
    try {
      container.innerHTML = '';
      google.accounts.id.renderButton(container, {
        type:           'standard',
        shape:          'rectangular',
        theme:          'outline',
        text:           'continue_with',
        size:           'large',
        logo_alignment: 'left',
        width:          Math.min(380, window.innerWidth - 60),
      });
    } catch (err) {
      console.warn('[Google renderButton]', err);
    }
  }
}

// Called when user selects their Google account
async function _onGoogleCredential(response) {
  if (!response?.credential) return;

  const modal = document.getElementById('authModal');
  const wasOpen = modal?.classList.contains('active');

  // If modal was closed when Google resolved (e.g. One-Tap), open it to show status
  if (!wasOpen) {
    if (!modal) injectAuthModal();
    document.getElementById('authModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  showAuthAlert('success', 'Verifying Google credentials…');

  try {
    const user = await loginWithGoogle(response.credential);
    _onLoginSuccess(user);
  } catch (err) {
    showAuthAlert('error', _friendlyError(err));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROTECTED ACTION GUARD (Internships & Notes Upload require login)
// ─────────────────────────────────────────────────────────────────────────────

function guardProtectedActions() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-auth-required]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    const actionType = btn.getAttribute('data-auth-required');
    openAuthModal('login');

    const msg = actionType === 'internship'
      ? '🔒 Please sign in first to apply for an internship.'
      : '🔒 Please sign in first to upload notes.';

    setTimeout(() => showAuthAlert('error', msg), 60);
  }, true);
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function _validateLoginForm() {
  let ok = true;
  const email = document.getElementById('loginEmail')?.value.trim();
  const pw    = document.getElementById('loginPassword')?.value;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    _showFieldError('loginEmailErr', 'Enter a valid email address.'); ok = false;
  } else _clearFieldError('loginEmailErr');

  if (!pw || pw.length < 6) {
    _showFieldError('loginPasswordErr', 'Password must be at least 6 characters.'); ok = false;
  } else _clearFieldError('loginPasswordErr');

  return ok;
}

function _validateSignupForm() {
  let ok = true;
  const name    = document.getElementById('signupName')?.value.trim();
  const email   = document.getElementById('signupEmail')?.value.trim();
  const pw      = document.getElementById('signupPassword')?.value;
  const confirm = document.getElementById('signupConfirmPassword')?.value;

  if (!name || name.length < 2) {
    _showFieldError('signupNameErr', 'Please enter your full name.'); ok = false;
  } else _clearFieldError('signupNameErr');

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    _showFieldError('signupEmailErr', 'Enter a valid email address.'); ok = false;
  } else _clearFieldError('signupEmailErr');

  if (!pw || pw.length < 8) {
    _showFieldError('signupPasswordErr', 'Password must be at least 8 characters.'); ok = false;
  } else _clearFieldError('signupPasswordErr');

  if (pw !== confirm) {
    _showFieldError('signupConfirmErr', 'Passwords do not match.'); ok = false;
  } else _clearFieldError('signupConfirmErr');

  return ok;
}

function _updateStrength(pw) {
  const fill = document.getElementById('strengthFill');
  if (!fill) return;
  let score = 0;
  if (pw.length >= 8)            score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  const colors = ['#EF4444','#F97316','#EAB308','#22C55E'];
  const widths  = ['25%','50%','75%','100%'];
  fill.style.width      = pw.length ? (widths[score-1]  || '10%')     : '0';
  fill.style.background = pw.length ? (colors[score-1]  || '#EF4444') : 'transparent';
}

// ─────────────────────────────────────────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function showAuthAlert(type, message) {
  const el = document.getElementById('authAlert');
  if (!el) return;
  el.className    = `auth-alert auth-alert-${type}`;
  el.textContent  = message;
  el.style.display = 'block';
}

function clearAuthAlert() {
  const el = document.getElementById('authAlert');
  if (el) { el.style.display = 'none'; el.textContent = ''; }
}

function _showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function _clearFieldError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = '';
}

function _clearAllFieldErrors() {
  ['loginEmailErr','loginPasswordErr','signupNameErr','signupEmailErr',
   'signupPasswordErr','signupConfirmErr','forgotEmailErr'].forEach(_clearFieldError);
}

function _setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  const text    = btn.querySelector('.auth-btn-text');
  const spinner = btn.querySelector('.auth-btn-spinner');
  if (text)    text.style.display    = loading ? 'none'        : '';
  if (spinner) spinner.style.display = loading ? 'inline-flex' : 'none';
}

function _friendlyError(err) {
  const msg = err?.message || '';
  if (msg.includes('Incorrect email') || msg.includes('invalid credentials'))
    return 'Incorrect email or password. Please try again.';
  if (msg.includes('already exists') || msg.includes('already registered'))
    return 'An account with this email already exists. Please sign in instead.';
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('ERR_CONNECTION'))
    return '⚠️ Cannot reach the server. Make sure the backend is running (cd server → npm start).';
  if (msg.includes('network') || msg.includes('fetch'))
    return 'Connection error. Please check your internet.';
  if (msg.includes('Google'))
    return 'Google Sign-In failed. Please try again or use email login.';
  if (msg.includes('not configured') || msg.includes('503'))
    return 'Auth service is not configured. Contact support.';
  if (msg.includes('not verified'))
    return 'Please verify your email address first.';
  return msg || 'Something went wrong. Please try again.';
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOTSTRAP — Safe init (works whether DOM is ready or not)
// ─────────────────────────────────────────────────────────────────────────────

function _authInit() {
  // 1. Load Google Identity Services script (async, non-blocking)
  if (!document.querySelector('script[src*="accounts.google.com/gsi"]')) {
    const s = document.createElement('script');
    s.src   = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = () => initGoogleSignIn();
    document.head.appendChild(s);
  } else if (typeof google !== 'undefined') {
    initGoogleSignIn();
  }

  // 2. Inject modal and navbar controls
  injectAuthModal();
  injectNavbarAuthControls();

  // 3. Reflect current login state immediately
  updateNavbarAuthState();

  // 4. Guard protected actions (upload notes & internship apply)
  guardProtectedActions();

  // 5. Restore remembered email in login form
  const remembered = localStorage.getItem('eduyodha_remember_email');
  if (remembered) {
    const input = document.getElementById('loginEmail');
    if (input) input.value = remembered;
  }

  // 6. Process OAuth redirect token if present in URL
  const urlParams = new URLSearchParams(window.location.search);
  const redirectToken = urlParams.get('token');
  if (redirectToken) {
    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${redirectToken}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          saveSession(redirectToken, data.user);
          updateNavbarAuthState();
          const cleanUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      })
      .catch(() => {});
  }
}

// readyState guard: fires immediately if DOM is ready, otherwise waits
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _authInit);
} else {
  _authInit();
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API  (window.EduYodhaAuth)
// Used by dashboard.html and any inline scripts
// ─────────────────────────────────────────────────────────────────────────────

window.EduYodhaAuth = {
  isLoggedIn,
  getCurrentUser,
  getToken,
  getUserDisplayName,
  getUserInitials,
  logout,
  openAuthModal,
  closeAuthModal,
  switchAuthTab,
  updateNavbarAuthState,
  showAuthAlert,
  clearAuthAlert,
};
