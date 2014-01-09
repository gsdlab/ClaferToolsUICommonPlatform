function helpGetter(host){
	this.host = host;
}

helpGetter.method("getInitial", function (title, version){
	var content = '<div class="fadeOverlay"></div>';
	content += '<div id="help" class="help" style="top:50px; left:100px;">';
	content += '<iframe id="helpContainer" name="helpContainer" class="help" src="/Client/help_pages/intro.html?title=' + title + '&version=' + version + '">';
	content += '</iframe></div>';
	content += '<form id="helpForm" target="helpContainer" method="get"><form>';
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
	$("#helpForm").attr("action", "/Client/help_pages/" + moduleName + ".html?title=" + title + "&version=" + version);
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