// ============= CONTACT FORM JS =============

const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Compose WhatsApp message
    const waMsg = encodeURIComponent(
      `Hello! I'm reaching out from your website.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${service || 'Not specified'}\n` +
      `*Message:* ${message || 'No message'}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/2349135422262?text=${waMsg}`, '_blank');

    // Show success
    form.style.display = 'none';
    formSuccess.classList.add('visible');
  });
}