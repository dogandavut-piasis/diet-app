/* ===== Utility Functions ===== */
function imgUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  url = url.replace(/\\/g, '/');
  if (!url.startsWith('/')) url = '/' + url;
  return BACKEND_URL + url;
}

function api(endpoint, options) {
  var opts = options || {};
  var headers = opts.headers || {};
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  var token = localStorage.getItem('authToken');
  if (token) headers['Authorization'] = 'Token ' + token;
  opts.headers = headers;
  return fetch(API_BASE_URL + endpoint, opts).then(function(r) {
    if (r.status === 204) return null;
    if (!r.ok) throw r;
    return r.json();
  });
}

function apiUpload(file) {
  var formData = new FormData();
  formData.append('file', file);
  var token = localStorage.getItem('authToken');
  var headers = {};
  if (token) headers['Authorization'] = 'Token ' + token;
  return fetch(API_BASE_URL + '/FileUpload/upload-image', {
    method: 'POST', body: formData, headers: headers
  }).then(function(r) { return r.json(); });
}

function el(id) { return document.getElementById(id); }

function formatDate(d) {
  if (!d) return '';
  var dt = new Date(d);
  return dt.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
}

function imgError(img) {
  img.onerror = null;
  img.style.display = 'none';
  var ph = document.createElement('div');
  ph.className = 'img-placeholder';
  ph.innerHTML = '<i class="bi bi-image"></i>';
  img.parentNode.insertBefore(ph, img);
}

/* ===== Scroll Animations ===== */
function initAnimations() {
  var items = document.querySelectorAll('.fade-up');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  items.forEach(function(item) { obs.observe(item); });
}

/* ===== Navbar Scroll ===== */
function initNavbar() {
  var nav = document.querySelector('.navbar-custom');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  initNavbar();
});
