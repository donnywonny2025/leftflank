/* LEFT FLANK — v4 Interactions */
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Scroll reveals
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('v'); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.r').forEach(el => obs.observe(el));

  // Video on hover
  document.querySelectorAll('.work-tile').forEach(tile => {
    const vid = tile.querySelector('video');
    if (!vid) return;
    tile.addEventListener('mouseenter', () => { vid.currentTime = 0; vid.play().catch(() => {}); });
    tile.addEventListener('mouseleave', () => vid.pause());
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.offsetTop - nav.offsetHeight - 16, behavior: 'smooth' });
    });
  });

  // Form
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const subj = encodeURIComponent(`Left Flank Inquiry — ${fd.get('name')}${fd.get('org') ? ' / ' + fd.get('org') : ''}`);
    const body = encodeURIComponent(`Name: ${fd.get('name')}\nOrg: ${fd.get('org') || '—'}\nEmail: ${fd.get('email')}\n\n${fd.get('project') || '—'}`);
    window.location.href = `mailto:info@leftflankstrategies.com?subject=${subj}&body=${body}`;
    const btn = form.querySelector('.submit-btn');
    const og = btn.innerHTML;
    btn.innerHTML = 'Sent ✓';
    setTimeout(() => { btn.innerHTML = og; form.reset(); }, 3000);
  });
})();
