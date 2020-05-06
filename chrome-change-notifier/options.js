console.log('options js loaded')

function save_options() {
  console.log('save_options')
  var sites = document.getElementById('sites').value;
  var elementSelector = document.getElementById('elementSelector').value;
  chrome.storage.sync.set({
    sites: sites,
    elementSelector: elementSelector
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
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
    sites: '',
    elementSelector: "body"
  }, function(items) {
    document.getElementById('sites').value = items.sites;
    document.getElementById('elementSelector').value = items.elementSelector;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('sites').addEventListener('change',
    save_options);
document.getElementById('elementSelector').addEventListener('change',
save_options);
document.getElementById('save').addEventListener('click',
save_options);