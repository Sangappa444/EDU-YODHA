/**
 * EDU YODHA - Main Interactive Script
 * Handles navigation, mobile drawer, category filters, interactive modals, and forms
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initUpdateFilters();
  initDomainFilters();
  initApplicationModal();
  initAccordions();
  initQuickCounters();
});

/* 1. Header scroll effect */
function initNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* 2. Mobile Drawer Navigation */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* 3. Latest Updates Filter Tabs */
function initUpdateFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const updateCards = document.querySelectorAll('.update-card');

  if (!filterBtns.length || !updateCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      updateCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Domain Filters (on Internships section/page) */
function initDomainFilters() {
  const domainBtns = document.querySelectorAll('.domain-filter-btn');
  const internshipCards = document.querySelectorAll('.internship-listing-card');

  if (!domainBtns.length || !internshipCards.length) return;

  domainBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      domainBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = btn.getAttribute('data-domain');

      internshipCards.forEach(card => {
        const cardDomain = card.getAttribute('data-domain');
        if (selected === 'all' || cardDomain === selected) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Internship Application Modal */
function initApplicationModal() {
  const modal = document.getElementById('applyModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const applyTriggers = document.querySelectorAll('.trigger-apply-modal');
  const applyForm = document.getElementById('internshipApplyForm');
  const domainSelect = document.getElementById('applyDomainSelect');

  if (!modal) return;

  function openModal(defaultDomain = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (domainSelect && defaultDomain) {
      domainSelect.value = defaultDomain;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  applyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const domain = btn.getAttribute('data-domain') || '';
      openModal(domain);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = applyForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Submitting Application...</span>';

      setTimeout(() => {
        applyForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 56px; height: 56px; background: #D1FAE5; color: #059669; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.75rem;">✓</div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">Application Received!</h3>
            <p style="color: #475569; font-size: 0.95rem; margin-bottom: 1.5rem;">Thank you for registering with EDU YODHA. Our team will review your application and send the onboarding details to your email and WhatsApp.</p>
            <div style="background: #F1F5F9; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; text-align: left; font-size: 0.88rem; color: #334155;">
              <strong>Next Step:</strong> Make sure you have joined the official EDU YODHA WhatsApp Channel for live batch alerts and screening schedules.
            </div>
            <a href="https://whatsapp.com/channel/0029Vb27q0JKwqSbZewkPh1r" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block" style="background-color: #25D366; border: none; margin-bottom: 0.75rem;">Join WhatsApp Channel</a>
            <button type="button" class="btn btn-secondary btn-block" onclick="location.reload()">Done</button>
          </div>
        `;
      }, 1000);
    });
  }
}

/* 6. Accordion toggle */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      
      // Close other siblings in the same accordion group if needed
      const parentGroup = item.closest('.accordion-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(sib => {
          if (sib !== item) sib.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isOpen);
    });
  });
}

/* 7. Numbers count animation for stats */
function initQuickCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.innerHTML = `${current.toLocaleString()}<span class="highlight">${suffix}</span>`;
        }, 30);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(el => observer.observe(el));
}
