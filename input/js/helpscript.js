$(document).ready( function() {

    $.get('Instructions.htm', function(data) {
        $('#dContent').html(data);
        $('#dContent').css('marginLeft', '10px');
    });

});