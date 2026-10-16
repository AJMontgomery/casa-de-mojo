// ADD SCREENSHOTS HERE. Put image files inside /images, then add one object per post.
// Example: { year: '2021', title: 'Annual Reminder', file: 'images/2021-reminder.jpg', caption: 'The annual notice returns.' }
const posts = [
  // { year: '2026', title: 'The Latest Reminder', file: 'images/2026-post.png', caption: 'Still no lodging.' },
];

const form = document.querySelector('#booking-form');
const result = document.querySelector('#result');
const checkin = document.querySelector('#checkin');
const checkout = document.querySelector('#checkout');
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
checkin.min = localDate;
checkout.min = localDate;
checkin.addEventListener('change', () => { checkout.min = checkin.value || localDate; if (checkout.value && checkout.value <= checkin.value) checkout.value = ''; });
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (checkout.value <= checkin.value) { checkout.setCustomValidity('Check-out must be after check-in.'); checkout.reportValidity(); return; }
  checkout.setCustomValidity('');
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
checkout.addEventListener('change', () => checkout.setCustomValidity(''));

const grid = document.querySelector('#archive-grid');
const empty = document.querySelector('#archive-empty');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
if (!posts.length) empty.hidden = false;
for (const post of posts) {
  const card = document.createElement('article'); card.className = 'archive-card';
  const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', `Enlarge ${post.title}`);
  const img = document.createElement('img'); img.src = post.file; img.alt = `${post.year}: ${post.title}`; img.loading = 'lazy';
  button.append(img);
  const meta = document.createElement('div'); meta.className = 'archive-meta';
  const heading = document.createElement('strong'); heading.textContent = `${post.year} · ${post.title}`;
  const caption = document.createElement('p'); caption.textContent = post.caption || '';
  meta.append(heading, caption); card.append(button, meta); grid.append(card);
  button.addEventListener('click', () => { lightboxImage.src = post.file; lightboxImage.alt = img.alt; lightboxCaption.textContent = post.caption || post.title; lightbox.showModal(); });
}
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
