# Allawy Solutions — Static Site

Standalone HTML version of the Allawy Solutions website, ready to host on **GitHub Pages**, Netlify, Vercel, or any static host.

## Files

- `index.html` — the full site (Tailwind via CDN, no build step needed)
- `assets/` — all images

## Deploy to GitHub Pages

1. Create a new GitHub repo and upload these files (keep folder structure).
2. In the repo: **Settings → Pages → Source: `main` branch / `/root`** → Save.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

## Quote form setup (required)

The form uses [Formspree](https://formspree.io) so submissions email you without any backend.

1. Create a free Formspree account → New Form → copy your form ID (e.g. `xyzabcde`).
2. Open `index.html`, find `YOUR_FORM_ID` (line ~263), replace it:
   ```html
   <form action="https://formspree.io/f/xyzabcde" method="POST" ...>
   ```
3. Done — submissions go to your email.

> Alternative: replace with [Web3Forms](https://web3forms.com), [Getform](https://getform.io), or your own endpoint.

## Local preview

Just double-click `index.html`, or:
```bash
python3 -m http.server 8000
```
then open http://localhost:8000
