$(document).ready( function() {

openerOnClick();

});

function openerOnClick(){
	var htmlStr = "";
    var lightboxentry = document.getElementById("lightboxentry");
    
    /*var dimmer = document.createElement("div");

    dimmer.style.width =  window.innerWidth + 'px';
    dimmer.style.height = window.innerHeight + 'px';
    dimmer.className = 'dimmer';

    document.body.appendChild(dimmer);*/

    lightboxentry.style.visibility = 'visible';
    lightboxentry.style.top = 50 + 'px';
    lightboxentry.style.left = $(window).width()/2 - 150 + 'px';
    $('#dContent').height($("#lightboxentry").height()+200);
    
    centerTextVertical($("#addForm"),$("#lightboxentry"));
    
     $("#lightbox").hide();
    
    return false;
    
}


function centerTextVertical(smaller,larger) {
	var heightDiff = larger.height()-smaller.height();
	smaller.css("margin-top", heightDiff/4);
}
