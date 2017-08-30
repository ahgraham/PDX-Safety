function LoadUpdateForm() {
    var htmlStr = "";

    htmlStr += "<h2 id='settingsTitle'>Account Settings</h2>";

    htmlStr += "<div id='updateForm'>";

    htmlStr += "<p> Fill out only the parts of this form you want to make changes to. </p>";

    htmlStr += "<p class='updateFormSection'> Current Password (Required to make any changes): <input type='password' id='pass' class='updateFormBox'> </p>";        // Current Password

    htmlStr += "<p class='updateFormSection'> Your Name (This is what is shown to citizens, not your username): <input type='text' id='realname' class='updateFormBox'> </p>";        // Your Name

    htmlStr += "<p class='updateFormSection'> Email: <input type='text' id='email' class='updateFormBox'> </p>";        // Email

    htmlStr += "<p class='updateFormSection'> New Password: <input type='password' id='newPass' class='updateFormBox'> </p>";        // New Password

    htmlStr += "<p class='updateFormSection'> Retype New Password: <input type='password' id='newPass2' class='updateFormBox'> </p>";        // New Password 2

    htmlStr += "<input type='button' id='updateFormSubmit' value='Submit Changes'>";

    htmlStr += "</div>";

    $("#dContent").html(htmlStr);
}

function clearUpdateForm() {
    $('#pass').val("");
    $('#realname').val("");
    $('#email').val("");
    $('#newPass').val("");
    $('#newPass2').val("");
}

$(document).ready( function () {

    LoadUpdateForm();

    $("#updateFormSubmit").click( function () {
        var pass, realname, email, newPass, newPass2, confirm = false;
        pass = $('#pass').val();
        realname = $('#realname').val();
        email = $('#email').val();
        newPass = $('#newPass').val();
        newPass2 = $('#newPass2').val();
        if(newPass !== newPass2) {
            window.alert("Your new passwords don't match.");
            return;
        }
        if((!newPass || newPass === "") && (!newPass2 || newPass2 === "")) {
            newPass = pass;
            newPass2 = pass;
            confirm = true;
        }
        else {
            confirm = window.confirm("Are you sure you want to change your password?");
        }
        if(confirm) {
            $.post("php/auth.php", {update: true, user: $.cookie('user'), pass: pass, newPass: newPass, newPass2: newPass2, realname: realname, email: email}, function (data) {
                data = $.parseJSON(data);
                if(data.err) {
                    window.alert("Update failed!");
                    clearUpdateForm();
                    return;
                }
                if(data.success && (($('#newPass').val() !== "" && $('#newPass2').val() !== "")) || $('#email').val() !== "" || $('#realname').val() !== "") {
                    window.alert("Your information was updated.");
                }
                else {
                    window.alert("No new information submitted.");
                }
                clearUpdateForm();
            });
        }
    });

});