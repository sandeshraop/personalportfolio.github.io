document.addEventListener('DOMContentLoaded', () => {
  // Fade-in and slide animation on scroll
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    if (Math.random() > 0.5) {
      section.classList.add('fade-left');
    } else {
      section.classList.add('fade-right');
    }
  });

  function revealSections() {
    const triggerBottom = window.innerHeight * 0.88;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealSections);
  revealSections();

  // Smooth scroll for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }
  });

  // Typing animation for section titles
  const sectionTitles = document.querySelectorAll('.section h2');
  sectionTitles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    const typeText = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeText, 50);
      }
    };
    typeText();
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formMessage.innerHTML = `
        <div class="loading-message">
          <i class="fas fa-spinner fa-spin"></i>
          Sending message...
        </div>
      `;
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
          contactForm.reset();
          formMessage.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle"></i>
              ${result.message}
            </div>
          `;
        } else {
          formMessage.innerHTML = `
            <div class="error-message">
              <i class="fas fa-exclamation-circle"></i>
              ${result.message}
            </div>
          `;
        }
      } catch (error) {
        formMessage.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            There was an error submitting your message. Please try again later.
          </div>
        `;
      }
    });
  }

  // Add styles for form messages
  const style = document.createElement('style');
  style.textContent = `
    .loading-message, .success-message, .error-message {
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      text-align: center;
      font-weight: bold;
    }
    .loading-message { background: #4a90e2; color: white; }
    .success-message { background: #2ecc71; color: white; }
    .error-message { background: #e74c3c; color: white; }
    .loading-message i, .success-message i, .error-message i { margin-right: 0.5rem; }
  `;
  document.head.appendChild(style);
});
