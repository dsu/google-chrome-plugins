//The code that is fired upon page load

console.log('select aid background js loaded');	

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  console.log('clicked on select aid icon: '+ tab);	
  if (tab){
        console.log('send');
	    chrome.tabs.sendMessage(tab.id, {}, function(response) {
	    console.log(response);
	  });
    }
});




