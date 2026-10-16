
/* =========================================
   CASA DE MOJO
   Reservation Portal & Denial Archives
========================================= */

/* =========================================
   HISTORICAL FACEBOOK POSTS
   Organized Newest to Oldest
========================================= */

const posts = [
    {
        year: '2026',
        title: 'January 29, 2026',
        file: 'images/01292026.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2025',
        title: 'October 11, 2025',
        file: 'images/10112025.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2025',
        title: 'May 19, 2025',
        file: 'images/05192025.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2025',
        title: 'January 31, 2025',
        file: 'images/01312025.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2024',
        title: 'September 28, 2024',
        file: 'images/09282024.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2024',
        title: 'August 7, 2024',
        file: 'images/08072024.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2024',
        title: 'April 7, 2024',
        file: 'images/04072024.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2024',
        title: 'January 21, 2024',
        file: 'images/01212024.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2023',
        title: 'November 22, 2023',
        file: 'images/11222023.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2023',
        title: 'July 19, 2023',
        file: 'images/07192023.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2023',
        title: 'February 9, 2023',
        file: 'images/02092023.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2022',
        title: 'October 4, 2022',
        file: 'images/10042022.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2022',
        title: 'January 25, 2022',
        file: 'images/09252022.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2022',
        title: 'July 07, 2022',
        file: 'images/07072022.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2021',
        title: 'June 30, 2021',
        file: 'images/06302021.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    },
    {
        year: '2021',
        title: 'January 2, 2021',
        file: 'images/01022021.jpeg',
        caption: 'Official Casa de Mojo lodging announcement.'
    }
];

/* =========================================
   RESERVATION FORM
========================================= */

const form = document.querySelector('#booking-form');
const result = document.querySelector('#result');
const checkin = document.querySelector('#checkin');
const checkout = document.querySelector('#checkout');

/* Set minimum booking dates */

const today = new Date();

const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);

checkin.min = localDate;
checkout.min = localDate;

/* =========================================
   UPDATE CHECKOUT RESTRICTIONS
========================================= */

checkin.addEventListener('change', () => {

    checkout.min = checkin.value || localDate;

    if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = '';
    }

    checkout.setCustomValidity('');
});

/* =========================================
   PROCESS FAKE RESERVATION
========================================= */

form.addEventListener('submit', (event) => {

    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    /* Validate reservation dates */

    if (checkout.value <= checkin.value) {

        checkout.setCustomValidity(
            'Check-out must be after check-in.'
        );

        checkout.reportValidity();

        return;
    }

    checkout.setCustomValidity('');

    /* Display reservation denial */

    result.hidden = false;

    result.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

/* Clear custom validation */

checkout.addEventListener('change', () => {
    checkout.setCustomValidity('');
});

/* =========================================
   DENIAL ARCHIVES GALLERY
========================================= */

const grid = document.querySelector('#archive-grid');
const empty = document.querySelector('#archive-empty');

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');

/* =========================================
   ARCHIVE EMPTY STATE
========================================= */

if (!posts.length) {
    empty.hidden = false;
} else {
    empty.hidden = true;
}

/* =========================================
   GENERATE SCREENSHOT CARDS
========================================= */

for (const post of posts) {

    /* Create archive card */

    const card = document.createElement('article');
    card.className = 'archive-card';

    /* Create clickable image button */

    const button = document.createElement('button');
    button.type = 'button';

    button.setAttribute(
        'aria-label',
        `Enlarge ${post.title}`
    );

    /* Create screenshot image */

    const img = document.createElement('img');

    img.src = post.file;
    img.alt = `${post.year}: ${post.title}`;
    img.loading = 'lazy';

    button.append(img);

    /* Create archive metadata */

    const meta = document.createElement('div');
    meta.className = 'archive-meta';

    const heading = document.createElement('strong');

    heading.textContent = `${post.year} · ${post.title}`;

    const caption = document.createElement('p');

    caption.textContent = post.caption || '';

    meta.append(heading, caption);

    /* Add card to gallery */

    card.append(button, meta);

    grid.append(card);

    /* =====================================
       OPEN FULL-SIZE SCREENSHOT
    ===================================== */

    button.addEventListener('click', () => {

        lightboxImage.src = post.file;
        lightboxImage.alt = img.alt;

        lightboxCaption.textContent =
            post.caption || post.title;

        lightbox.showModal();
    });
}

/* =========================================
   IMAGE LIGHTBOX CONTROLS
========================================= */

/* Close using the close button */

document.querySelector('#close-lightbox')
    .addEventListener('click', () => {

        lightbox.close();
    });

/* Close by clicking outside the image */

lightbox.addEventListener('click', (event) => {

    if (event.target === lightbox) {
        lightbox.close();
    }
});

