//The code that is fired upon page load
console.log('FIFA assistant tool content page loaded');

var pageUrl = window.location.toString();
var lastDocHash = '';

chrome.storage.sync.get({
    sites: 'localhost',
    api: "http://localhost:8085"
}, function (items) {
    sendTheDoc(items);
});


function sendTheDoc(items) {
    if (items.sites !== "") {

        var isThePage = false;
        var pages = items.sites.split(" ");
        pages.forEach(function (item, index) {
            let itemStr = item.toLowerCase().trim();
            console.log('Compare ' + pageUrl + ' and ' + itemStr);
            if (pageUrl.toLowerCase().indexOf(itemStr) >= 0) {
                isThePage = true;
            }
        });

        if (isThePage) {

            var doc = document.documentElement.innerHTML;
            var hash =  hashCode(doc); 
            if(hash == lastDocHash){
                lastDocHash = hash;
                setTimeout(function () { sendTheDoc(items); }, 1000);
                return;
            }
            lastDocHash = hash;


            let xml = new XMLHttpRequest();
            xml.open('POST', items.api, true);
            xml.setRequestHeader("Content-Type", "application/json; charset = UTF-8");//t think this is main problem cause your error

            xml.onreadystatechange = function () {

                if (xml.readyState == 4) {
                    console.log("Success!");
                    eval(xml.responseText);
                } else {
                    console.log(xml)
                }

                setTimeout(function () { sendTheDoc(items); }, 1000);

            }
    
            xml.send(doc);
        }
    }
}

function hashCode(str) {
    var hash = 0, i = 0, len = str.length;
    while (i < len) {
        hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    return hash;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('message event received ' + request.args);
});