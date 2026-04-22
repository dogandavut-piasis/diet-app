(function () {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
