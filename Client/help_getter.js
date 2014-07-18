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

helpGetter.method("createWindow", function(){
    var x = $.newWindow({
        id: "help",
        title: "Help",
        width: 700,
        height: 500,
        posx: 100,
        posy: 100,
        content: '<iframe id="helpFrame" border="0"></iframe>',
        type: "iframe",
        statusBar: true,
        minimizeButton: true,
        maximizeButton: true,
        closeButton: true,
        draggable: true,
        resizeable: true,
        modal: true
    });  

	this.setListeners();

});

helpGetter.method("initialize", function (title, version){
	this.title = title;
	this.version = version;

    var displayHelp = getCookie("displayIntroHelp");
    if (displayHelp == null)
    {
		this.createWindow();
		$.updateWindowContentWithAjax("help", '/Client/help_pages/intro.html?title=' + this.title + '&version=' + this.version);
	}
});

helpGetter.method("setListeners", function(){

	$("#helpFrame")[0].onload = function(){
		if ($("#helpFrame").contents().find("#noIDEHelpChoice").length > 0)
		{
			$("#helpFrame").contents().find("#noIDEHelpChoice").on('click', function(event) { 
				if ($(this).is(":checked"))
				{
					setCookie("displayIntroHelp", "no", 5);
				} 
				else
				{
//					alert("not checked");	
				}
			});
		}
	};

//	alert(length);//.contents().find("#noIDEHelpChoice").length);
//	$("#helpFrame").contents().find("#noIDEHelpChoice").on('click', function(event) { alert('test'); });
/*
	$(".fadeOverlay").click(function(){
		$("#help").hide(500);
		$(".fadeOverlay").hide(500);
		if($("#helpContainer").contents().find("#noIDEHelpChoice").length > 0){
			if ($("#helpContainer").contents().find("#noIDEHelpChoice").is(':checked')){
				setCookie("displayIntroHelp", "no", 5);
			}
		}
	});
*/
});

helpGetter.method("getHelp", function (moduleName)
{
	this.createWindow();
	$.updateWindowContentWithAjax("help", '/Client/help_pages/' + moduleName + '.html?title=' + this.title + '&version=' + this.version);
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