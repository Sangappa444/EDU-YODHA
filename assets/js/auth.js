// =============================================================================
//  EDU YODHA — MongoDB Atlas App Services (Realm) Authentication
//  DO NOT expose secrets here. App ID is public-safe for Realm apps.
//  All sensitive data stays in MongoDB Atlas backend rules.
// =============================================================================

// ⚠️  REPLACE THIS with your actual MongoDB Atlas App Services App ID
//  Get it from: cloud.mongodb.com → App Services → Your App → App ID
const REALM_APP_ID = 'eduyodha-XXXXX'; // <-- Replace after Atlas setup

// Realm App instance (loaded via CDN in HTML)
let realmApp = null;

// Initialize Realm App
function initRealmApp() {
  if (typeof Realm === 'undefined') {
    console.warn('Realm SDK not loaded yet.');
    return null;
  }
  if (!realmApp) {
    realmApp = new Realm.App({ id: REALM_APP_ID });
  }
  return realmApp;
}

// ─── Auth State ──────────────────────────────────────────────────────────────

function getCurrentUser() {
  const app = initRealmApp();
  return app ? app.currentUser : null;
}

function isLoggedIn() {
  const user = getCurrentUser();
  return user && user.isLoggedIn;
}

// ─── Sign Up ─────────────────────────────────────────────────────────────────

async function signUp(email, password, displayName) {
  const app = initRealmApp();
  if (!app) throw new Error('Auth service not initialized.');

  // Register user with email/password
  await app.emailPasswordAuth.registerUser({ email, password });

  // Auto-login after signup
  const credentials = Realm.Credentials.emailPassword(email, password);
  const user = await app.logIn(credentials);

  // Save display name in custom user data (Firestore-like MongoDB document)
  if (displayName) {
    await saveUserProfile(user, { displayName, email, createdAt: new Date().toISOString() });
  }

  return user;
}

// ─── Login ───────────────────────────────────────────────────────────────────

async function login(email, password) {
  const app = initRealmApp();
  if (!app) throw new Error('Auth service not initialized.');

  const credentials = Realm.Credentials.emailPassword(email, password);
  const user = await app.logIn(credentials);
  return user;
}

// ─── Logout ──────────────────────────────────────────────────────────────────

async function logout() {
  const app = initRealmApp();
  if (!app) return;

  const user = app.currentUser;
  if (user) {
    await user.logOut();
  }

  // Update UI after logout
  updateNavbarAuthState();
  
  // Redirect to home if on protected page
  const protectedPages = ['dashboard.html'];
  const currentPage = window.location.pathname.split('/').pop();
  if (protectedPages.includes(currentPage)) {
    window.location.href = 'index.html';
  }
}

// ─── Password Reset ──────────────────────────────────────────────────────────

async function sendPasswordReset(email) {
  const app = initRealmApp();
  if (!app) throw new Error('Auth service not initialized.');

  await app.emailPasswordAuth.sendResetPasswordEmail({ email });
}

// ─── User Profile (MongoDB Firestore-like) ───────────────────────────────────

async function saveUserProfile(user, data) {
  try {
    // Call a Realm Function to save profile (secure server-side)
    await user.callFunction('saveUserProfile', [data]);
  } catch (err) {
    // Fallback: store in localStorage until Atlas function is set up
    const existing = getUserProfileLocal(user.id);
    localStorage.setItem(`eduyodha_user_${user.id}`, JSON.stringify({ ...existing, ...data }));
  }
}

async function getUserProfile(user) {
  try {
    const profile = await user.callFunction('getUserProfile', []);
    return profile;
  } catch (err) {
    // Fallback to localStorage
    return getUserProfileLocal(user.id);
  }
}

function getUserProfileLocal(userId) {
  try {
    const raw = localStorage.getItem(`eduyodha_user_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Get display name from profile or email
function getUserDisplayName(user) {
  if (!user) return '';
  const local = getUserProfileLocal(user.id);
  if (local && local.displayName) return local.displayName;
  const email = user.profile?.email || '';
  return email.split('@')[0] || 'Student';
}

function getUserInitials(user) {
  const name = getUserDisplayName(user);
  return name.slice(0, 2).toUpperCase();
}

// ─── Navbar Auth State ────────────────────────────────────────────────────────

function updateNavbarAuthState() {
  const user = getCurrentUser();
  const loginBtns = document.querySelectorAll('.auth-login-btn');
  const userMenus = document.querySelectorAll('.auth-user-menu');
  const userAvatars = document.querySelectorAll('.auth-user-initials');
  const userNames = document.querySelectorAll('.auth-user-name');
  const uploadBtns = document.querySelectorAll('.trigger-upload-modal');

  if (isLoggedIn() && user) {
    const initials = getUserInitials(user);
    const name = getUserDisplayName(user);

    loginBtns.forEach(btn => btn.style.display = 'none');
    userMenus.forEach(menu => menu.style.display = 'flex');
    userAvatars.forEach(el => el.textContent = initials);
    userNames.forEach(el => el.textContent = name);

    // Enable upload for logged-in users
    uploadBtns.forEach(btn => {
      btn.removeAttribute('data-auth-required');
    });
  } else {
    loginBtns.forEach(btn => btn.style.display = '');
    userMenus.forEach(menu => menu.style.display = 'none');

    // Require login for upload
    uploadBtns.forEach(btn => {
      btn.setAttribute('data-auth-required', 'true');
    });
  }
}

// ─── Auth Modal ──────────────────────────────────────────────────────────────

function injectAuthModal() {
  if (document.getElementById('authModal')) return;

  const modal = document.createElement('div');
  modal.id = 'authModal';
  modal.className = 'auth-modal-overlay';
  modal.setAttribute('role', 'dialog');
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
        <button class="auth-modal-close" id="authModalClose" aria-label="Close login modal">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Tabs -->
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login" id="tabLogin">Sign In</button>
        <button class="auth-tab" data-tab="signup" id="tabSignup">Create Account</button>
      </div>

      <!-- Alert Banner -->
      <div class="auth-alert" id="authAlert" style="display:none;"></div>

      <!-- LOGIN FORM -->
      <form class="auth-form active" id="loginForm" data-tab-form="login" novalidate>
        <div class="auth-form-group">
          <label class="auth-label" for="loginEmail">Email Address</label>
          <input type="email" id="loginEmail" class="auth-input" placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="loginEmailErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="loginPassword">Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="loginPassword" class="auth-input" placeholder="Enter your password" autocomplete="current-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="loginPassword" aria-label="Toggle password visibility">
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/></svg>
          </span>
        </button>

        <p class="auth-switch-text">Don't have an account? <button type="button" class="auth-switch-btn" data-switch="signup">Create one free →</button></p>
      </form>

      <!-- SIGNUP FORM -->
      <form class="auth-form" id="signupForm" data-tab-form="signup" novalidate>
        <div class="auth-form-group">
          <label class="auth-label" for="signupName">Full Name</label>
          <input type="text" id="signupName" class="auth-input" placeholder="e.g. Ananya Rao" autocomplete="name" required>
          <span class="auth-field-error" id="signupNameErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupEmail">Email Address</label>
          <input type="email" id="signupEmail" class="auth-input" placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="signupEmailErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupPassword">Create Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="signupPassword" class="auth-input" placeholder="Min 8 characters" autocomplete="new-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="signupPassword" aria-label="Toggle password visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <div class="auth-password-strength" id="passwordStrengthBar"><div class="strength-fill" id="strengthFill"></div></div>
          <span class="auth-field-error" id="signupPasswordErr"></span>
        </div>

        <div class="auth-form-group">
          <label class="auth-label" for="signupConfirmPassword">Confirm Password</label>
          <div class="auth-input-wrap">
            <input type="password" id="signupConfirmPassword" class="auth-input" placeholder="Re-enter password" autocomplete="new-password" required>
            <button type="button" class="auth-show-hide-btn" data-target="signupConfirmPassword" aria-label="Toggle password visibility">
              <svg class="eye-show" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg class="eye-hide" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <span class="auth-field-error" id="signupConfirmErr"></span>
        </div>

        <button type="submit" class="auth-submit-btn" id="signupSubmitBtn">
          <span class="auth-btn-text">Create Free Account</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/></svg>
          </span>
        </button>

        <p class="auth-terms-text">By creating an account you agree to our <a href="terms-and-conditions.html" target="_blank">Terms</a> and <a href="privacy-policy.html" target="_blank">Privacy Policy</a>.</p>
        <p class="auth-switch-text">Already have an account? <button type="button" class="auth-switch-btn" data-switch="login">Sign In →</button></p>
      </form>

      <!-- FORGOT PASSWORD FORM -->
      <form class="auth-form" id="forgotForm" data-tab-form="forgot" novalidate style="display:none;">
        <div class="auth-forgot-back">
          <button type="button" class="auth-back-btn" id="backToLoginBtn">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7-7l-7 7 7 7"/></svg>
            Back to Login
          </button>
        </div>
        <h3 class="auth-forgot-title">Reset Password</h3>
        <p class="auth-forgot-desc">Enter your email and we'll send you a reset link.</p>
        <div class="auth-form-group">
          <label class="auth-label" for="forgotEmail">Email Address</label>
          <input type="email" id="forgotEmail" class="auth-input" placeholder="you@example.com" autocomplete="email" required>
          <span class="auth-field-error" id="forgotEmailErr"></span>
        </div>
        <button type="submit" class="auth-submit-btn" id="forgotSubmitBtn">
          <span class="auth-btn-text">Send Reset Link</span>
          <span class="auth-btn-spinner" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" opacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="3"/></svg>
          </span>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  bindAuthModalEvents(modal);
}

// ─── Inject Navbar Login Button ───────────────────────────────────────────────

function injectNavbarAuthControls() {
  const navCtas = document.querySelectorAll('.nav-cta');
  navCtas.forEach(navCta => {
    if (navCta.querySelector('.auth-login-btn')) return; // already injected

    // Login button (shown when logged out)
    const loginBtn = document.createElement('button');
    loginBtn.type = 'button';
    loginBtn.className = 'btn auth-login-btn';
    loginBtn.style.cssText = 'font-size:0.82rem; padding:0.5rem 0.95rem; font-weight:700; background:var(--primary); color:#fff; border:none;';
    loginBtn.innerHTML = `
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      Login
    `;
    loginBtn.addEventListener('click', openAuthModal);

    // User menu (shown when logged in)
    const userMenu = document.createElement('div');
    userMenu.className = 'auth-user-menu';
    userMenu.style.display = 'none';
    userMenu.innerHTML = `
      <button type="button" class="auth-avatar-btn" id="authAvatarBtn" aria-label="Open user menu" aria-haspopup="true">
        <span class="auth-user-initials">??</span>
        <span class="auth-user-name"></span>
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="auth-dropdown" id="authDropdown">
        <a href="dashboard.html" class="auth-dropdown-item">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          My Profile
        </a>
        <a href="dashboard.html#uploads" class="auth-dropdown-item">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          My Uploads
        </a>
        <a href="dashboard.html#saved" class="auth-dropdown-item">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
          Saved Resources
        </a>
        <a href="dashboard.html#settings" class="auth-dropdown-item">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Account Settings
        </a>
        <div class="auth-dropdown-divider"></div>
        <button type="button" class="auth-dropdown-item auth-logout-item" id="logoutBtn">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Logout
        </button>
      </div>
    `;

    // Insert before the mobile-toggle
    const mobileToggle = navCta.querySelector('.mobile-toggle');
    if (mobileToggle) {
      navCta.insertBefore(loginBtn, mobileToggle);
      navCta.insertBefore(userMenu, mobileToggle);
    } else {
      navCta.appendChild(loginBtn);
      navCta.appendChild(userMenu);
    }

    // Avatar dropdown toggle
    const avatarBtn = userMenu.querySelector('#authAvatarBtn');
    const dropdown = userMenu.querySelector('#authDropdown');
    if (avatarBtn && dropdown) {
      avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        dropdown.classList.toggle('open', !isOpen);
      });
      document.addEventListener('click', () => dropdown.classList.remove('open'));
    }

    // Logout
    const logoutBtn = userMenu.querySelector('#logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
  });
}

// ─── Modal Open / Close ───────────────────────────────────────────────────────

function openAuthModal(tab = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) { injectAuthModal(); }
  const m = document.getElementById('authModal');
  m.classList.add('active');
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    clearAuthAlert();
    clearAllFieldErrors();
  }
}

// ─── Tab Switching ────────────────────────────────────────────────────────────

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.auth-form').forEach(f => {
    if (f.dataset.tabForm === 'forgot') {
      f.style.display = 'none';
      f.classList.remove('active');
    } else {
      f.classList.toggle('active', f.dataset.tabForm === tab);
    }
  });
  clearAuthAlert();
  clearAllFieldErrors();
}

function showForgotForm() {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => {
    f.classList.remove('active');
    f.style.display = 'none';
  });
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) {
    forgotForm.style.display = '';
    forgotForm.classList.add('active');
  }
}

// ─── Bind Modal Events ────────────────────────────────────────────────────────

function bindAuthModalEvents(modal) {
  // Close button & overlay click
  modal.querySelector('#authModalClose')?.addEventListener('click', closeAuthModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeAuthModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeAuthModal(); });

  // Tab switching
  modal.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
  });

  // Switch text buttons
  modal.querySelectorAll('.auth-switch-btn').forEach(btn => {
    btn.addEventListener('click', () => switchAuthTab(btn.dataset.switch));
  });

  // Show/hide password
  modal.querySelectorAll('.auth-show-hide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.eye-show').style.display = isPassword ? 'none' : '';
      btn.querySelector('.eye-hide').style.display = isPassword ? '' : 'none';
    });
  });

  // Forgot password trigger
  modal.querySelector('#forgotPasswordBtn')?.addEventListener('click', showForgotForm);
  modal.querySelector('#backToLoginBtn')?.addEventListener('click', () => switchAuthTab('login'));

  // Password strength indicator
  const signupPw = modal.querySelector('#signupPassword');
  if (signupPw) {
    signupPw.addEventListener('input', () => updatePasswordStrength(signupPw.value));
  }

  // LOGIN form submit
  const loginForm = modal.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateLoginForm()) return;

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const remember = document.getElementById('rememberMe')?.checked;

      setFormLoading('loginSubmitBtn', true);
      clearAuthAlert();

      try {
        const user = await login(email, password);
        if (remember) localStorage.setItem('eduyodha_remember_email', email);
        showAuthAlert('success', `Welcome back, ${getUserDisplayName(user)}! 🎉`);
        setTimeout(() => {
          closeAuthModal();
          updateNavbarAuthState();
        }, 1000);
      } catch (err) {
        showAuthAlert('error', getFriendlyError(err));
      } finally {
        setFormLoading('loginSubmitBtn', false);
      }
    });
  }

  // SIGNUP form submit
  const signupForm = modal.querySelector('#signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateSignupForm()) return;

      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;

      setFormLoading('signupSubmitBtn', true);
      clearAuthAlert();

      try {
        await signUp(email, password, name);
        showAuthAlert('success', `Account created! Welcome to EDU YODHA, ${name}! 🎉`);
        setTimeout(() => {
          closeAuthModal();
          updateNavbarAuthState();
        }, 1200);
      } catch (err) {
        showAuthAlert('error', getFriendlyError(err));
      } finally {
        setFormLoading('signupSubmitBtn', false);
      }
    });
  }

  // FORGOT PASSWORD form submit
  const forgotForm = modal.querySelector('#forgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('forgotEmail').value.trim();
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showFieldError('forgotEmailErr', 'Please enter a valid email.');
        return;
      }

      setFormLoading('forgotSubmitBtn', true);
      clearAuthAlert();

      try {
        await sendPasswordReset(email);
        showAuthAlert('success', 'Password reset link sent! Check your email inbox.');
      } catch (err) {
        showAuthAlert('error', getFriendlyError(err));
      } finally {
        setFormLoading('forgotSubmitBtn', false);
      }
    });
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateLoginForm() {
  let valid = true;
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    showFieldError('loginEmailErr', 'Enter a valid email address.');
    valid = false;
  } else clearFieldError('loginEmailErr');

  if (!password || password.length < 6) {
    showFieldError('loginPasswordErr', 'Password must be at least 6 characters.');
    valid = false;
  } else clearFieldError('loginPasswordErr');

  return valid;
}

function validateSignupForm() {
  let valid = true;
  const name = document.getElementById('signupName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const password = document.getElementById('signupPassword')?.value;
  const confirm = document.getElementById('signupConfirmPassword')?.value;

  if (!name || name.length < 2) {
    showFieldError('signupNameErr', 'Please enter your full name.');
    valid = false;
  } else clearFieldError('signupNameErr');

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    showFieldError('signupEmailErr', 'Enter a valid email address.');
    valid = false;
  } else clearFieldError('signupEmailErr');

  if (!password || password.length < 8) {
    showFieldError('signupPasswordErr', 'Password must be at least 8 characters.');
    valid = false;
  } else clearFieldError('signupPasswordErr');

  if (password !== confirm) {
    showFieldError('signupConfirmErr', 'Passwords do not match.');
    valid = false;
  } else clearFieldError('signupConfirmErr');

  return valid;
}

function updatePasswordStrength(password) {
  const fill = document.getElementById('strengthFill');
  if (!fill) return;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const colors = ['#EF4444', '#F97316', '#EAB308', '#22C55E'];
  const widths = ['25%', '50%', '75%', '100%'];
  fill.style.width = password.length ? widths[score - 1] || '10%' : '0%';
  fill.style.background = password.length ? colors[score - 1] || '#EF4444' : 'transparent';
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

function showAuthAlert(type, message) {
  const alert = document.getElementById('authAlert');
  if (!alert) return;
  alert.className = `auth-alert auth-alert-${type}`;
  alert.textContent = message;
  alert.style.display = 'block';
}

function clearAuthAlert() {
  const alert = document.getElementById('authAlert');
  if (alert) { alert.style.display = 'none'; alert.textContent = ''; }
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearFieldError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = '';
}

function clearAllFieldErrors() {
  ['loginEmailErr','loginPasswordErr','signupNameErr','signupEmailErr','signupPasswordErr','signupConfirmErr','forgotEmailErr'].forEach(clearFieldError);
}

function setFormLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  const text = btn.querySelector('.auth-btn-text');
  const spinner = btn.querySelector('.auth-btn-spinner');
  if (text) text.style.display = loading ? 'none' : '';
  if (spinner) spinner.style.display = loading ? 'inline-flex' : 'none';
}

function getFriendlyError(err) {
  const msg = err?.message || '';
  if (msg.includes('invalid username/password') || msg.includes('invalid credentials')) return 'Incorrect email or password. Please try again.';
  if (msg.includes('name already in use') || msg.includes('already exists')) return 'An account with this email already exists. Please sign in.';
  if (msg.includes('network')) return 'Network error. Please check your connection.';
  if (msg.includes('App ID') || msg.includes('realm')) return 'Auth service not configured yet. Please contact support.';
  if (msg.includes('confirmation')) return 'Please confirm your email first. Check your inbox.';
  return 'Something went wrong. Please try again.';
}

// ─── Upload Auth Guard ────────────────────────────────────────────────────────

function guardUploadModal() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-auth-required]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      showAuthAlert && clearAuthAlert();
      openAuthModal('login');
      showAuthAlert('error', '🔒 Please login to upload notes.');
    }
  }, true);
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Load Realm SDK if not already present
  if (typeof Realm === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/realm-web@2.0.0/dist/bundle.iife.js';
    script.onload = () => {
      initRealmApp();
      injectAuthModal();
      injectNavbarAuthControls();
      updateNavbarAuthState();
      guardUploadModal();
      // Restore remembered email
      const remembered = localStorage.getItem('eduyodha_remember_email');
      if (remembered) {
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) emailInput.value = remembered;
      }
    };
    script.onerror = () => console.warn('EDU YODHA: Realm SDK failed to load. Auth features unavailable.');
    document.head.appendChild(script);
  } else {
    initRealmApp();
    injectAuthModal();
    injectNavbarAuthControls();
    updateNavbarAuthState();
    guardUploadModal();
  }
});

// Export for dashboard use
window.EduYodhaAuth = {
  isLoggedIn,
  getCurrentUser,
  getUserDisplayName,
  getUserProfile,
  logout,
  openAuthModal,
  closeAuthModal,
};
