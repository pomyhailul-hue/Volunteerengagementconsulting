// Shared front-end behavior for all blog / insights pages.
// (The homepage SPA in index.html keeps its own inline script — untouched.)

function vecNewsletterSubmit(e) {
  e.preventDefault();
  alert('Thanks for subscribing — this is a design prototype. In production this form will connect to your email provider.');
  return false;
}

document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('siteHeader');
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
  });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reveal-on-scroll (same behavior as the homepage)
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  }

  // Share buttons (used on individual article pages)
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.getAttribute('data-share');
      var url = encodeURIComponent(window.location.href);
      var title = encodeURIComponent(document.title);
      var shareUrl = '';
      if (type === 'linkedin') shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
      if (type === 'facebook') shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
      if (type === 'twitter') shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
      if (type === 'email') { window.location.href = 'mailto:?subject=' + title + '&body=' + url; return; }
      if (type === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(function () {
          btn.setAttribute('data-copied', 'true');
          setTimeout(function () { btn.removeAttribute('data-copied'); }, 1800);
        });
        return;
      }
      if (shareUrl) window.open(shareUrl, '_blank', 'noopener,width=600,height=520');
    });
  });
});
