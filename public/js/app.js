

'use strict';

// ============================================
// VIEW — UI Components & Helpers
// ============================================
const View = {
  // دالة لرسم النجوم (سواء للعرض فقط أو للتفاعل)
  renderStars(rating, interactive = false) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = `<div class="stars${interactive ? ' interactive-stars' : ''}">`;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) html += `<span class="star filled" data-val="${i}">★</span>`;
      else if (i === full + 1 && half) html += `<span class="star half" data-val="${i}">★</span>`;
      else html += `<span class="star" data-val="${i}">★</span>`;
    }
    html += `</div>`;
    return html;
  },

  // دالة لعرض رسائل الـ Toast
  showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container') || (() => {
      const c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  },

  // دالة لفتح الـ Modals (النوافذ المنبثقة)
  openModal(content) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal">${content}</div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
    return overlay;
  }
};

// ============================================
// APP — Frontend Routing & Event Listeners
// ============================================
const App = {
  init() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    this.setupMobileNav();
    this.setupStarInteractions();
    this.setupSearchFilter();
    this.dispatch(path);
  },

  // توجيه الأكواد حسب الصفحة المفتوحة
  dispatch(page) {
    const dispatchers = {
      'index.html': () => this.initHome(),
      '': () => this.initHome(),
      'games.html': () => this.initGames(),
      'game-details.html': () => this.initGameDetails(),
      'Library.html': () => this.initLibrary(),
      'admin.html': () => this.initAdminDashboard(),
      'admin-games.html': () => this.initAdminGames(),
      'admin-add-game.html': () => this.initAdminAddGame(),
      'login.html': () => this.initLogin(),
      'register.html': () => this.initRegister()
    };
    const fn = dispatchers[page];
    if (fn) fn();
  },

  // -----------------------------------------
  // GLOBAL UI SETUP
  // -----------------------------------------
  setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.navbar-nav');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.style.display === 'flex';
        mobileMenu.style.display = isOpen ? '' : 'flex';
        mobileMenu.style.flexDirection = 'column';
        mobileMenu.style.position = 'absolute';
        mobileMenu.style.top = '72px';
        mobileMenu.style.left = '0';
        mobileMenu.style.right = '0';
        mobileMenu.style.background = 'var(--black)';
        mobileMenu.style.padding = '16px';
        mobileMenu.style.borderBottom = '3px solid var(--cyan)';
        mobileMenu.style.zIndex = '999';
      });
    }
  },

  setupSearchFilter() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        // TODO: هنا ممكن تعمل API Call للبحث في الباك اند لو الداتا كبيرة
        // fetch(`/api/games/search?q=${e.target.value}`)
        console.log('Searching for:', e.target.value);
      });
    }

    document.querySelectorAll('.filter-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        // TODO: هنا ممكن تعمل API Call لفلترة الألعاب
        // fetch(`/api/games?genre=${filter}`)
        console.log('Filtering by:', filter);
      });
    });
  },

  setupStarInteractions() {
    document.querySelectorAll('.interactive-stars').forEach(container => {
      const stars = container.querySelectorAll('.star');
      let selectedRating = 0;

      stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
          stars.forEach((s, i) => s.classList.toggle('filled', i <= index));
        });
        star.addEventListener('mouseout', () => {
          stars.forEach((s, i) => s.classList.toggle('filled', i < selectedRating));
        });
        star.addEventListener('click', () => {
          selectedRating = index + 1;
          const input = container.closest('form')?.querySelector('input[name="rating"]');
          if (input) input.value = selectedRating;
        });
      });
    });
  },

  // -----------------------------------------
  // USER PAGES
  // -----------------------------------------
  initHome() {
    // TODO: Fetch featured games from backend
    // fetch('/api/games/featured').then(res => res.json()).then(data => render...)
    console.log('Home page loaded. Waiting for backend API to populate featured games.');
  },

  initGames() {
    // TODO: Fetch all games from backend
    // fetch('/api/games').then(...)
  },

  initGameDetails() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('id');
    
    // TODO: Fetch single game details by ID
    // fetch(`/api/games/${gameId}`).then(...)

    // Form submission for reviews
    const reviewForm = document.getElementById('add-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = reviewForm.querySelector('[name="review-text"]')?.value;
        const rating = reviewForm.querySelector('[name="rating"]')?.value || 5;

        if (!text.trim()) { View.showToast('Please write your review!', 'error'); return; }

        // TODO: Send review to backend
        /*
        try {
          await fetch(`/api/games/${gameId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, rating })
          });
          View.showToast('Review posted successfully!', 'success');
          reviewForm.reset();
        } catch(err) {
          View.showToast('Failed to post review', 'error');
        }
        */
        View.showToast('Sending review to backend...', 'info');
      });
    }
  },

  initLibrary() {
    // TODO: Fetch user library games from backend
    // fetch('/api/user/library').then(...)

    // Tabs functionality (UI Only)
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        // TODO: Fetch filtered library or filter DOM
        console.log('Library tab switched to:', tab);
      });
    });
  },

  // -----------------------------------------
  // ADMIN PAGES
  // -----------------------------------------
  initAdminDashboard() {
    // TODO: Fetch dashboard stats from backend
    // fetch('/api/admin/stats').then(...)
  },

  initAdminGames() {
    // TODO: Fetch all games for admin table
    // fetch('/api/admin/games').then(...)

    // Event delegation for delete buttons (Example UI logic)
    const tableBody = document.getElementById('admin-table-body');
    if (tableBody) {
      tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-danger')) {
          const gameId = e.target.dataset.id; // Assuming button has data-id
          if (confirm('Are you sure you want to delete this game?')) {
            // TODO: Send DELETE request to backend
            // fetch(`/api/admin/games/${gameId}`, { method: 'DELETE' })
            View.showToast(`Game deleted (Backend API needed)`, 'error');
          }
        }
      });
    }
  },

  initAdminAddGame() {
    const addForm = document.getElementById('add-game-form');
    if (addForm) {
      addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // تجميع البيانات من الفورم
        const formData = new FormData(addForm);
        const data = Object.fromEntries(formData.entries());

        // TODO: إرسال البيانات للباك اند (POST Request)
        /*
        try {
          const response = await fetch('/api/admin/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if(response.ok) {
            View.showToast('Game added successfully! 🎮', 'success');
            addForm.reset();
            window.location.href = 'admin-games.html';
          }
        } catch(error) {
          View.showToast('Error adding game', 'error');
        }
        */
        View.showToast('Preparing to send data to backend API...', 'info');
        console.log('Game Data payload:', data);
      });
    }
  },

  // -----------------------------------------
  // AUTH PAGES
  // -----------------------------------------
  initLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Logging in...';
      btn.disabled = true;

      // TODO: إرسال بيانات الدخول للباك اند
      /*
      const formData = new FormData(form);
      const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(Object.fromEntries(formData)) });
      if(res.ok) window.location.href = 'index.html';
      else { View.showToast('Invalid credentials', 'error'); btn.disabled = false; btn.textContent = 'Login to Account →'; }
      */
      setTimeout(() => { View.showToast('Backend connection required', 'info'); btn.disabled = false; btn.textContent = 'Login to Account →'; }, 1000);
    });
  },

  initRegister() {
    const form = document.getElementById('register-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pass = form.querySelector('[name="password"]')?.value;
      const confirm = form.querySelector('[name="confirm"]')?.value;
      
      if (pass !== confirm) { 
        View.showToast('Passwords do not match!', 'error'); 
        return; 
      }

      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Creating account...';
      btn.disabled = true;

      // TODO: إرسال بيانات التسجيل للباك اند
      // fetch('/api/auth/register', { method: 'POST', ... })
      setTimeout(() => { View.showToast('Backend connection required', 'info'); btn.disabled = false; btn.textContent = 'Create Free Account →'; }, 1000);
    });

    // Password strength UI feedback
    const passInput = form.querySelector('[name="password"]');
    const strengthBar = document.getElementById('password-strength');
    if (passInput && strengthBar) {
      passInput.addEventListener('input', e => {
        const val = e.target.value;
        let strength = 0;
        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;
        
        const colors = ['#FF4444', '#FF6B35', '#FFC107', '#22C55E'];
        strengthBar.style.width = `${strength * 25}%`;
        strengthBar.style.background = colors[strength - 1] || '#ddd';
      });
    }
  }
};

// ============================================
// Boot (تشغيل الكود عند تحميل الصفحة)
// ============================================
document.addEventListener('DOMContentLoaded', () => App.init());