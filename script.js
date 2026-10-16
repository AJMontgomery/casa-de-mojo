
/* =========================================
   CASA DE MOJO
   Reservation Portal & Denial Archives
========================================= */

/* =========================================
   HISTORICAL FACEBOOK POSTS
========================================= */

const posts = [
    {
        year: 'Archive',
        title: 'Record 01',
        file: 'images/36f62c37-df2b-44bc-9175-a92213d24831.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 02',
        file: 'images/387ed10d-dbf3-40c6-a7c4-e51af2f072c6.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 03',
        file: 'images/416ebc9a-32b4-4e43-a3da-b025575fc702.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 04',
        file: 'images/5cce87b9-250c-4816-b607-1a030e406bf7.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 05',
        file: 'images/601bc799-186d-4a75-87d2-1f44280f263f.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 06',
        file: 'images/63a4f80b-398e-4ae4-847e-5b7c6cc15f3e.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 07',
        file: 'images/6f47aad2-fdbe-4de9-afe0-f9af8c06bf3d.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 08',
        file: 'images/76007313-c412-4d3f-909a-3d74342006b7.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 09',
        file: 'images/8087495e-e32e-4636-a3af-f2173561cb01.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 10',
        file: 'images/a454781e-3d2b-42af-bf33-167cb2ed21e7.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 11',
        file: 'images/b6f2ca85-7445-4416-82ca-bd4153c18ba1.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 12',
        file: 'images/c2eb4bae-46cb-4321-baac-32a21d82bfe7.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 13',
        file: 'images/d1cc52a2-04a9-4929-8e98-9b75f94683d2.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 14',
        file: 'images/da97e8c1-d4af-4a6d-9c77-6af12a6531b2.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 15',
        file: 'images/e1027bb8-4e5d-43bc-92b8-34a774566176.jpeg',
        caption: 'Official lodging announcement.'
    },
    {
        year: 'Archive',
        title: 'Record 16',
        file: 'images/e571cfae-6144-469a-81be-3c6ff76452ab.jpeg',
        caption: 'Official lodging announcement.'
    }
];

/* =========================================
   RESERVATION FORM
========================================= */

const form = document.querySelector('#booking-form');
const result = document.querySelector('#result');
const checkin = document.querySelector('#checkin');
const checkout = document.querySelector('#checkout');

const today = new Date();

const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);

checkin.min = localDate;
checkout.min = localDate;

/* Update checkout restrictions */

checkin.addEventListener('change', () => {
    checkout.min = checkin.value || localDate;

    if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = '';
    }
});

/* Process fake reservation */

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

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

/* Show empty state if no posts exist */

if (!posts.length) {
    empty.hidden = false;
}

/* Generate screenshot cards */

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

    /* Open full-size screenshot */

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

/* Close button */

document.querySelector('#close-lightbox')
    .addEventListener('click', () => {
        lightbox.close();
    });

/* Close when clicking outside image */

lightbox.addEventListener('click', (event) => {

    if (event.target === lightbox) {
        lightbox.close();
    }
});
