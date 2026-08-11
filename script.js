const modal = document.querySelector('#contact-modal');
const form = document.querySelector('#contact-form');
const formError = document.querySelector('#form-error');
const success = document.querySelector('#form-success');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-navigation');
let returnFocus;

function openContact(trigger) {
  returnFocus = trigger;
  form.hidden = false;
  success.hidden = true;
  form.reset();
  formError.textContent = '';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => document.querySelector('#name').focus(), 120);
}

function closeContact() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  returnFocus?.focus();
}

document.querySelectorAll('[data-open-contact]').forEach((button) => button.addEventListener('click', () => openContact(button)));
document.querySelectorAll('[data-close-contact]').forEach((button) => button.addEventListener('click', closeContact));
document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeContact();
  if (event.key === 'Tab') {
    const focusable = [...modal.querySelectorAll('button, input, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hidden && !element.closest('[hidden]'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Avaa valikko' : 'Sulje valikko';
  nav.classList.toggle('is-open', !isOpen);
});
nav.querySelectorAll('a, button').forEach((item) => item.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open');
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    formError.textContent = 'Täytä kaikki pakolliset kentät oikeassa muodossa.';
    form.reportValidity();
    return;
  }
  formError.textContent = '';
  form.hidden = true;
  success.hidden = false;
  success.focus();
});
