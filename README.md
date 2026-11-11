# Dope Media website

One responsive website built directly from the approved `desktop.html` and `mobile.html` references. Desktop and mobile styles switch at 768px.

## Files
- `index.html`: single HTML entry point, metadata, font imports.
- `styles.css`: responsive styles preserving the supplied two layouts.
- `content.js`: **edit all copy, portfolio images, team photos, reviews, FAQ, social links and WhatsApp number here**.
- `script.js`: site rendering, mobile menu, validation, portfolio keyboard access and WhatsApp enquiry.
- `assets/logo.png`, `assets/favicon.png`: supplied logo and generated favicon.
- `assets/works/`: portfolio media.
- `assets/team/`: team photos.

## Run locally
Open `index.html` in a browser, or serve locally for a more realistic test:

```sh
python -m http.server 8000
```

Open http://localhost:8000

## Add recent work images
1. Add compressed `.webp`, `.jpg`, or `.png` files to `assets/works/`.
2. In `content.js`, edit the corresponding `portfolio.works[].image` path, e.g. `assets/works/launch-poster.webp`.
3. The mobile showcase uses `portfolio.mobileWorks`; update that list if you want different mobile images.
4. Leave an image blank to show a gray placeholder.

Team photos work the same way under `assets/team/`. Without portraits, the team cards use initials instead of fabricated headshots.

## Lead form
The form validates required name, phone (10–15 digits), and business details. On submit it opens a **pre-filled WhatsApp message** to the number in `content.js` (`form.whatsappNumber`). The visitor must tap **Send** in WhatsApp. No lead is stored on a server or sent automatically.

If you want unattended lead collection to Google Sheets or email (Formspree), the form handler in `script.js` must be connected to the endpoint you choose before deployment.

## Deploy
Drag the entire folder into Netlify Drop, or upload it to GitHub and import it as a static site in Vercel/Netlify. There is no build step. Set the publish directory to `/` (project root).

## Notes
- Team member names and roles were supplied by the client. Team photos are not included.
- Reviews are **illustrative sample copy**, not actual verified client endorsements. A note is displayed on the website; replace sample quotes with genuine client feedback before publishing.
- FAQ answers are draft general guidance, not guaranteed pricing or timelines. Verify all commitments before deployment.
- Recent work images were supplied by the client.
- Google Fonts requires an internet connection; local fallbacks are provided.
- Responsive menu and scroll-snap portfolio included. The desktop portfolio auto-advances every 4 seconds in a loop, offers Pause/Play and keyboard controls, and starts paused for reduced-motion users. The mobile portfolio remains swipe-controlled. Visible focus styles and basic SEO metadata included.
