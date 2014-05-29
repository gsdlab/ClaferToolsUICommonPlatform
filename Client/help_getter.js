/*
Copyright (C) 2012 - 2014 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function helpGetter(host){
	this.host = host;
}

helpGetter.method("getInitial", function (title, version){
	var content = '<div class="fadeOverlay"></div>';
	content += '<div id="help" class="help" style="top:50px; left:100px;">';
	content += '<iframe id="helpContainer" name="helpContainer" class="help" src="/Client/help_pages/intro.html?title=' + title + '&version=' + version + '">';
	content += '</iframe></div>';
	content += '<form id="helpForm" target="helpContainer" method="get">';
	content += '<input type="hidden" name="title" value="' + title + '"/>';
	content += '<input type="hidden" name="version" value="' + version + '"/>';
	content += '</form>';
	return $(content);
});

helpGetter.method("setListeners", function(){
	$(".fadeOverlay").click(function(){
		$("#help").hide(500);
		$(".fadeOverlay").hide(500);
		if($("#helpContainer").contents().find("#noIDEHelpChoice").length > 0){
			if ($("#helpContainer").contents().find("#noIDEHelpChoice").is(':checked')){
				setCookie("displayIntroHelp", "no", 5);
			}
		}
	});
});

helpGetter.method("getHelp", function (moduleName){
	$("#helpForm").attr("action", "/Client/help_pages/" + moduleName + ".html");
    $("#helpForm").submit();
    $("#help").show(500);
    $(".fadeOverlay").show(500);
});

helpGetter.method("getHelpButton", function(moduleName){
	var that = this;
	var button = '<div class="window-helpButton"></div>';
	button = $(button);
	$(button).click(function(){
		that.getHelp(moduleName);
	});
	$(button).hover(function(){
		$(this).addClass("active");
	},
	function(){
		$(this).removeClass("active");
	});
	return button;
});