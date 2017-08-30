var districtNumbers = ["510","520","530","540","550","560","570","580","590","610","620","630","641","642","651","652","660","670","680","690","711","712","720","730","741","742","800","810","821","822","830","841","850","860","871","872","881","882","890","901","902","911","912","921","922","923","931","932","941","942","951","952","961","962","971","972","981","982","990"];
var centralDistricts = ["711","712","720","730","741","742","800","810","821","822","830","841","850","860","871","872","881","882","890"];
var eastDistricts =    ["901","902","911","912","921","922","923","931","932","941","942","951","952","961","962","971","972","981","982","990"];
var northDistricts =   ["510","520","530","540","550","560","570","580","590","610","620","630","641","642","651","652","660","670","680","690"];
var inputTypes = ["Crime", "PSA", "BOLO"];
var url = 'mysql_parse.php?postnum=20';
var date = new Date(); date=date.getFullYear().toString().substr(2,2);
var htmlStr = "";

$(document).ready( function() {

LoadForm();

$.getJSON(url, function(data) {
	htmlStr += "<ul class='bolo' id='boloFeed'>";
	$.each(data.posts, function(index, posts) {
    	
        /*'<div class="post_title">\n' +
        '  <p class="title">' + posts.title + '</p>\n' +
        '  <p class="date">' + posts.date + '</p>\n' +
        '  <p style="clear: both;"></p>\n' +
        '</div>\n' +
        '<div class="post_message">' + posts.districtId + ": " + posts.content + '</div>\n<br />\n'*/
        
        htmlStr += "<li class='bolo boloItem'>";
		
		htmlStr += "<div class='bolo boloTitleBar'>";
		
		htmlStr += "<div class='bolo boloTitleDiv boloDistrictNum'> <p>" + posts.districtId + " </p> </div>";
		
		htmlStr += "<div class='bolo boloTitleDiv boloCaseNum'> </div>";
		
		htmlStr += "<div class='bolo boloTitleDiv boloDate'> <p>" + posts.date + " </p></div>";
		
		htmlStr += "</div>";
		
		htmlStr += "<div class='bolo boloContent'>";
		
		htmlStr += "<div class='bolo boloTitle'> <p>" + posts.title + "</p> </div>";
		
		htmlStr += "<div class='bolo boloInfo'> <p>" + posts.content + "</p> </div>";
		
		htmlStr += "</div>"
		
		htmlStr += "</li>";
		
        });
        htmlStr += "</ul>";
    });


$("#backButton").click( function() {
	stepBack();
});

$(".checkboxLabel,.checkboxLabelchecked").click( function() {
	step2(this);
});

$(".radioLabel,.radioLabelchecked").click( function() {
	step3(this);
});

$(".ddWrapper").click( function () {
	if($(this).next(".L1").css('display') == 'none') {
		$(".L1").slideUp(500);
		$(".ddarrow").attr("src",'ddarrow_down.png');
		$(this).next(".L1").slideDown(500);
		$(this).find(".ddarrow").attr('src','ddarrow_up.png');
	}
	else {
		$(this).next(".L1").slideUp(500);
		$(this).find("img").attr("src",'ddarrow_down.png');
	}
});

$("textarea[name=title]").focus( function () {
	if($("textarea[name=title]").text() === 'Title') {
		$("textarea[name=title]").text('');
	}
});

$("textarea[name=content]").focus( function () {
	if(	$("textarea[name=content]").text() === 'Enter your message here.') {
		$("textarea[name=content]").text('');
	}
});

$("textarea[name=title]").blur( function () {
	if($("textarea[name=title]").text() === '') {
		$("textarea[name=title]").text("Title");
	}
});

$("textarea[name=content]").blur( function () {
	if(	$("textarea[name=content]").text() === '') {
		$("textarea[name=content]").text("Enter your message here.");
	}
});

});


var cbCount = 0;
function LoadForm() {
	
	htmlStr += "<form name='submitForm' method='post' action='passingTestPost.php'>";
	
	htmlStr += "<div id='statusBar' class='formPart2 preview' style='display:none'> <h3 id='backButton' class='formPart2 preview' style='display:none'> << Previous </h3> </div>";
	
	//North Precinct
	htmlStr += "<div class='ddWrapper formPart1'> <h2 class = 'formPart1'> North Precinct </h2>";
	
	htmlStr += "<img src='ddarrow_down.png' class='ddarrow'> </div>";
	
	htmlStr += "<ul class = 'formPart1 L1' style='display:none'>";
	
	for(var i = 0; i < northDistricts.length; i++) {
		htmlStr += "<li><label class = 'checkboxLabel' for='checkbox-" + cbCount + "'> <input type='radio' class='neighborhoods' value='" + northDistricts[i] + "' name='district' id='checkbox-" + cbCount + "' style='display:none'/>" + northDistricts[i] + "</label></li>";
		cbCount++;
	}
	
	htmlStr += "</ul>";
	
	//Central Precinct
	htmlStr += "<div class='ddWrapper formPart1'> <h2 class = 'formPart1'> Central Precinct </h2>";
	
	htmlStr += "<img src='ddarrow_down.png' class='ddarrow'> </div>";
	
	htmlStr += "<ul class = 'formPart1 L1' style='display:none'>";
	
	for(var i = 0; i < centralDistricts.length; i++) {
		htmlStr += "<li><label class = 'checkboxLabel' for='checkbox-" + cbCount + "'> <input type='radio' class='neighborhoods' value='" + centralDistricts[i] + "' name='district' id='checkbox-" + cbCount + "' style='display:none'/>" + centralDistricts[i] + "</label></li>";
		cbCount++;
	}
	
	htmlStr += "</ul>";
	
	//East Precinct
	htmlStr += "<div class='ddWrapper formPart1'> <h2 class = 'formPart1' > East Precinct </h2>";
	
	htmlStr += "<img src='ddarrow_down.png' class='ddarrow'> </div>";
	
	htmlStr += "<ul class = 'formPart1 L1' style='display:none'>";
	
	for(var i = 0; i < eastDistricts.length; i++) {
		htmlStr += "<li><label class = 'checkboxLabel' for='checkbox-" + cbCount + "'> <input type='radio' class='neighborhoods' value='" + eastDistricts[i] + "' name='district' id='checkbox-" + cbCount + "' style='display:none'/>" + eastDistricts[i] + "</label></li>";
		cbCount++;
	}
	
	htmlStr += "</ul>";
	
	//htmlStr += "<div><a class='formPart1' href='#' onclick='step2();return false;'>Next</a></div>";

	htmlStr += "<textarea class ='formPart2 textarea' name='title' rows='1' cols='50' maxLength='60' style='display:none'></textarea> <br />";

	htmlStr += "<textarea class ='formPart2 textarea' name='content' rows='9' cols='50' style='display:none'></textarea>";
	
	for (var i = 0; i < inputTypes.length; i++) {
		htmlStr += "<div> <label for='radio-" + i + "' class='formPart2 radioLabel' style='display:none'> <input type='radio' class='alertType' value='" + i + "' name='alertType' id='radio-" + i + "' style='display:none'>" + inputTypes[i] + "</label> </div>";
	}
	
	//htmlStr += "<a class='formPart2' style='display:none;' href='#' onclick='step3();return false;'>Next</a>"
	
	htmlStr += "<p class='preview previewParagraph' id='previewDistrict'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewTitle'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewContent'> </p>";
	
	htmlStr += "<p class='preview previewParagraph' id='previewType'> </p>";
	
	htmlStr += "<label class='preview' id='previewCaseLabel' style='display:none'>Case Number (required for BOLO's): <b>" + date + "</b></label>";
	
	htmlStr += "<textarea class ='preview' name='caseNum' rows='1' cols='20' style='display:none;vertical-align:bottom;'> </textarea> </br>";
	
	htmlStr += "<input type='submit' class='preview' style='display:none' id='submitButton' value='Submit' />";
	
	htmlStr += "</form>";
	
	$("#dContent").html(htmlStr);
	
	$("textarea[name=title]").text("Title");
	
	$("textarea[name=content]").text("Enter your message here.");
	
	/*htmlStr += "<ul class='bolo' id='boloFeed'>";
	
	for(int i = 0; i< ; i++) {
	
		htmlStr += "<li class='bolo boloItem' id='boloItem" + i + "'>";
	
		htmlStr += "</li>";
	
	}
	
	htmlStr += "</ul>";*/
	
}

function stepBack() {
	if($(".formPart1").css('display') == 'none' && $('#submitButton').css('display') == 'none') {
		$(".preview").hide();
		$(".formPart2").hide();
		$(".formPart1").show();
		$(".L1").hide();
		$(".ddarrow").attr("src",'ddarrow_down.png');
	}
	else if($(".formPart1").css('display') == 'none' && $(".radioLabel").css('display') == 'none') {
		$(".preview").hide();
		$(".formPart1").hide();
		$(".formPart2").show();
	}
}

function step2(e){
	for(var i = 0; i < districtNumbers.length; i++) {
		$("#checkbox-" + i + "").parent().removeClass('checkboxLabelchecked');
	}
	$(e).addClass('checkboxLabelchecked');
	$(e).children().attr('checked', 'checked');
	if($('#submitButton').css('display') == 'none') {
		$(".preview").hide();
		$(".formPart1").hide();
		$(".formPart2").show();
	}
	
}

function step3(e) {
	for(var i = 0; i < inputTypes.length; i++) {
		$("#radio-" + i + "").parent().removeClass('radioLabelchecked');
	}
	$(e).addClass('radioLabelchecked');
	$(e).children().attr('checked', 'checked');
	if($('#submitButton').css('display') == 'none') {
		$(".formPart1").hide();
		$(".formPart2").hide();
		$(".preview").show();
		$(".L1").hide();
		$(".ddarrow").attr("src",'ddarrow_down.png');
		loadPreview();
	}
}

function loadPreview() {
	var districtNum;
	var alertType;
	
	for(var i = 0; i < cbCount; i++) {
		if($("#checkbox-" + i + "").prop("checked") === true){
			districtNum = $("#checkbox-" + i + "").val();
			break;
		}
	}
	
	for(var i = 0; i < cbCount; i++) {
		if($("#radio-" + i + "").prop("checked") === true){
			alertType = $("#radio-" + i + "").val();
			break;
		}
	}
	
	$("#previewDistrict").text("District: " + districtNum);
	
	$("#previewTitle").text("Title: " + $("textarea[name=title]").val());
	
	$("#previewContent").text("Content: " + $("textarea[name=content]").val());
	
	$("#previewType").text("Type: " + inputTypes[alertType]);
}