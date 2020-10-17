console.log('options js loaded')

function save_options() {
  console.log('save_options')
  var sites = document.getElementById('sites').value;
  var api = document.getElementById('api').value;
  chrome.storage.sync.set({
    sites: sites,
    api: api
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 2750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  console.log('restore_options')
  // default values

  chrome.storage.sync.get({
    api: 'http://localhost:8085',
    sites: "localhost"
  }, function (items) {
    document.getElementById('api').value = items.api;
    document.getElementById('sites').value = items.sites;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('sites').addEventListener('change',
  save_options);
document.getElementById('api').addEventListener('change',
  save_options);

document.getElementById('save').addEventListener('click',
  save_options);