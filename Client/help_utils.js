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
}

/* from stackoverflow.com */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}