/* Admin Auth Guard */
(function() {
  var token = localStorage.getItem('authToken');
  if (!token && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
    return;
  }
  if (token && !window.location.pathname.includes('login.html')) {
    fetch(API_BASE_URL + '/Auth/me', { headers: { 'Authorization': 'Token ' + token } })
      .then(function(r) {
        if (r.status !== 200) { localStorage.clear(); window.location.href = 'login.html'; }
      }).catch(function() {});
  }
})();

function adminLogout() {
  var token = localStorage.getItem('authToken');
  if (token) {
    fetch(API_BASE_URL + '/Auth/logout', {
      method: 'POST', headers: { 'Authorization': 'Token ' + token }
    }).finally(function() { localStorage.clear(); window.location.href = 'login.html'; });
  } else { window.location.href = 'login.html'; }
}
