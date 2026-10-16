# Casa de Mojo

A free, mobile-friendly parody reservation portal for GitHub Pages. It does not accept real reservations or collect personal information.

## Publish on GitHub Pages

1. Sign in at https://github.com and create a **public** repository named `casa-de-mojo`.
2. Upload `index.html`, `style.css`, `script.js`, and the `images` folder to the repository root (or upload all the files inside this folder; do not nest an extra `casa-de-mojo` folder).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, `main`, and `/ (root)`; save.
5. Your site will appear at `https://YOUR-USERNAME.github.io/casa-de-mojo/` after GitHub finishes publishing.
6. Use the live URL to create your shirt's QR code. Test the QR code on several phones before printing.

## Add Mojo's Facebook screenshots

1. Get Mojo's permission to publish her screenshots publicly. Crop or redact private names, profile pictures, and other people's comments if necessary.
2. Save the screenshots as optimized JPG, PNG, or WebP files in `images/`. Prefer small image files so the site loads quickly on phones.
3. Open `script.js`. Inside the `posts` array, add an object for each screenshot, for example:

```js
const posts = [
  { year: '2026', title: 'Homecoming Notice', file: 'images/2026-homecoming.jpg', caption: 'The annual reminder.' },
  { year: '2023', title: 'Another Reminder', file: 'images/2023-reminder.png', caption: 'The policy remains unchanged.' },
];
```

4. Commit the changes. GitHub Pages automatically updates the gallery; the QR code URL stays the same.

## Customize

- Edit the wording in `index.html`.
- Edit colors and layout in `style.css`.
- Edit the screenshots list and reservation interactions in `script.js`.
- There is intentionally no working payment, booking, or customer-data backend.
- The site uses Google Fonts when available, with local fallback fonts.
