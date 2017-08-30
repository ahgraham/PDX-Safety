$(document).ready( function() {

openerOnClick();

});

function openerOnClick(){
	var htmlStr = "";
    var lightbox = document.getElementById("lightbox");
    
    htmlStr += "<div class='dimmer'> </div>";
    
    //$("#dContent").html(htmlStr);
    $("body").append(htmlStr);
    
    /*var dimmer = document.createElement("div");

    dimmer.style.width =  window.innerWidth + 'px';
    dimmer.style.height = window.innerHeight + 'px';
    dimmer.className = 'dimmer';

    document.body.appendChild(dimmer);*/

    lightbox.style.visibility = 'visible';
    lightbox.style.top = $(window).height()/4 - 50 + 'px';
    lightbox.style.left = $(window).width()/2 - 150 + 'px';
    
    centerTextVertical($("#form"),$("#lightbox"));
    
    return false;
    
}


function centerTextVertical(smaller,larger) {
	var heightDiff = larger.height()-smaller.height();
	smaller.css("margin-top", heightDiff/4);
}
