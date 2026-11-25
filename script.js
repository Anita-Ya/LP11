// JavaScript for Landing Page - Slimax
document.addEventListener('DOMContentLoaded', () => {
  console.log('Slimax Landing Page Initialized.');

  // Smooth scroll for Buy Now / Order Now buttons
  document.querySelectorAll('a[href="#order-form"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById('order-form');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Name input: strictly letters and spaces only
  const nameInput = document.getElementById('user-name');
  const nameTooltip = document.getElementById('name-tooltip');
  if (nameInput) {
    nameInput.addEventListener('input', function () {
      // If user typed anything other than letters (Hindi/English) and spaces
      if (/[^a-zA-Z\s\u0900-\u097F]/.test(this.value)) {
        if (nameTooltip) nameTooltip.style.display = 'flex';
        this.value = this.value.replace(/[^a-zA-Z\s\u0900-\u097F]/g, '');
        setTimeout(() => {
          if (nameTooltip) nameTooltip.style.display = 'none';
        }, 2200);
      } else {
        if (nameTooltip) nameTooltip.style.display = 'none';
      }
    });
  }

  // Phone input: numeric only & must start with 6, 7, 8, or 9
  const phoneInput = document.getElementById('user-phone');
  const phoneTooltip = document.getElementById('phone-tooltip');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Check first digit: must be 6, 7, 8, or 9
      if (this.value.length > 0 && !/^[6-9]/.test(this.value)) {
        if (phoneTooltip) phoneTooltip.style.display = 'flex';
      } else {
        if (phoneTooltip) phoneTooltip.style.display = 'none';
      }
    });

    phoneInput.addEventListener('blur', function () {
      if (phoneTooltip && (this.value.length === 0 || /^[6-9]/.test(this.value))) {
        phoneTooltip.style.display = 'none';
      }
    });
  }

  // FAQ Accordion Toggle Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Optional: Close all other accordion items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item
        if (isOpen) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});

// Form Submission & Validation Handler
function handleFormSubmit() {
  const nameInput = document.getElementById('user-name');
  const phoneInput = document.getElementById('user-phone');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackEl = document.getElementById('form-feedback');

  if (!nameInput || !phoneInput || !submitBtn || !feedbackEl) return;

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();

  // Validate Name: must be at least 2 characters and letters only
  if (!nameVal || !/^[a-zA-Z\s\u0900-\u097F]{2,}$/.test(nameVal)) {
    feedbackEl.className = 'form-feedback error';
    feedbackEl.innerHTML = '⚠️ कृपया अपना सही नाम दर्ज करें (केवल अक्षर)।';
    feedbackEl.style.display = 'block';
    nameInput.focus();
    return;
  }

  // Validate Phone: must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(phoneVal)) {
    feedbackEl.className = 'form-feedback error';
    feedbackEl.innerHTML = '⚠️ मोबाइल नंबर केवल 6, 7, 8 या 9 से ही शुरू होना चाहिए।';
    feedbackEl.style.display = 'block';
    phoneInput.focus();
    return;
  }

  // Validate Phone: must be exactly 10 digits
  if (phoneVal.length !== 10) {
    feedbackEl.className = 'form-feedback error';
    feedbackEl.innerHTML = '⚠️ कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें।';
    feedbackEl.style.display = 'block';
    phoneInput.focus();
    return;
  }

  // Loading State
  submitBtn.disabled = true;
  const originalBtnHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="cta-title">कृपया प्रतीक्षा करें...</span>';
  feedbackEl.style.display = 'none';

  // Simulate Submission
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;

    feedbackEl.className = 'form-feedback success';
    feedbackEl.innerHTML = '✅ धन्यवाद ' + (nameVal ? '<strong>' + nameVal + '</strong>' : '') + '! आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है। हमारे स्वास्थ्य विशेषज्ञ आपसे जल्द ही संपर्क करेंगे।';
    feedbackEl.style.display = 'block';

    // Reset fields
    nameInput.value = '';
    phoneInput.value = '';

    // Redirect to Thank You Page
    window.location.href = 'thankyou.html';
  }, 900);
}

// Policy Modal Handlers
function openPolicyModal(type) {
  closeAllPolicyModals();
  const modalId = 'modal-' + type;
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllPolicyModals(e) {
  if (e && e.target && e.target.closest('.policy-modal-card') && !e.target.classList.contains('policy-modal-close')) {
    return;
  }
  document.querySelectorAll('.policy-modal').forEach(m => {
    m.classList.remove('active');
  });
  document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllPolicyModals();
  }
});
