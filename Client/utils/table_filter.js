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

function tableFilter(tableid, claferXML, instancesXML, hostModule){
	this.host = hostModule;
	this.tableid = "#" + tableid;
	this.hidden = [];
	this.processor = new ClaferProcessor(claferXML);
	this.instanceProcessor = new InstanceProcessor(instancesXML);
	this.abstractClaferTree = hostModule.abstractClaferTree;
	this.permahidden = [];
	this.closedFeatures = [];
}

tableFilter.method("onRendered", function(){
	this.rows = $(this.tableid + " tr");
});

tableFilter.method("filterContent", function (){
	this.showAll();
//	this.saveFilters();
	//filter by features
 	for (var i=0;i<this.rows.length;i++){
 		var curRow = this.rows[i];
 		var filter = $(curRow).attr("FilterStatus")
 		if (filter == "none")
 			continue;
 		else if (filter == "require"){
	 		for (var j=0;j<$(curRow).children().length;j++){
	 			var curCell = $(curRow).children()[j];
	 			if ($(curCell).hasClass("no"))
	 				this.hideInstance(j);
	 		}
	 	} else if (filter == "exclude"){
	 		for (var j=0;j<$(curRow).children().length;j++){
	 			var curCell = $(curRow).children()[j];
	 			if ($(curCell).hasClass("tick"))
	 				this.hideInstance(j);
	 		}
	 	}
 	}

 	//close features
 	for(i=0; i<this.closedFeatures.length; i++){
 		this.closeFeature(this.closedFeatures[i]);
 	}

 	//permanently hidden instances (removed)
 	if(this.permahidden != []){
	 	for(i=0;i<this.permahidden.length;i++){
	 		$(this.permahidden[i]).hide();
	 	}
 	}

 	this.host.scrollToSearch($("#search").val());
});

tableFilter.method("hideInstance", function (position){
	for (var i=0;i<this.rows.length;i++){
		$($(this.rows[i]).children()[position]).hide();
		this.hidden.push($($(this.rows[i]).children()[position]));
	}
});

tableFilter.method("showAll", function (){
	while(this.hidden.length > 0)
		$(this.hidden.pop()).show();
});

tableFilter.method("hideRowByClaferPath", function (pathArray)
{
	var path = pathArray.join("-");
	for (var i = 1; i < this.rows.length; i++)
	{
		var curRow = this.rows[i];
		var currentPath = $($(curRow).find(".path")).first();
		if ($(currentPath).text() == path)
		{
			$(curRow).hide();
			this.hidden.push(curRow);
		}
	}
});

tableFilter.method("openFeature", function (featurePath){
	var index = this.closedFeatures.indexOf(featurePath);
	this.closedFeatures.splice(index, 1);
	this.filterContent();
});

tableFilter.method("closeFeature", function (featurePath){

    var node = this.findNodeInTree(this.abstractClaferTree, featurePath.split("-"), 0);

	this.hideChildren(node);
	
	if (this.closedFeatures.indexOf(featurePath) == -1)
		this.closedFeatures.push(featurePath);

	this.host.scrollToSearch($("#search").val());
});

tableFilter.method("hideChildren", function (node)
{
 	for (var i = 0; i < node.subclafers.length; i++)
 	{
 		this.hideChildren(node.subclafers[i]);
 		this.hideRowByClaferPath(node.subclafers[i].path);
 	}
});

tableFilter.method("findNodeInTree", function (root, featurePath, index)
{
	if (index == featurePath.length - 1)
		return root;

	if (root.claferId !== featurePath[index])
		return null;

	if (root.subclafers.length < 1)
		return null;
	
	index++;

	for (var i = 0; i < root.subclafers.length; i++)
	{
		if (root.subclafers[i].claferId == featurePath[index])
		{
			return this.findNodeInTree(root.subclafers[i], featurePath, index);
		}
	}
});	

/*
tableFilter.method("resetFilters", function (filters, permahidden){
	if(filters != []){
		for (var i=1;i<this.rows.length;i++){
			var curRow = this.rows[i];
			$(curRow).attr("FilterStatus", filters[i]);
			if ($("#r" + i + "box").length > 0){
				if ($("#r" + i + "box").attr("src").indexOf("commons/Client/images/checkbox_ticked_greyed.png") == -1){
					if (filters[i] == "none")
						$("#r" + i + "box").attr("src", "commons/Client/images/checkbox_empty.bmp");
					else if (filters[i] == "require")
						$("#r" + i + "box").attr("src", "commons/Client/images/checkbox_ticked.bmp");
					else if (filters[i] == "exclude")
						$("#r" + i + "box").attr("src", "commons/Client/images/checkbox_x.bmp");
				}
			}
		}
 	}
 	this.permahidden = permahidden;
 	//fires to realign headers
 	this.host.scrollToSearch("");
});

tableFilter.method("saveFilters", function(){
	var filters = ["none"];
	for (var i=1;i<this.rows.length;i++){
 		var curRow = this.rows[i];
 		var filter = $(curRow).attr("FilterStatus")
 		if (filter == "none"){
 			filters.push("none");
 		} else if (filter == "require"){
			filters.push("require");
	 	} else if (filter == "exclude"){
			filters.push("exclude");
	 	}
 	}
 	this.host.SavedFilters = filters;
});
*/
tableFilter.method("cleanFilters", function (){
	this.showAll();
 	for (var i=1;i<this.rows.length;i++){
 		var curRow = this.rows[i];
 		$(curRow).attr("FilterStatus", "none");
 		if ($("#r" + i + "box").length > 0){
	 		if ($("#r" + i + "box").attr("src").indexOf("commons/Client/images/checkbox_ticked_greyed.png") == -1)
 				$("#r" + i + "box").attr("src", "commons/Client/images/checkbox_empty.bmp");
 		}
 	}
});

tableFilter.method("removeInstance", function(instanceNum){
	$("#th0_" + instanceNum).hide();
	this.permahidden.push("#th0_" + instanceNum);

	for (var i=0;i<this.rows.length;i++){
		$("#td" + i + "_" + instanceNum).hide();
		this.permahidden.push("#td" + i + "_" + instanceNum);
	}
	this.host.permahidden = this.permahidden;

});
