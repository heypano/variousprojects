$(document).ready(handler);

//http://stackoverflow.com/questions/2844565/is-there-a-jquery-dom-change-listener/11546242#11546242

function handler(e){
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var thing = $("div[id^=topnews_main_stream] > div:first-child").get(0);
	var observer = new MutationObserver(function(mutations, observer) {
	    // fired when a mutation occurs
	    $(mutations).each(function(i,v){
	    	$(v.addedNodes).each(function(j,e){
	    		$(e).each(function(ind,element){
	    			console.log(element);
	    			//console.log("hashtagNodes is ");
	    			//console.log(hashtagNodes);
	    		});
	    	});
	    });
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe(thing, {
		childList: true,
	});
}