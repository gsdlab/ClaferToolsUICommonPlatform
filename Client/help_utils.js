function docLoad()
{
	var title = getParameterByName("title");
	var version = getParameterByName("version");
	var titleElem = document.getElementById("title");
	if (titleElem)
		titleElem.innerHTML = title;

	var versionElem = document.getElementById("version");	

	if (versionElem)
		versionElem.innerHTML = version;

	var homeLinkElements = document.getElementsByTagName("a");

	for (var i = 0; i < homeLinkElements.length; i++)
	{
		if (homeLinkElements[i].className == "local")
		{
			homeLinkElements[i].href = homeLinkElements[i].href + "?title=" + title + "&version=" + version;
		}
	}

}

/* from stackoverflow.com */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}