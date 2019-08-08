//The code that is fired upon page load
console.log('select aid loaded');	

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('onMessage')
    sendResponse(selectAid(request.args));
});

function selectAid(args){
   console.log(args);
  var selected =  $('select:enabled').each(function(){
		var sel = $(this);
		console.log('select aid for ' + sel + 'args: '+ args);	
		var selected = sel.val(); // cache selected value, before reordering
		var opts_list = sel.find('option');
		opts_list.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
		sel.html('').append(opts_list);
		sel.val(selected); // set cached selected value

		//select 2
		if(opts_list && opts_list.length > 10){
	  	//var multiple = sel.is("[multiple]");
			sel.select2();
		}
	});
  console.log(selected);
  return selected.length;
}
