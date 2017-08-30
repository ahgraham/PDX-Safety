function loadSurvey() {
    var surveyURL = "http://dialog.fuseinsight.com/topic/start/safety_app_feedback_officers_Dn/intro",
        sWidth = $(document).width() - 20,                              //*How wide the survey shall be
        sHeight = $(document).height() - 20 - $(".ui-bar-a").outerHeight(),  //*How high the survey shall be
        sIFrame = $('<div class="sIFrame" width="' + sWidth + '" height="' + sHeight + '"><iframe id="sIFrame" width="' + sWidth + '" scrolling="yes" height="' + sHeight + '" frameborder="0" src="' + surveyURL + '" style="border-width: 0px;margin: 10px 0 0 10px;overflow-y:auto;"/></div>'),
        sWidth2,
        sHeight2;
    //*This is part of fixing the problems in the UI where the dimensions weren't changing dynamically upon orientation changes. Don't worry about it.
    sIFrame.bind("orientationchange", //*This is for detecting orientation change in Survey. When it detects it, it runs the below function.
        function () {
            setTimeout(
                function () {
                    sWidth2 = $(document).width() - 20;
                    sHeight2 = $(document).height() - 20 - $(".ui-bar-a").outerHeight();
                    $("#sIFrame").prop("width", sWidth2);   //*This makes the actual iframe's width change back
                    $("#sIFrame").prop("height", sHeight2); //*Changes height of actual iframe
                    $(".sIFrame").prop("width", sWidth2);   //*Changes the div on the thing (kind of an insurance policy)
                    $(".sIFrame").prop("height", sHeight2);
                },
                300
            );
        }
        );
//$(".over").addClass("SurveyBG");
    $("#dContent").html(sIFrame);
    $(".active").removeClass("active");
    $("#survey").parent().addClass("active");
//$('#theTitle').html("Feedback"); //*Change to "feedback"
}

function setCookie(name, value, expire) {
    $.cookie(name, value, { expires: expire });    // Use { expires: expire, path: '/' } to have the cookie available across entire domain
}

function checkCookie(user) {
    if ($.cookie('user') !== user) {
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + (10 * 60 * 60 * 1000));
        setCookie('user', user, expDate);
    } else {
        return;
    }
}

function logout() {
    $.post("php/auth.php", {"logout":true}, function() {
        location.reload();
    });
}

function checkLogin() {
    $.post("php/auth.php", {check: true}, function (data) {
        data = $.parseJSON(data);
        var authCookie = data.login;
        if (authCookie === "1") {
            checkCookie(data.name);
            $("input[id=hiddenAuthor]").val($.cookie('user'));
            $("#loggedInAs").html("Logged in as " + $.cookie("user"));
            clearInterval(intervalId);
        } else {
            location.href = "php/auth.php";
        }
    });
}

var intervalId;

$(document).ready(function () {

    intervalId = setInterval(checkLogin, 500);
    
});