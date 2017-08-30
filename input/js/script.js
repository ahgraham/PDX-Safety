/*jslint plusplus : true, browser: true*/
/*global  $*/
var districtNumbers = ["510", "520", "530", "540", "550", "560", "570", "580", "590", "610", "620", "630", "641", "642", "651", "652", "660", "670", "680", "690", "711", "712", "720", "730", "741", "742", "800", "810", "821", "822", "830", "841", "850", "860", "871", "872", "881", "882", "890", "901", "902", "911", "912", "921", "922", "923", "931", "932", "941", "942", "951", "952", "961", "962", "971", "972", "981", "982", "990"],
    centralDistricts = ["711", "712", "720", "730", "741", "742", "800", "810", "821", "822", "830", "841", "850", "860", "871", "872", "881", "882", "890"],
    eastDistricts =    ["901", "902", "911", "912", "921", "922", "923", "931", "932", "941", "942", "951", "952", "961", "962", "971", "972", "981", "982", "990"],
    northDistricts =   ["510", "520", "530", "540", "550", "560", "570", "580", "590", "610", "620", "630", "641", "642", "651", "652", "660", "670", "680", "690"],
    inputTypes = ["Neighborhood Safety", "Announcement", "BOLO"],
    subTypes = ["Special Events", "Traffic", "Criminal Activity", "Radar and Traffic Enforcement", "Public Meeting", "Crime Tip", "LGBTQ", "Other"],
    url = 'php/mysql_parse.php?postnum=20&type=2',
    date = new Date(),
    htmlStr = "",
    formPart = 1,
    districtCount = 0;
date = date.getFullYear().toString().substr(2, 2); //Gets last two digits of the year

function loadPreview() {
    var districtNum,
        alertType,
        i,
        subType;
    for (i = 0; i < districtCount; i++) {
        if ($("#checkbox-" + i).prop("checked") === true) {
            districtNum = $("#checkbox-" + i).val();
            break;
        }
    }
    for (i = 0; i < inputTypes.length; i++) {
        if ($("#radio-" + i).prop("checked") === true) {
            alertType = $("#radio-" + i).val();
            break;
        }
    }
    for (i = 0; i < subTypes.length; i++) {
        if ($("#subType-" + i).prop("checked") === true) {
            subType = $("#subType-" + i).val();
            break;
        }
    }
    if (districtNum === '1') {
        districtNum = 'City Wide';
    }
    $("#previewDistrict").text("District: " + districtNum);
    $("#previewTitle").text("Title: " + $("textarea[name=title]").val());
    $("#previewContent").text("Content: " + $("textarea[name=content]").val());
    $("#previewType").text("Type: " + inputTypes[alertType]);
    $("#previewType").text("SubType: " + subTypes[subType]);
}

function stepBack() {

    var alertType, i;
    for (i = 0; i < inputTypes.length; i++) {
        if ($("#radio-" + i).prop("checked") === true) {
            alertType = $("#radio-" + i).val();
            break;
        }
    }
    if ($(".formPart1").css('display') === 'none' && $(".subTypeLabel").css('display') === 'none' && $('#submitButton').css('display') === 'none') {
        $(".preview").hide();
        $(".formPart2").hide();
        $(".formPart3").hide();
        $(".formPart1").show();
        $(".L1").hide();
        $(".ddarrow").attr("src", 'img/ddarrow_down.png');
        formPart = 1;
    } else if ($(".formPart1").css('display') === 'none' && $(".radioLabel").css('display') === 'none' && $('#submitButton').css('display') === 'none') {
        $(".preview").hide();
        $(".formPart1").hide();
        $(".formPart3").hide();
        $(".formPart2").show();
        formPart = 2;
    } else if ($('#submitButton').css('display') !== 'none' && alertType === '1') {
        $(".preview").hide();
        $(".formPart1").hide();
        $(".formPart2").hide();
        $(".formPart3").show();
        formPart = 3;
    } else {
        $(".preview").hide();
        $(".formPart1").hide();
        $(".formPart3").hide();
        $(".formPart2").show();
        formPart = 2;
    }
}

function step2(e) {
    for (var i = 0; i < districtNumbers.length; i++) {
        $("#checkbox-" + i).parent().removeClass('checkboxLabelchecked');
    }
    $(e).addClass('checkboxLabelchecked');
    $(e).children().attr('checked', 'checked');
    if ($('#submitButton').css('display') === 'none') {
        $(".preview").hide();
        $(".formPart1").hide();
        $(".formPart3").hide();
        $(".formPart2").show();
        formPart = 2;
    }
}

function step4(e) {
    var i;
    for (i = 0; i < subTypes.length; i++) {
        $("#subType-" + i).parent().removeClass('subTypeLabelchecked');
    }
    $(e).addClass('subTypeLabelchecked');
    $(e).children().attr('checked', 'checked');
    if ($('#submitButton').css('display') === 'none') {
        $(".formPart1").hide();
        $(".formPart2").hide();
        $(".formPart3").hide();
        $(".preview").show();
        $(".L1").hide();
        $(".ddarrow").attr("src", 'img/ddarrow_down.png');
        formPart = 4;
    }
    loadPreview();
}

function step3(e) {

    var alertType, i;
    for (i = 0; i < inputTypes.length; i++) {
        $("#radio-" + i).parent().removeClass('radioLabelchecked');
    }
    $(e).addClass('radioLabelchecked');
    $(e).children().attr('checked', 'checked');
    for (i = 0; i < inputTypes.length; i++) {
        if ($("#radio-" + i).prop("checked") === true) {
            alertType = $("#radio-" + i).val();
        }
    }
    if (alertType === '1') {
        if ($('#submitButton').css('display') === 'none') {
            $(".formPart1").hide();
            $(".formPart2").hide();
            $(".preview").hide();
            $(".formPart3").show();
            $(".L1").hide();
            $(".ddarrow").attr("src", 'img/ddarrow_down.png');
            formPart = 3;
        }
    } else {
        step4($("label[for=subType-" + (subTypes.length - 1) + "]"));
    }
}

function selectLongest(array) {
    var longestLabel = 0, i;
    for (i = 0; i < array.length; i++) {
        if (array[i].length > array[longestLabel].length) {
            longestLabel = i;
        }
    }
    return longestLabel;
}

function resizeText(inside, outside) {
    var textSize = inside.css("font-size");
    inside.css("line-height", textSize);
    textSize = parseInt(textSize.replace("px", ""), 10);
    while (textSize < outside.height() - (outside.height() * 0.2) && inside.width() < outside.width() - (outside.width() * 0.2)) {
        textSize += 4;
        inside.css("font-size", textSize);
    }
    return textSize;
}

function centerTextVertical(smaller, larger) {
    smaller.css("line-height", smaller.css("font-size"));
    var heightDiff = larger.height() - smaller.height();
    smaller.css("margin-top", heightDiff / 2);
}

function styleText() {
    var arrayLoc, textSize, i;
    $(".labelText").css("font-size", 2);
    $(".labelText").css("line-height", $(".labelText").css("font-size"));
    
    arrayLoc = selectLongest(districtNumbers);
    textSize = resizeText($("#checkboxspan-" + arrayLoc), $("label[for='checkbox-" + arrayLoc + "']"));
    for (i = 0; i < districtCount - 1; i++) {
        $("#checkboxspan-" + i).css("font-size", textSize);
        centerTextVertical($("#checkboxspan-" + i), $("label[for='checkbox-" + i + "']"));
    }

    arrayLoc = selectLongest(inputTypes);
    textSize = resizeText($("#radiospan-" + arrayLoc), $("label[for='radio-" + arrayLoc + "']"));
    for (i = 0; i < inputTypes.length; i++) {
        $("#radiospan-" + i).css("font-size", textSize);
        centerTextVertical($("#radiospan-" + i), $("label[for='radio-" + i + "']"));
    }

    arrayLoc = selectLongest(subTypes);
    textSize = resizeText($("#subTypespan-" + arrayLoc), $("label[for='subType-" + arrayLoc + "']"));
    for (i = 0; i < subTypes.length; i++) {
        $("#subTypespan-" + i).css("font-size", textSize);
        centerTextVertical($("#subTypespan-" + i), $("label[for='subType-" + i + "']"));
    }
}

function hideFormParts() {
    if (formPart === 1) {
        $(".preview").hide();
        $(".formPart2").hide();
        $(".formPart3").hide();
        $(".formPart1").show();
        $(".L1").hide();
    } else if (formPart === 2) {
        $(".preview").hide();
        $(".formPart1").hide();
        $(".formPart3").hide();
        $(".formPart2").show();
    } else if (formPart === 3) {
        $(".formPart1").hide();
        $(".formPart2").hide();
        $(".preview").hide();
        $(".formPart3").show();
        $(".L1").hide();
    } else {
        $(".formPart1").hide();
        $(".formPart2").hide();
        $(".formPart3").hide();
        $(".preview").show();
        $(".L1").hide();
    }
}

function showFormParts() {
    $(".preview").show();
    $(".formPart2").show();
    $(".formPart3").show();
    $(".formPart1").show();
    $(".L1").show();
}

function LoadForm() {

    var i;
    
    htmlStr += "<form name='submitForm' method='post' action='php/contact.php'>";
    htmlStr += "<div class='formPart1'>";
    htmlStr += '<div class="accordion" id="accordion2">\
        <div class="accordion-group">\
            <div class="accordion-heading ddWrapper">\
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">\
                    <h2>North Precinct</h2>\
                </a>\
            </div>\
            <div id="collapseOne" class="accordion-body collapse">\
                <div class="accordion-inner">';
    //North Precinct
    htmlStr += "<ul>";
    htmlStr += "<div class='row-fluid'>";
    for (i = 0; i < northDistricts.length; i++) {
        htmlStr += "<div class='span3'><label class='checkboxLabel' for='checkbox-" + districtCount + "'> <input type='radio' class='neighborhoods' value='" + northDistricts[i] + "' name='district' id='checkbox-" + districtCount + "' style='display:none'/> <p class='labelText' id='checkboxspan-" + districtCount + "'>" + northDistricts[i] + " </p> </label></div>";
        if((i + 1) % 4 === 0) {
            htmlStr += "</div>";
            htmlStr += "<div class='row-fluid'>";
        }
        districtCount++;
    }
    htmlStr += "</div>";
    htmlStr += '</ul>\
                </div>\
            </div>\
        </div>\
        <div class="accordion-group">\
            <div class="accordion-heading ddWrapper">\
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">\
                    <h2>Central Precinct</h2>\
                </a>\
            </div>\
            <div id="collapseTwo" class="accordion-body collapse">\
                <div class="accordion-inner">';
    htmlStr += "<ul>";
    
    htmlStr += "<div class='row-fluid'>";
    for (i = 0; i < centralDistricts.length; i++) {
        htmlStr += "<div class='span3'><label class='checkboxLabel' for='checkbox-" + districtCount + "'> <input type='radio' class='neighborhoods' value='" + centralDistricts[i] + "' name='district' id='checkbox-" + districtCount + "' style='display:none'/> <p class='labelText' id='checkboxspan-" + districtCount + "'>" + centralDistricts[i] + " </p> </label></div>";
        if((i + 1) % 4 === 0) {
            htmlStr += "</div>";
            htmlStr += "<div class='row-fluid'>";
        }
        districtCount++;
    }
    htmlStr += "</div>";
    
    htmlStr += "</ul>";
    htmlStr +=' \
                </div>\
            </div>\
        </div>\
        <div class="accordion-group">\
            <div class="accordion-heading ddWrapper">\
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">\
                    <h2>East Precinct</h2>\
                </a>\
            </div>\
            <div id="collapseThree" class="accordion-body collapse">\
                <div class="accordion-inner">';
    htmlStr += "<ul>";
    htmlStr += "<div class='row-fluid'>";
    for (i = 0; i < eastDistricts.length; i++) {
        htmlStr += "<div class='span3'><label class='checkboxLabel' for='checkbox-" + districtCount + "'> <input type='radio' class='neighborhoods' value='" + eastDistricts[i] + "' name='district' id='checkbox-" + districtCount + "' style='display:none'/> <p class='labelText' id='checkboxspan-" + districtCount + "'>" + eastDistricts[i] + " </p> </label></div>";
        if((i + 1) % 4 === 0) {
            htmlStr += "</div>";
            htmlStr += "<div class='row-fluid'>";
        }
        districtCount++;
    }
    htmlStr += "</div>";
    
    htmlStr += "</ul>";
    htmlStr +='</div>\
                </div>\
            </div>\
        </div>';
    
    htmlStr += "<label class = 'checkboxLabel formPart1 ddWrapper' for='checkbox-" + districtCount + "'>";
	
	htmlStr += "<input type='radio' class='neighborhoods' name='district' value='1' id='checkbox-" + districtCount + "' style='display:none'>";
	
	htmlStr += "<h2 class='ddTitle'> City Wide </h2> </label>";
	
	districtCount++;
    htmlStr += '</div>';

    htmlStr += "<div class='formPart2'>";

    htmlStr += "<textarea class='formPart2 textarea' id='title' name='title' rows='1' cols='50' maxLength='60'></textarea> <br />";

    htmlStr += "<textarea class='formPart2 textarea' id='content' name='content' rows='9' cols='50'></textarea> <br />";
    
    htmlStr += "<div class='row-fluid'>";
    for (i = 0; i < inputTypes.length; i++) {
        htmlStr += "<div class='span4'><label for='radio-" + i + "' class='formPart2 radioLabel'> <input type='radio' class='alertType' value='" + i + "' name='alertType' id='radio-" + i + "' style='display:none'> <p class='labelText' id='radiospan-" + i + "'>" + inputTypes[i] + " </p> </label></div>";
        if((i + 1) % 3 === 0) {
            htmlStr += "</div>";
            htmlStr += "<div class='row-fluid'>";
        }
    }
    htmlStr += "</div>";

    //htmlStr += "<a class='formPart2' style='display:none;' href='#' onclick='step3();return false;'>Next</a>";

    htmlStr += "</div>";

    htmlStr += "<div class='formPart3'>";

    htmlStr += "<div class='row-fluid'>";
    for (i = 0; i < subTypes.length; i++) {
		htmlStr += "<div class='span3'><label for='subType-" + i + "' class='formPart3 subTypeLabel'> <input type='radio'  name='subType' id='subType-" + i + "' value='" + i + "' style='display:none'> <p class='labelText' id='subTypespan-" + i + "'>" + subTypes[i] + " </p> </label></div>";
	    if((i + 1) % 4 === 0) {
            htmlStr += "</div>";
            htmlStr += "<div class='row-fluid'>";
        }
	}
	htmlStr += "</div>";

    htmlStr += "</div>";

    htmlStr += "<div class='preview'>";
    
    htmlStr += "<p class='preview previewParagraph' id='previewDistrict'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewTitle'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewContent'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewType'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewSubType'> </p>";
	
	htmlStr += "<label class='preview' id='previewCaseLabel'>Case Number (required for BOLO's): <b>" + date + "</b></label>";
	
	htmlStr += "<textarea class ='preview' name='caseNum' rows='1' cols='20' style='vertical-align:bottom;'> </textarea> </br>";
	
	htmlStr += "<input type='hidden' name='input' value='True'>";
	
	htmlStr += "<input type='hidden' name='author' id='hiddenAuthor' value='" + $.cookie('user') + "'>";
	
	htmlStr += "<input type='submit' class='preview' id='submitButton' value='Submit' />";
    
    htmlStr += "</div>";
    
    htmlStr += "</form>";

    $("#dContent").html(htmlStr);
    
    $("textarea[name=title]").text("Title");
	
	$("textarea[name=content]").text("Enter your message here.");
	
    styleText();
    hideFormParts();
    
    $("#loggedInAs").html("Logged in as " + $.cookie("user"));
}

function verifyForm(e) {
    if($("textarea[name=title]").text() === 'Title' || $("textarea[name=content]").text() === 'Enter your message here.' || $("textarea[name=content]").text() == "" || $("textarea[name=title]").text() == "") {
        e.preventDefault();
        window.alert("Please add a title and/or content");
    }
}

$(document).ready(function () {
    
    LoadForm();
    
    $("#backButton").click(function () {
        stepBack();
    });
    $(".checkboxLabel,.checkboxLabelchecked").click(function () { //steps forward from district select page
        step2(this);
    });
    $(".radioLabel,.radioLabelchecked").click(function () { //steps forward from Title/Content page
        step3(this);
    });
    $(".subTypeLabel,.subTypeLabelchecked").click(function () { //steps forward from subType page
        step4(this);
    });
    $(window).resize(function () {
      //resize just happened
            showFormParts();
            styleText();
            hideFormParts();
    });
    $("textarea[name=title]").focus(function () {                        // Runs when Title textarea is clicked
        if ($("textarea[name=title]").text() === 'Title') {                // If text is Title the text is removed
            $("textarea[name=title]").text('');
        }
    });
    $("textarea[name=content]").focus(function () {                    // Runs when message content textarea is clicked
        if ($("textarea[name=content]").text() === 'Enter your message here.') {    // If text is default then it is removed
            $("textarea[name=content]").text('');
        }
    });
    $("textarea[name=title]").blur(function () {                        // Runs when Title textarea is deselected
        if ($("textarea[name=title]").text() === '') {                    // If there is nothing entered text is reset to default
            $("textarea[name=title]").text("Title");
        }
    });
    $("textarea[name=content]").blur(function () {                        // Runs when message/content area is selected
        if (    $("textarea[name=content]").text() === '') {
            $("textarea[name=content]").text("Enter your message here.");        // If there is nothing entered text is reset to default
        }
    });
    $("#submitButton").click(function(e) {
        //verifyForm(e);
    });
});