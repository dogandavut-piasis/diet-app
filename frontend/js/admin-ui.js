(function () {
  var ADMIN_NAV = [
    { href: 'index.html',        icon: 'house-heart',       label: 'Slider' },
    { href: 'nutrition.html',    icon: 'heart-pulse',       label: 'Beslenme' },
    { href: 'blog.html',         icon: 'journal-richtext',  label: 'Blog' },
    { href: 'gallery.html',      icon: 'card-image',        label: 'Galeri' },
    { href: 'recipes.html',      icon: 'egg-fried',         label: 'Tarifler' },
    { href: 'appointments.html', icon: 'calendar-check',    label: 'Randevu' }
  ];

  function currentPage() {
    var p = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!p.endsWith('.html')) p = 'index.html';
    return p;
  }

  function initSidebar() {
    var sidebar = document.querySelector('.admin-sidebar');
    if (!sidebar) return;

    var toggleBtn = document.getElementById('sidebarToggle');
    var overlay = document.getElementById('sidebarOverlay');

    if (!toggleBtn) {
      var header = document.querySelector('.admin-header');
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'sidebarToggle';
      toggleBtn.className = 'sidebar-toggle-btn';
      toggleBtn.setAttribute('aria-label', 'Menuyu Ac/Kapat');
      toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
      if (header) header.insertBefore(toggleBtn, header.firstChild);
      else document.body.insertBefore(toggleBtn, document.body.firstChild);
    }

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sidebarOverlay';
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    function open() {
      sidebar.classList.add('open');
      overlay.classList.add('visible');
      document.body.classList.add('sidebar-open');
    }
    function close() {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.classList.remove('sidebar-open');
    }
    function toggle() {
      if (sidebar.classList.contains('open')) close(); else open();
    }

    toggleBtn.addEventListener('click', toggle);
    overlay.addEventListener('click', close);

    sidebar.querySelectorAll('a.nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 991px)').matches) close();
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function initBottomNav() {
    if (document.querySelector('.admin-bottom-nav')) return;
    if (!document.querySelector('.admin-sidebar')) return;

    var page = currentPage();
    var nav = document.createElement('nav');
    nav.className = 'admin-bottom-nav';
    nav.setAttribute('aria-label', 'Admin mobil navigasyon');
    nav.innerHTML = ADMIN_NAV.map(function (item) {
      var active = item.href.toLowerCase() === page ? ' active' : '';
      return '<a href="' + item.href + '" class="nav-item' + active + '">' +
             '<i class="bi bi-' + item.icon + '"></i>' +
             '<span>' + item.label + '</span>' +
             '</a>';
    }).join('');
    document.body.appendChild(nav);
  }

  function initHeaderCompact() {
    var header = document.querySelector('.admin-header');
    if (!header) return;
    var title = header.querySelector('h2');
    if (title) title.classList.add('admin-title');
  }

  function initFabScroll() {
    var btn = document.querySelector('.admin-header .btn-primary-custom');
    if (!btn) return;
    btn.classList.add('admin-action-btn');
  }

  function initImagePreview() {
    var preview = document.getElementById('currentImagePreview');
    var container = document.getElementById('currentImage');
    if (!preview || !container) return;
    var label = container.querySelector('small');
    var defaultLabel = label ? label.textContent : 'Mevcut görsel:';

    document.querySelectorAll('input[type="file"][accept*="image"]').forEach(function (inp) {
      inp.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
          preview.src = ev.target.result;
          container.classList.remove('d-none');
          if (label) label.textContent = 'Seçilen görsel (önizleme):';
        };
        reader.readAsDataURL(file);
      });
    });

    var modal = document.querySelector('.modal');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', function () {
        if (label) label.textContent = defaultLabel;
      });
    }
  }

  function init() {
    initSidebar();
    initBottomNav();
    initHeaderCompact();
    initFabScroll();
    initImagePreview();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
