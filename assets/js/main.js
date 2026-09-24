// Configuration: EDU YODHA WhatsApp phone number (country code without '+' or spaces)
const EDU_YODHA_WHATSAPP_NUMBER = '917353129776';
const EDU_YODHA_WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029Vb27q0JKwqSbZewkPh1r';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initUpdateFilters();
  initDomainFilters();
  initApplicationModal();
  initContactForm();
  initAccordions();
  initQuickCounters();
  initUploadNotesModal();
  renderCommunityNotes();
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

/* 5. Internship Application Modal & WhatsApp Submission */
function initApplicationModal() {
  const modal = document.getElementById('applyModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const applyTriggers = document.querySelectorAll('.trigger-apply-modal');
  const applyForm = document.getElementById('internshipApplyForm');
  const domainSelect = document.getElementById('applyDomainSelect');

  if (applyTriggers.length && modal) {
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

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('applyFullName')?.value.trim() || '';
      const email = document.getElementById('applyEmail')?.value.trim() || '';
      const phone = document.getElementById('applyPhone')?.value.trim() || '';
      const college = document.getElementById('applyCollege')?.value.trim() || '';
      const year = document.getElementById('applyYear')?.value.trim() || '';
      const domain = document.getElementById('applyDomainSelect')?.value.trim() || '';

      const submitBtn = applyForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Opening WhatsApp...</span>';
      }

      const messageText = `🎓 *New Internship Registration - EDU YODHA*\n\n` +
        `📌 *Full Name:* ${fullName}\n` +
        `📧 *Email:* ${email}\n` +
        `📱 *Student WhatsApp:* ${phone}\n` +
        `🏫 *College:* ${college}\n` +
        `📚 *Current Year:* ${year}\n` +
        `💻 *Selected Domain:* ${domain}\n\n` +
        `Please confirm my application and send onboarding details.`;

      const waUrl = `https://wa.me/${EDU_YODHA_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

      // Launch WhatsApp chat
      window.open(waUrl, '_blank');

      setTimeout(() => {
        applyForm.innerHTML = `
          <div style="text-align: center; padding: 1.5rem 1rem;">
            <div style="width: 56px; height: 56px; background: #D1FAE5; color: #059669; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.75rem;">✓</div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">Application Sent via WhatsApp!</h3>
            <p style="color: #475569; font-size: 0.92rem; margin-bottom: 1.25rem;">Your registration details were formatted for WhatsApp. If chat did not open automatically, click below:</p>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block" style="background-color: #25D366; border: none; margin-bottom: 1rem; font-weight: 700;">Open WhatsApp Chat ↗</a>
            
            <div style="background: #F0FDF4; border: 1px dashed #25D366; border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem; text-align: left;">
              <strong style="color: #166534; font-size: 0.92rem; display: block; margin-bottom: 0.25rem;">📢 Don't miss live updates!</strong>
              <p style="font-size: 0.85rem; color: #15803D; margin-bottom: 0.75rem;">Join the official EDU YODHA WhatsApp Channel for daily VTU circulars, KCET cutoffs, and batch announcements.</p>
              <a href="${EDU_YODHA_WHATSAPP_CHANNEL}" target="_blank" rel="noopener noreferrer" class="btn btn-block" style="background-color: #059669; color: #FFFFFF; border: none; font-size: 0.88rem; padding: 0.6rem 1rem; text-align: center;">Join WhatsApp Channel ↗</a>
            </div>

            <button type="button" class="btn btn-secondary btn-block" onclick="location.reload()">Done</button>
          </div>
        `;
      }, 500);
    });
  }
}

/* 6. Contact Us Form Handler & WhatsApp Submission */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName')?.value.trim() || '';
    const email = document.getElementById('contactEmail')?.value.trim() || '';
    const phone = document.getElementById('contactPhone')?.value.trim() || '';
    const subject = document.getElementById('contactSubject')?.value.trim() || '';
    const message = document.getElementById('contactMessage')?.value.trim() || '';

    const submitBtn = document.getElementById('contactSubmitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Opening WhatsApp...';
    }

    const messageText = `💬 *New Message - EDU YODHA Contact Desk*\n\n` +
      `📌 *Full Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📱 *WhatsApp:* ${phone}\n` +
      `🏷️ *Category:* ${subject}\n` +
      `📝 *Message:* ${message}`;

    const waUrl = `https://wa.me/${EDU_YODHA_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

    // Launch WhatsApp chat
    window.open(waUrl, '_blank');

    setTimeout(() => {
      const successMsg = document.getElementById('contactSuccessMsg');
      if (successMsg) {
        contactForm.style.display = 'none';
        successMsg.innerHTML = `
          <strong style="font-size: 1.1rem; display: block; margin-bottom: 0.5rem; color: #065F46;">✓ Message Prepared for WhatsApp!</strong>
          <p style="font-size: 0.88rem; margin-bottom: 1rem; color: #047857;">If WhatsApp did not open automatically, click below to send your message to our official desk:</p>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background-color: #25D366; border: none; display: block; width: 100%; text-align: center; margin-bottom: 1.25rem; font-weight: 700;">Send via WhatsApp Chat ↗</a>
          
          <div style="background: #FFFFFF; border: 1px solid #A7F3D0; border-radius: 10px; padding: 1rem; text-align: left;">
            <strong style="color: #065F46; font-size: 0.9rem; display: block; margin-bottom: 0.25rem;">📢 Join EDU YODHA WhatsApp Channel</strong>
            <p style="font-size: 0.82rem; color: #047857; margin-bottom: 0.75rem;">Get instant broadcast alerts for VTU exam timetables, results, and career drives.</p>
            <a href="${EDU_YODHA_WHATSAPP_CHANNEL}" target="_blank" rel="noopener noreferrer" class="btn" style="background-color: #059669; color: #FFFFFF; border: none; display: block; text-align: center; font-size: 0.85rem; padding: 0.55rem;">Join Official WhatsApp Channel ↗</a>
          </div>
        `;
        successMsg.style.display = 'block';
      }
    }, 500);
  });
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

/* 8. Free Notes & PDF Upload Modal Handler */
let currentUploadedFile = null;

function initUploadNotesModal() {
  const modal = document.getElementById('uploadNotesModal');
  const closeBtn = document.getElementById('uploadModalCloseBtn');
  const triggers = document.querySelectorAll('.trigger-upload-modal');
  const dropZone = document.getElementById('pdfDropZone');
  const fileInput = document.getElementById('noteFileInput');
  const dropZoneContent = document.getElementById('dropZoneContent');
  const filePreviewCard = document.getElementById('filePreviewCard');
  const previewFileName = document.getElementById('previewFileName');
  const previewFileSize = document.getElementById('previewFileSize');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const uploadForm = document.getElementById('uploadNotesForm');

  if (triggers.length && modal) {
    function openModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      resetFileSelection();
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  if (dropZone && fileInput) {
    // Click drop zone to select file
    dropZone.addEventListener('click', (e) => {
      if (e.target !== removeFileBtn) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    });

    // Drag and drop handlers
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        handleFileSelect(dt.files[0]);
      }
    });

    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetFileSelection();
      });
    }
  }

  function handleFileSelect(file) {
    currentUploadedFile = file;
    if (previewFileName) previewFileName.textContent = file.name;
    if (previewFileSize) previewFileSize.textContent = formatBytes(file.size);
    if (dropZoneContent) dropZoneContent.style.display = 'none';
    if (filePreviewCard) filePreviewCard.style.display = 'block';
  }

  function resetFileSelection() {
    currentUploadedFile = null;
    if (fileInput) fileInput.value = '';
    if (dropZoneContent) dropZoneContent.style.display = 'block';
    if (filePreviewCard) filePreviewCard.style.display = 'none';
  }

  function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!currentUploadedFile && !fileInput.files[0]) {
        alert('Please select a PDF or document file to upload.');
        return;
      }

      const fileObj = currentUploadedFile || fileInput.files[0];
      const subjectName = document.getElementById('noteSubjectName')?.value.trim() || '';
      const subjectCode = document.getElementById('noteSubjectCode')?.value.trim() || '';
      const branch = document.getElementById('noteBranch')?.value || '';
      const semester = document.getElementById('noteSemester')?.value || '';
      const category = document.getElementById('noteCategory')?.value || '';
      const contributorName = document.getElementById('noteContributorName')?.value.trim() || '';
      const collegeName = document.getElementById('noteCollegeName')?.value.trim() || '';

      const fileDataUrl = URL.createObjectURL(fileObj);

      const newNote = {
        id: 'note_' + Date.now(),
        subjectName,
        subjectCode,
        branch,
        semester,
        category,
        contributorName,
        collegeName,
        fileName: fileObj.name,
        fileSize: formatBytes(fileObj.size),
        fileUrl: fileDataUrl,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      // Save to localStorage
      saveCommunityNote(newNote);

      // Show success screen in modal
      const waText = `📤 *New Student PDF Uploaded on EDU YODHA*\n\n` +
        `📚 *Subject:* ${subjectName} (${subjectCode})\n` +
        `🎓 *Branch & Sem:* ${branch} | ${semester}\n` +
        `🏷️ *Category:* ${category}\n` +
        `📄 *File:* ${fileObj.name} (${formatBytes(fileObj.size)})\n` +
        `👤 *Contributed By:* ${contributorName} (${collegeName})\n\n` +
        `Please verify and add to permanent VTU repository.`;

      const waUrl = `https://wa.me/${EDU_YODHA_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

      uploadForm.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 1rem;">
          <div style="width: 56px; height: 56px; background: #D1FAE5; color: #059669; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.75rem;">✓</div>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">Notes Uploaded Successfully!</h3>
          <p style="color: #475569; font-size: 0.92rem; margin-bottom: 1.25rem;">Your document <strong>${fileObj.name}</strong> is now listed under Community Contributed Notes.</p>
          
          <div style="display: flex; gap: 10px; flex-direction: column; margin-bottom: 1.25rem;">
            <a href="${fileDataUrl}" download="${fileObj.name}" class="btn btn-primary btn-block" style="font-weight: 700;">⬇ Download Uploaded PDF</a>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-block" style="background-color: #25D366; color: #FFFFFF; border: none; font-weight: 700;">Share to Official Desk via WhatsApp ↗</a>
          </div>

          <button type="button" class="btn btn-secondary btn-block" onclick="location.reload()">Done / Close</button>
        </div>
      `;

      // Refresh community notes view
      renderCommunityNotes();
    });
  }
}

/* Save note to local storage */
function saveCommunityNote(note) {
  let notes = getSavedCommunityNotes();
  notes.unshift(note);
  try {
    localStorage.setItem('eduyodha_community_notes', JSON.stringify(notes));
  } catch (err) {
    console.log('LocalStorage limit or error:', err);
  }
}

function getSavedCommunityNotes() {
  try {
    const raw = localStorage.getItem('eduyodha_community_notes');
    return raw ? JSON.parse(raw) : getInitialDefaultNotes();
  } catch (err) {
    return getInitialDefaultNotes();
  }
}

function getInitialDefaultNotes() {
  return [
    {
      id: 'default_1',
      subjectName: 'Design & Analysis of Algorithms',
      subjectCode: '21CS42',
      branch: 'CSE / ISE',
      semester: '4th Sem',
      category: 'Handwritten Notes',
      contributorName: 'Priya N.',
      collegeName: 'RVCE Bengaluru',
      fileName: 'DAA_Complete_Module_1_to_5.pdf',
      fileSize: '4.8 MB',
      fileUrl: '#',
      date: '24 Sep 2026'
    },
    {
      id: 'default_2',
      subjectName: 'Engineering Mathematics III',
      subjectCode: '21MAT31',
      branch: 'All Branches',
      semester: '3rd Sem',
      category: 'Module Solved PDF',
      contributorName: 'Karthik S.',
      collegeName: 'BMSCE',
      fileName: 'Maths_3_Fourier_Series_Transforms.pdf',
      fileSize: '3.2 MB',
      fileUrl: '#',
      date: '23 Sep 2026'
    },
    {
      id: 'default_3',
      subjectName: 'Operating Systems',
      subjectCode: '21CS44',
      branch: 'CSE / AI',
      semester: '4th Sem',
      category: 'VTU Question Papers',
      contributorName: 'Ananya R.',
      collegeName: 'MSRIT',
      fileName: 'OS_Deadlocks_CPU_Scheduling_QB.pdf',
      fileSize: '2.1 MB',
      fileUrl: '#',
      date: '22 Sep 2026'
    }
  ];
}

/* Render Community Notes into UI Container */
function renderCommunityNotes() {
  const container = document.getElementById('communityNotesContainer');
  if (!container) return;

  const notes = getSavedCommunityNotes();

  if (!notes.length) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No community notes uploaded yet. Be the first to share notes!</p>`;
    return;
  }

  container.innerHTML = notes.map(note => `
    <div class="community-note-card">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <span class="tag-pill blue" style="font-size: 0.72rem;">${note.subjectCode}</span>
          <span class="tag-pill emerald" style="font-size: 0.72rem;">${note.category}</span>
        </div>
        <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">${note.subjectName}</h3>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          <strong>Branch & Sem:</strong> ${note.branch} • ${note.semester}
        </p>
      </div>

      <div style="border-top: 1px dashed var(--border-light); padding-top: 0.85rem; margin-top: 0.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <span class="contributor-pill">👤 ${note.contributorName} (${note.collegeName})</span>
          <span style="font-size: 0.72rem; color: var(--text-subtle);">${note.date}</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="${note.fileUrl}" ${note.fileUrl !== '#' ? `download="${note.fileName}"` : ''} class="btn btn-secondary btn-block" style="font-size: 0.82rem; padding: 0.5rem 0.75rem; text-align: center; flex: 1;">
            📥 Download (${note.fileSize})
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

