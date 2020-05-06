//The code that is fired upon page load

console.log('notification plugin background file loaded');	

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  console.log('clicked on the icon: '+ tab);	
  chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });// show options
});




