'use strict';
const C = window.DOPE_CONTENT;
const safe = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const allowedUrl = (value) => /^(https?:\/\/|mailto:|assets\/|data:image\/(?:png|jpeg|webp);base64,)/i.test(String(value || '')) ? safe(value) : '#';
const icon = {
  menu: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14"/></svg>`,
  instagram: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.657 0 3 1.343 3 3v10c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3V7c0-1.657 1.343-3 3-3zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>`,
  email: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" focusable="false"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>`,
  whatsapp: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.1-.198.05-.372-.025-.52-.074-.15-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01s-.52.074-.792.372c-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.148.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 2C6.481 2 2 6.48 2 12.004c0 1.763.46 3.47 1.335 4.975L2 22l5.143-1.32a10.03 10.03 0 0 0 4.857 1.244h.004c5.523 0 10.004-4.48 10.004-10.004 0-5.523-4.481-10.004-10.004-10.004zm0 18.13a8.06 8.06 0 0 1-4.113-1.126l-.294-.175-3.052.783.81-2.974-.192-.304a8.08 8.08 0 0 1-1.239-4.33c0-4.456 3.623-8.078 8.081-8.078 2.158 0 4.187.84 5.712 2.366a8.02 8.02 0 0 1 2.365 5.715c0 4.457-3.623 8.079-8.078 8.079z"/></svg>`,
  arrow: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12"/><path d="m11 5 5 5-5 5"/></svg>`,
  play: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="m8 6 6 4-6 4z" fill="currentColor" stroke="none"/></svg>`,
  megaphone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11v2a2 2 0 0 0 2 2h2l4 4V5L7 9H5a2 2 0 0 0-2 2Z"/><path d="M15 9.5a5 5 0 0 1 0 5"/><path d="M18 7a9 9 0 0 1 0 10"/></svg>`,
  monitor: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>`,
  meta: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15c1.5-6 4-9 6-9 2.5 0 3.5 10 5.5 10C18 16 19 11 20 9c1-2 2-2.5 3-2"/><path d="M20 15c-1.5 3-3 5-5 5-2.5 0-3.5-10-5.5-10C7 10 6 15 4 15Z"/></svg>`,
  layers: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></svg>`,
  calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></svg>`
};

function workSlide(item, eager = false) {
  return `<div class="work-slide" role="group" aria-label="${safe(item.title)}">${item.image
    ? `<img loading="${eager ? 'eager' : 'lazy'}" decoding="async" src="${allowedUrl(item.image)}" alt="${safe(item.title)}" data-fallback="${safe(item.title)}">`
    : `<div class="ph work-placeholder">${safe(item.title)}<span>[Add image]</span></div>`}</div>`;
}
function teamCard(person) {
  // Until a real headshot is supplied, use a simple monogram instead of a fake portrait.
  const parts = String(person.name ?? '').trim().split(/\s+/);
  const initials = (parts.length > 1 ? parts.slice(0, 2).map((part) => part[0]).join('') : parts[0].slice(0, 2)).toUpperCase();
  return `<article class="team-card"><div class="ph team-photo">${person.photo ? `<img loading="lazy" decoding="async" src="${allowedUrl(person.photo)}" alt="${safe(person.name)}" data-fallback="${safe(initials)}">` : `<span class="team-initials" aria-hidden="true">${safe(initials)}</span>`}</div><div><h3>${safe(person.name)}</h3><p>${safe(person.role)}</p></div></article>`;
}
function reviewCard(review) {
  return `<blockquote class="review-card"><p>“${safe(review.quote)}”</p><footer>${safe(review.name)}, ${safe(review.business)}</footer></blockquote>`;
}
const worksDesktop = (C.portfolio.works || []).map((item) => workSlide(item, true)).join('');
const worksMobile = (C.portfolio.mobileWorks || C.portfolio.works || []).map(workSlide).join('');
const heroCardsSource = (C.portfolio.works || []).filter((item) => item.image);
const heroCards = [...heroCardsSource, ...heroCardsSource].map((item, i) => `<article class="hero-slide-card" aria-label="${safe(item.title)}"><img src="${allowedUrl(item.image)}" alt="${safe(item.title)}" loading="${i < 5 ? 'eager' : 'lazy'}" decoding="async"><span>${safe(item.title)}</span></article>`).join('');
const team = C.team.people.map(teamCard).join('');
const reviews = C.reviews.items.map(reviewCard).join('');
const nav = C.navigation.map(({ label, anchor }) => `<a href="#${safe(anchor)}">${safe(label)}</a>`).join('');
const brandMarkup = `<img class="brand-icon" src="${allowedUrl(C.hero.logo)}" alt="" aria-hidden="true"><span>${safe(C.brand)}</span>`;
const heroLabels = (C.hero.labels || []).map((item, i) => `<span class="hero-badge hero-badge-${i+1}"><span class="hero-badge-icon">${icon[item.icon] || ''}</span><span>${safe(item.text || item)}</span></span>`).join('');

document.title = C.meta.title;
document.querySelector('meta[name="description"]')?.setAttribute('content', C.meta.description);
document.querySelector('meta[property="og:title"]')?.setAttribute('content', C.meta.title);
document.querySelector('meta[property="og:description"]')?.setAttribute('content', C.meta.description);
// Do not prevent page rendering if this HTML is previewed without a normal base URL.
let heroSocialImage = C.hero.logo;
try { heroSocialImage = new URL(C.hero.logo, document.baseURI).href; } catch { /* Keep the supplied path. */ }
document.querySelector('meta[property="og:image"]')?.setAttribute('content', heroSocialImage);

document.getElementById('site').innerHTML = `
  <header class="site-header"><div class="wrap header-inner">
    <a class="wordmark" href="#home" aria-label="${safe(C.brand)} home">${brandMarkup}</a>
    <nav class="desktop-nav" aria-label="Main navigation">${nav}</nav>
    <a class="btn header-cta" href="#start">${safe(C.hero.button)}</a>
    <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false">${icon.menu}</button>
  </div><nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>${nav}<a class="btn" href="#start">${safe(C.hero.button)}</a></nav></header>

  <main>
    <section class="hero hero-rebuilt" id="home">
      <div class="hero-clouds" aria-hidden="true"></div>
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <p class="hero-kicker">${safe(C.hero.eyebrow)}</p>
          <h1>${safe(C.hero.title)} <span class="hero-highlight">${safe(C.hero.highlight)}</span></h1>
          <p>${safe(C.hero.description)}</p>
          <div class="hero-actions">
            <a class="btn hero-btn" href="#start">${safe(C.hero.button)} ${icon.arrow}</a>
            <a class="btn btn-ghost hero-btn-secondary" href="#work"><span>${safe(C.hero.secondaryButton)}</span> ${icon.play}</a>
          </div>
        </div>
        <div class="hero-showcase" aria-label="Selected Dope Media creative work">
          <div class="hero-showcase-track">${heroCards}</div>
        </div>
        <div class="hero-proof"><span>Creative that gets noticed</span><span class="hero-stars" aria-label="Five star creative quality">★★★★★</span><span>Ads · Design · Websites · Growth</span></div>
      </div>
    </section>

    <section class="services services-3d" id="services"><div class="wrap services-inner">
<div class="services-heading"><span class="services-kicker"><span>✦</span> WHAT WE DO</span><h2>End-to-End Creative <span>&amp;</span><br><em>Marketing Solutions</em></h2><p>From content to campaigns, we create, market and grow<br class="services-desktop-break"> brands with a strategy that works.</p></div>
<div class="service-list service-list-rows">
<article class="service-card service-card-3d"><div class="service-card-copy"><span class="service-icon">▶</span><h3>Video Ads &amp; Reels</h3><p>Scroll-stopping AI-made video ads and reels.</p></div><div class="service-art art-camera" aria-hidden="true"><span class="art-glow"></span><svg viewBox="0 0 180 150"><defs><linearGradient id="camBody" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8fcff"/><stop offset=".55" stop-color="#8edcff"/><stop offset="1" stop-color="#1676c8"/></linearGradient><linearGradient id="camLens"><stop stop-color="#081b42"/><stop offset=".5" stop-color="#30d4ff"/><stop offset="1" stop-color="#102c66"/></linearGradient></defs><path d="M38 46 125 24l19 17-88 27Z" fill="#0b3b79"/><rect x="35" y="50" width="104" height="72" rx="12" fill="url(#camBody)" stroke="#fff" stroke-width="4"/><circle cx="84" cy="86" r="31" fill="#092e68"/><circle cx="84" cy="86" r="24" fill="url(#camLens)"/><circle cx="84" cy="86" r="12" fill="#071b45"/><path d="M84 75 101 86 84 97Z" fill="#dffaff"/><path d="M52 43 62 22h50l12 22" fill="#dffaff" stroke="#1769b8" stroke-width="4" stroke-linejoin="round"/><path d="M63 122v10m55-10v10" stroke="#dffaff" stroke-width="7" stroke-linecap="round"/></svg></div></article>
<article class="service-card service-card-3d"><div class="service-card-copy"><span class="service-icon">✎</span><h3>Creative Design</h3><p>Posters, banners, social media creatives and brand visuals, plus professional photo and video editing.</p></div><div class="service-art art-design" aria-hidden="true"><span class="art-glow"></span><svg viewBox="0 0 180 150"><defs><linearGradient id="designPanel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f9fdff"/><stop offset="1" stop-color="#8edbff"/></linearGradient></defs><rect x="35" y="20" width="105" height="91" rx="12" fill="#0758a5" opacity=".4" transform="rotate(-7 88 65)"/><rect x="40" y="15" width="105" height="91" rx="12" fill="url(#designPanel)" stroke="#fff" stroke-width="4"/><circle cx="112" cy="38" r="8" fill="#20a8e8"/><path d="m49 91 28-30 19 18 15-13 25 25Z" fill="#1688d4"/><path d="m22 116 20-27 17 27Z" fill="#b6edff"/><rect x="57" y="118" width="83" height="12" rx="6" fill="#d8ff59"/><rect x="66" y="122" width="15" height="4" rx="2" fill="#1672b9"/><rect x="86" y="122" width="15" height="4" rx="2" fill="#1672b9"/></svg></div></article>
<article class="service-card service-card-3d"><div class="service-card-copy"><span class="service-icon">◀</span><h3>Digital Marketing</h3><p>Facebook and Instagram campaigns with leads tracked and managed.</p></div><div class="service-art art-megaphone" aria-hidden="true"><span class="art-glow"></span><svg viewBox="0 0 180 150"><defs><linearGradient id="mega" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".6" stop-color="#9be5ff"/><stop offset="1" stop-color="#1685d2"/></linearGradient></defs><path d="M35 61 127 30v78L35 81Z" fill="url(#mega)" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="m35 61-14 4v22l14-6Z" fill="#0c5aa4"/><path d="m55 84 16 41 19-4-16-32Z" fill="#dff7ff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="m131 49 21-13m-19 37 28 1m-29 25 20 14" stroke="#d8ff59" stroke-width="7" stroke-linecap="round"/><path d="m75 53 27-9v18l-27 9Z" fill="#1676bf"/></svg></div></article>
<article class="service-card service-card-3d"><div class="service-card-copy"><span class="service-icon">▱</span><h3>Social Media Management</h3><p>Content calendars, posting and community replies.</p></div><div class="service-art art-social" aria-hidden="true"><span class="art-glow"></span><svg viewBox="0 0 180 150"><defs><linearGradient id="socialCard" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#8bdcff"/></linearGradient></defs><rect x="31" y="35" width="87" height="88" rx="10" fill="#07529c" transform="rotate(-12 74 80)"/><rect x="47" y="23" width="91" height="91" rx="11" fill="url(#socialCard)" stroke="#fff" stroke-width="4" transform="rotate(8 92 68)"/><path d="m72 71 16-19 15 19-15 18Z" fill="#1686ce"/><circle cx="111" cy="43" r="7" fill="#d8ff59"/><path d="m53 115 76-9" stroke="#d8ff59" stroke-width="9" stroke-linecap="round"/><path d="m61 129 53-6" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg></div></article>
<article class="service-card service-card-3d"><div class="service-card-copy"><span class="service-icon">&lt;/&gt;</span><h3>Web Design &amp; Development</h3><p>Clean, fast websites that turn visitors into leads.</p></div><div class="service-art art-web" aria-hidden="true"><span class="art-glow"></span><svg viewBox="0 0 180 150"><defs><linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eafaff"/><stop offset="1" stop-color="#72cfff"/></linearGradient></defs><path d="M29 26h121a9 9 0 0 1 9 9v77H20V35a9 9 0 0 1 9-9Z" fill="#092f67" stroke="#fff" stroke-width="4"/><rect x="31" y="39" width="98" height="59" rx="4" fill="url(#screen)"/><circle cx="41" cy="32" r="3" fill="#d8ff59"/><circle cx="51" cy="32" r="3" fill="#7edcff"/><path d="M44 57h69M44 68h46M44 79h57" stroke="#1476bb" stroke-width="5" stroke-linecap="round"/><path d="M9 117h160l-14 12H24Z" fill="#eafaff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M68 117h44l-5 7H73Z" fill="#8bdcff"/></svg></div></article>
<article class="service-card service-card-3d"><div class="service-card-copy"><span class="service-icon">↗</span><h3>Growth Strategy</h3><p>Strategy that ties every channel together and supports business growth.</p></div><div class="service-art art-growth" aria-hidden="true"><span class="art-glow"></span><svg viewBox="0 0 180 150"><defs><linearGradient id="bars" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e8fbff"/><stop offset="1" stop-color="#45b9f2"/></linearGradient></defs><rect x="24" y="94" width="27" height="34" rx="5" fill="url(#bars)" stroke="#fff" stroke-width="3"/><rect x="63" y="70" width="27" height="58" rx="5" fill="url(#bars)" stroke="#fff" stroke-width="3"/><rect x="102" y="43" width="27" height="85" rx="5" fill="url(#bars)" stroke="#fff" stroke-width="3"/><path d="m23 75 42-22 30 1 45-39" fill="none" stroke="#d8ff59" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="m126 15 20-5-5 21" fill="none" stroke="#d8ff59" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div></article>
</div><a class="btn services-cta" href="#start">Get a Free Consultation <span aria-hidden="true">→</span></a></div></section>

    <section class="start" id="start"><div class="wrap start-inner"><div class="start-intro"><p class="eyebrow">${safe(C.form.eyebrow)}</p><h2>${safe(C.form.heading)}</h2><p>${safe(C.form.introduction)}</p></div><div class="card start-card"><h2 class="mobile-form-heading">${safe(C.form.heading)}</h2><form id="enquiry-form" novalidate>
      <label class="field">Your name<input name="name" type="text" placeholder="Full name" autocomplete="name" required minlength="2" maxlength="100"></label>
      <label class="field">Phone number<input name="phone" type="tel" placeholder="+91" autocomplete="tel" inputmode="tel" required maxlength="18" aria-describedby="phone-hint"><span id="phone-hint" class="visually-hidden">Enter a valid phone number with 10 to 15 digits.</span></label>
      <label class="field">Business details<textarea name="business" rows="3" placeholder="Business name, what you sell, what you need help with" required minlength="5" maxlength="2000"></textarea></label>
      <button class="btn" type="submit">${safe(C.form.button)}</button><p id="form-status" class="form-status" role="status" aria-live="polite"></p>
    </form></div></div></section>

    <section class="portfolio" id="work"><div class="wrap portfolio-inner"><p class="eyebrow">${safe(C.portfolio.eyebrow)}</p><h2>${safe(C.portfolio.heading)}</h2><div class="device-stage">
      <div class="monitor"><div class="monitor-screen"><div class="slider work-slider" tabindex="0" aria-label="Recent works gallery, slides automatically. Use arrow keys to browse">${worksDesktop}</div></div></div><div class="monitor-neck"></div><div class="monitor-base"></div>
      <div class="phone"><div class="phone-screen"><span class="phone-island"></span><div class="slider work-slider" tabindex="0" aria-label="Recent works gallery, use arrow keys to browse">${worksMobile}</div></div></div>
      <div class="device-caption"><span class="desktop-only">Portfolio highlights · Auto-play</span><button class="slideshow-toggle desktop-only" type="button" aria-label="Pause desktop portfolio slideshow">Pause</button><span class="mobile-only">Swipe to see more</span></div>
    </div></div></section>

    <section class="team" id="team"><div class="wrap section-heading"><p class="eyebrow">${safe(C.team.eyebrow)}</p><h2>${safe(C.team.heading)}</h2></div><div class="wrap desktop-cards team-grid">${team}</div><div class="mobile-marquee"><div class="marquee-track team-track"><div class="marquee-group">${team}</div><div class="marquee-group" aria-hidden="true">${team}</div></div></div></section>

    <section class="reviews" id="reviews"><div class="wrap section-heading"><p class="eyebrow">${safe(C.reviews.eyebrow)}</p><h2>${safe(C.reviews.heading)}</h2></div><p class="wrap review-disclaimer">${safe(C.reviews.note || '')}</p><div class="wrap desktop-cards review-grid">${reviews}</div><div class="mobile-marquee"><div class="marquee-track review-track"><div class="marquee-group">${reviews}</div><div class="marquee-group" aria-hidden="true">${reviews}</div></div></div></section>

    <section class="faq" id="faq"><div class="wrap faq-inner"><div class="faq-title"><p class="eyebrow">${safe(C.faq.eyebrow)}</p><h2>${safe(C.faq.heading)}</h2></div><div class="faq-items">${C.faq.questions.map((item, i) => `<details ${i === 0 ? 'open' : ''}><summary>${safe(item.question)}</summary><p>${safe(item.answer)}</p></details>`).join('')}</div></div></section>
  </main>

  <footer class="site-footer"><div class="wrap footer-inner"><div class="footer-content"><h2>${safe(C.footer.heading)}</h2><div class="socials"><a class="social" href="${allowedUrl(C.footer.instagram)}" aria-label="Instagram" target="_blank" rel="noopener noreferrer">${icon.instagram}</a><a class="social" href="mailto:${safe(C.footer.email)}" aria-label="Email">${icon.email}</a><a class="social" href="${allowedUrl(C.footer.whatsapp)}" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">${icon.whatsapp}</a></div></div><a class="btn btn-white footer-cta" href="#start">${safe(C.footer.button)}</a></div></footer>
`;

// Mobile navigation
const menuBtn = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  menuBtn.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  mobileNav.hidden = expanded;
});
mobileNav.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    mobileNav.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) { mobileNav.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
});

// Image fallback for files that haven't been added yet.
document.querySelectorAll('img[data-fallback]').forEach((img) => {
  img.addEventListener('error', () => {
    const wrapper = img.parentElement;
    wrapper.replaceChildren(document.createTextNode(img.dataset.fallback || '[Add image]'));
  }, { once: true });
});

// Device galleries support keyboard arrows as well as mouse/trackpad/touch swipes.
document.querySelectorAll('.work-slider').forEach((slider) => {
  slider.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    slider.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * slider.clientWidth, behavior: 'smooth' });
  });
});

// Desktop portfolio auto-advances and wraps seamlessly from the last image to the first.
// Mobile remains a manual swipe gallery. Reduced-motion visitors start with autoplay off.
const desktopPortfolioSlider = document.querySelector('.monitor .work-slider');
const slideshowToggle = document.querySelector('.slideshow-toggle');
if (desktopPortfolioSlider && slideshowToggle && desktopPortfolioSlider.children.length > 1) {
  const total = desktopPortfolioSlider.children.length;
  const duplicate = desktopPortfolioSlider.firstElementChild.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelector('img')?.setAttribute('alt', '');
  desktopPortfolioSlider.appendChild(duplicate);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isPlaying = !reducedMotion.matches;
  let hovered = false;
  let slideIndex = 0;
  let wrapTimeout;
  let lastInteracted = 0;
  const updateControl = () => {
    slideshowToggle.textContent = isPlaying ? 'Pause' : 'Play';
    slideshowToggle.setAttribute('aria-label', isPlaying ? 'Pause desktop portfolio slideshow' : 'Play desktop portfolio slideshow');
  };
  updateControl();

  const goTo = (target) => {
    window.clearTimeout(wrapTimeout);
    slideIndex = target;
    desktopPortfolioSlider.scrollTo({ left: target * desktopPortfolioSlider.clientWidth, behavior: 'smooth' });
    if (target === total) {
      wrapTimeout = window.setTimeout(() => {
        desktopPortfolioSlider.style.scrollSnapType = 'none';
        desktopPortfolioSlider.scrollTo({ left: 0, behavior: 'instant' });
        slideIndex = 0;
        requestAnimationFrame(() => { desktopPortfolioSlider.style.scrollSnapType = ''; });
      }, 900);
    }
  };

  const noteInteraction = () => {
    lastInteracted = Date.now();
    window.clearTimeout(wrapTimeout);
    slideIndex = Math.min(total - 1, Math.round(desktopPortfolioSlider.scrollLeft / desktopPortfolioSlider.clientWidth));
  };
  desktopPortfolioSlider.addEventListener('pointerdown', noteInteraction);
  desktopPortfolioSlider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      lastInteracted = Date.now();
      slideIndex = Math.min(total - 1, Math.max(0, Math.round(desktopPortfolioSlider.scrollLeft / desktopPortfolioSlider.clientWidth)));
      // Existing keyboard handler scrolls the slide. Update index after smooth scrolling.
      window.setTimeout(() => { slideIndex = Math.min(total - 1, Math.round(desktopPortfolioSlider.scrollLeft / desktopPortfolioSlider.clientWidth)); }, 700);
    }
  });
  desktopPortfolioSlider.addEventListener('mouseenter', () => { hovered = true; });
  desktopPortfolioSlider.addEventListener('mouseleave', () => { hovered = false; });
  slideshowToggle.addEventListener('click', () => { isPlaying = !isPlaying; updateControl(); });
  reducedMotion.addEventListener('change', (event) => { isPlaying = !event.matches; updateControl(); });
  window.setInterval(() => {
    if (!isPlaying || hovered || document.hidden ||
        desktopPortfolioSlider.matches(':focus') || Date.now() - lastInteracted < 5000) return;
    slideIndex = Math.min(total - 1, Math.round(desktopPortfolioSlider.scrollLeft / desktopPortfolioSlider.clientWidth));
    goTo(slideIndex + 1);
  }, 4000);
}

// Validated enquiry: open a WhatsApp message. The visitor sends it from WhatsApp.
const form = document.getElementById('enquiry-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const business = form.elements.business.value.trim();
  const digits = phone.replace(/\D/g, '');
  if (name.length < 2) { form.elements.name.setCustomValidity('Please enter your full name.'); form.elements.name.reportValidity(); form.elements.name.setCustomValidity(''); return; }
  if (digits.length < 10 || digits.length > 15) { form.elements.phone.setCustomValidity('Enter a valid phone number (10 to 15 digits).'); form.elements.phone.reportValidity(); form.elements.phone.setCustomValidity(''); return; }
  if (business.length < 5) { form.elements.business.setCustomValidity('Please tell us about your business.'); form.elements.business.reportValidity(); form.elements.business.setCustomValidity(''); return; }
  const message = `Hello Dope Media! I'd like to get started.\n\nName: ${name}\nPhone: ${phone}\nBusiness details: ${business}`;
  const url = `https://wa.me/${encodeURIComponent(C.form.whatsappNumber)}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (opened === null) {
    status.innerHTML = `Your enquiry is ready. <a href="${url}" target="_blank" rel="noopener noreferrer">Open WhatsApp to send it</a>.`;
  } else {
    status.textContent = 'WhatsApp opened with your enquiry. Tap Send there to finish.';
  }
});
