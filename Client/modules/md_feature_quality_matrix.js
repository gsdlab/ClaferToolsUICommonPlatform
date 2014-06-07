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
function FeatureQualityMatrix(host, settings)
{ 
    this.id = "mdFeatureQualityMatrix";
    this.settings = settings;
    this.title = this.settings.title;

    this.width = this.settings.layout.width;
    this.height = this.settings.layout.height;
    this.posx = this.settings.layout.posx;
    this.posy = this.settings.layout.posy;
    
    this.fadeColor = "#777";
    this.normalColor = "#000"

    this.fadeOpacity = "0.7";
    this.normalOpacity = "1.0";

    this.colWidth = 250;

    this.dataTable = new DataTable();
// here is where we store our model
    this.host = host;
    this.host.loaded();

    this.unparsedInstances = null;    
}

FeatureQualityMatrix.method("resize", function() // not attached to the window anymore, so need to call the method
{
//    this.synchronizeWidths();
    return true;
});

FeatureQualityMatrix.method("onDataLoaded", function(data){

    console.log("fqm: onDataLoaded enter");
    this.unparsedInstances = data.unparsedInstances;

    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.processor = new ClaferProcessor(data.claferXML);

    this.abstractClaferTree = null;
    var instanceCount = this.instanceProcessor.getInstanceCount();

    console.log("fqm: onDataLoaded middle");

    if (instanceCount == 0) // instance data contains no instances
    {
        if (this.lastAbstractClaferTree)
        {
            this.abstractClaferTree = this.lastAbstractClaferTree;
        }
        else
        {
            return; // else we cannot do anything         
        }
    }
    else
    {
        var instanceName = 'root';
//        alert(instanceName);
        this.abstractClaferTree = this.processor.getTopClaferTree(instanceName);
        this.lastAbstractClaferTree = this.abstractClaferTree;
    }
    
    this.filter = new tableFilter("comparison", data.claferXML, data.instancesXML, this);    
//    this.clearFilters();
    this.abstractClaferOutput = "";    
    this.toggled = false;    
    this.dataTable.loadFromXML(this.instanceProcessor, this.abstractClaferTree);    
    this.content = $('<div id="comparison" class="comparison"></div>').append(new TableVisualizer().getHTML(this.dataTable, this.colWidth));
    this.currentRow = 1;
    console.log("fqm: onDataLoaded end");
//    this.EMfeatures = [];

});

FeatureQualityMatrix.method("addControlPanel", function()
{
    var context = this;

// Add search bar 
    var panel = $('<div id="matrix-panel"></div>');
    var vl = $('<div class="verticalLine">&nbsp;</div>');
    $(panel).append('Search: <input type="text" id="search" class="text_input" placeholder="search" style="width: 100px">');
    $(panel).append(vl);
// Adding buttons for comparison table
// Distinct button for greying out non-distinct features
    $(panel).append('<button id="toggle_link">Toggle</button>');
    $(panel).append('&nbsp;<button id="filter_reset">Toggle</button>');
    $(panel).append(vl);
//    $(panel).append('<button id="saveAll">Save all variants</button>');
    $(panel).append('<input type="button" id="saveAll" value="Save all variants">');
    $(panel).append(vl);
//    $(panel).append('Shown <span id="instanceshown"></span> out of <span id="instancecount"></span>');
    $(panel).append('<form id="saveAllForm" action="/saveinstances" method="post" enctype="multipart/form-data">' + '<input type="hidden" name="data" id="saveAllData" value=""/>' + '<input type="hidden" name="windowKey" value="' + this.host.key + '"/>' + '</form>');

    $("#comparison").prepend(panel);


    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(function(event){
        event.stopPropagation();  //to keep table from sorting by instance number
        context.toggleDistinct();
    }).css("cursor", "pointer");

// Reset button for reseting filters

    $('#filter_reset').html("Reset filters");
    $('#filter_reset').click(function(event){
        event.stopPropagation(); //to keep table from sorting by instance number
        context.filter.cleanFilters();
        context.filter.filterContent();
        context.settings.onReset(context);
            //if currently set to distinct mode, refresh distinct rows
        if (this.toggled){
            this.toggleDistinct(); //one to turn off distinct
            this.toggleDistinct(); //one to reapply it
        }
    }).css("cursor", "pointer");

// add handler to search bar
    $('#search').keyup(function(){
        context.applySearch();
    }); 

    $('#search').click(function(event){
//        event.stopPropagation(); //to keep table from sorting by instance number
    });

    $('#saveAll').click(this.saveAll.bind(this)).css("cursor", "pointer");

    $('#instanceshown').html(this.dataTable.instanceShown);
    $('#instancecount').html(this.dataTable.instanceCount);

});

FeatureQualityMatrix.method("onRendered", function()
{
    if (!this.filter)
        return;
    
    this.filter.onRendered();
    this.addControlPanel();

    if (this.settings.buttonsForRemoval)
    {
    //  Add remove buttons to instances
        var instances = $("#comparison #r0").find(".td_instance");
        for (i=0; i<$(instances).length; i++){
            $(instances[i]).prepend('<image id="rem' + $(instances[i]).text() + '" src="commons/Client/images/remove.png" alt="remove">')
            var buttonId = "#rem" + $(instances[i]).text();
            $(buttonId).attr("name", $(instances[i]).text());
            $(buttonId).click(function(event){
                that.removeInstance($(this).attr("name"));
                event.stopPropagation();
            });
            $(buttonId).css("float", "left");
            $(buttonId).css("vertical-align", "middle");
            $(buttonId).css("cursor", "pointer");
            
            $(buttonId).hover(
            function () {
                $(this).attr("src", "/commons/Client/images/removeMouseOver.png");
            }, 
            function () {
                $(this).attr("src", "/commons/Client/images/remove.png");
            });
        }
    }

// Add tristate checkboxes for filtering features
    i = 1;
    row = $("#r" + i);    
        
    var that = this;
    while (row.length != 0){
        // setting the default filtering status to each row - none
        if (row.hasClass("bool") || row.hasClass("boolclafer"))
        {
            $(row).attr("FilterStatus", "none");

            var emValue = $(row).find(".emvalue");
            if (emValue.length > 0) // is effectively  mandatory
            {
                if ($(emValue).text().indexOf("yes") >= 0)
                {
                    $("#r" + i + " .td_abstract .typelabel").addClass("filter_checked");
                }
                else
                {
                    $("#r" + i + " .td_abstract .typelabel").addClass("filter_unchecked");
                }                    
            }
            else
            {
                $("#r" + i + " .td_abstract .typelabel").addClass("filter_normal");

                $("#r" + i + " .td_abstract .typelabel").click(function()
                {
                    if ($(this).parent().parent().attr("FilterStatus") == "none"){
                        $(this).removeClass("filter_normal");
                        $(this).removeClass("filter_unchecked");
                        $(this).addClass("filter_checked");
                        $(this).parent().parent().attr("FilterStatus", "require");
                        that.featureChecked($(this).parent().find(".path").text(), 1);
                    } else if ($(this).parent().parent().attr("FilterStatus") == "require"){
                        $(this).removeClass("filter_normal");
                        $(this).addClass("filter_unchecked");
                        $(this).removeClass("filter_checked");
                        $(this).parent().parent().attr("FilterStatus", "exclude");
                        that.featureChecked($(this).parent().find(".path").text(), -1);
                    } else {
                        $(this).addClass("filter_normal");
                        $(this).removeClass("filter_unchecked");
                        $(this).removeClass("filter_checked");
                        $(this).parent().parent().attr("FilterStatus", "none");
                        that.featureChecked($(this).parent().find(".path").text(), 0);                    
                    }
                }).css("cursor", "pointer");
            }            
        }
        i++;
        row = $("#r" + i);
    }
    //  Add collapse buttons for features with children

    var hasChild = this.processor.getFeaturesWithChildren(this.abstractClaferTree);
    i = 1;
    row = $("#r" + i);
    var that = this;
    while (row.length != 0){

//        adding tooltips

        $("#r" + i + " .td_abstract").tipsy({fade: true, gravity: 'w', html: true});
        $("#r" + i + " .td_instance").tipsy({fade: true, gravity: 's', html: true});

//  Add sorting to quality attributes
        if (row.hasClass("int")) {
            $("#r" + i + " .td_abstract").append('<div id=sortText style="display:inline"></div>');
            $("#r" + i + " .td_abstract").addClass('noSort');
            $("#r" + i + " .td_abstract").click(function(){
                if($(this).hasClass("sortAsc")){
                    $(this).toggleClass("sortAsc sortDesc");
                    $(this).find("#sortText").html("&nbsp;\u25B6");
                } else if ($(this).hasClass("sortDesc")){
                    $(this).toggleClass("sortDesc sortAsc");
                    $(this).find("#sortText").html("&nbsp;\u25C0");
                } else if ($(this).hasClass("noSort")){
                    $(this).toggleClass("noSort sortAsc");
                    $(this).find("#sortText").html("&nbsp;\u25C0");
                }
                that.rowSort($(this).text());
            }).css("cursor", "pointer");
        }
        else 
        { 
            // collapse / expand features

            var feature = $($("#r" + i + " .td_abstract").find(".id")).text();

            if (hasChild.indexOf(feature) != -1){
                $("#r" + i + " .td_abstract").append('<text id="r' + i + 'collapse" status="false">&nbsp;\u21B4<text>')
                $("#r" + i + "collapse").click(function(){
                    if ($(this).attr("status") === "false")
                    {
                        that.onFeatureCollapsed($($($(this).parent()).find(".path")).text());
                        $(this).attr("status", "true");
                        $(this).html("&nbsp;\u2192");
                    } else {
                        that.onFeatureExpanded($($($(this).parent()).find(".path")).text());
                        $(this).attr("status", "false");
                        $(this).html("&nbsp;\u21B4");
                    }
                }).css("cursor", "pointer");
            }
        }        
            
        i++;
        row = $("#r" + i);
    }

//  Add sorting by instance names (default), the top row

    $("#r" + 0 + " .td_abstract").append('<div id=sortText style="display:inline">&nbsp;\u25C0</div>');
    $("#r" + 0 + " .td_abstract").addClass('sortAsc');
    $("#r" + 0 + " .td_abstract").click(function(){
        if($(this).hasClass("sortAsc")){
            $(this).toggleClass("sortAsc sortDesc");
            $(this).find("#sortText").html("&nbsp;\u25B6");
        } else if ($(this).hasClass("sortDesc")){
            $(this).toggleClass("sortDesc sortAsc");
            $(this).find("#sortText").html("&nbsp;\u25C0");
        } else if ($(this).hasClass("noSort")){
            $(this).toggleClass("noSort sortAsc");
            $(this).find("#sortText").html("&nbsp;\u25C0");
        }
        that.rowSort($(this).text());
    }).css("cursor", "pointer");
// Selection of instances for analysis from top row of table

    if (this.settings.instancesSelectable) // can select instances
    {
        var length = $("#r0").find(".td_instance").length;
        for(i=1; i<=length; i++){
            $("#th0_" + i).click(function(){
                var pid = getPID($(this).attr('id').substring(4))
                var locationInArray = $.inArray(pid, that.settings.getSelection(that));
                if (locationInArray == -1)
                    that.settings.onSelected(that,pid);
                else
                    that.settings.onDeselected(that,pid);
            }).css("cursor", "pointer");
        }
    }

//    this.filter.resetFilters(this.SavedFilters, this.permahidden);

    //fire the scroll handler to align table after half a second (fixes chrome bug)
//    setTimeout(function(){$('#mdFeatureQualityMatrix .window-content').scroll()},500);

    this.filter.filterContent();
    if ($("#tBody").length > 0)
        $("#tBody").colResizable();

    var h1 = $("#mdFeatureQualityMatrix #tBody").outerHeight();
    var h2 = $("#mdFeatureQualityMatrix #matrix-panel").outerHeight();
    var h3 = $("#mdFeatureQualityMatrix .window-titleBar").outerHeight();

    $.resizeWindow(this.id, this.width, h1 + h2 + h3); // resize the table to fit everything
    
});

FeatureQualityMatrix.method("getContent", function()
{
    return this.content;
});

FeatureQualityMatrix.method("clearCachedData", function(row, isOn)
{
    this.lastAbstractClaferTree = null;
});

//change row from tansparent to opaque or vice-versa
FeatureQualityMatrix.method("toggleRow", function(row, isOn)
{
    if (!isOn)
    {
        $(row).fadeTo('slow', 0.3);    
    }
    else
    {
        $(row).fadeTo('slow', 1);
    }
});

/*toggle all rows containing either all ticks, all bars, or rows that are effectively mandatory
  between transparent and opaque*/
FeatureQualityMatrix.method("toggleDistinct", function()
{
    this.toggled = !this.toggled;
    if (!this.toggled)
    {
        var table = $("#comparison table");
        $("#toggle_link").html("Distinct");
        
        var rows = table.find("tr");
        for (var i = 0; i < rows.length; i++)
        {
            this.toggleRow(rows[i], true);
        }
    }
    else
    {
        $("#toggle_link").html("Normal");

        var table = $("#comparison");
        
        var row = table.find("#r1");
        var i = 1;
        while (row.length != 0)
        {
            var instanceTds = row.find(".td_instance");

            var allAreTheSame = true;

            if (instanceTds.length == 0)
                continue;

            var first = null;

/*  loop iterates through cells until it has crossed an entire row without finding 
    a difference (non-distinct) or it finds a difference (distinct). It will also 
    break if it finds that the row is an effectively mandatory row (non-distinct)*/

            for (var j = 0; j < instanceTds.length; j++)
            {
                if ($(instanceTds[j]).css("display") == "none"){ //case for filtered out elements that are hidden
                    //do nothing
                }
                else
                {
                    var html = $(instanceTds[j]).html();

                    if (!first)
                        first = html;
                    else
                        if (first != html)
                        {
                            allAreTheSame = false;
                            break;
                        }
                }
            }
            
//  toggles based on outcome of loop
            if (allAreTheSame)
            {
                this.toggleRow(row, false);
            }
            
            i++;
            row = table.find("#r" + i);
        }
    }
//  since the table height has potentially changed we call this to realign the headers. 
    this.applySearch();
    return true;
});

//makes instance red on graph, for actual selection function see onSelected(pid) in selector.js
FeatureQualityMatrix.method("makePointsSelected", function (pid){;
    $("#mdFeatureQualityMatrix #th0_" + pid.substring(1)).find("text").css("fill", "Red");
});

//makes instance red on graph, for actual deselection function see onDeselected(pid) in selector.js
FeatureQualityMatrix.method("makePointsDeselected", function (pid){
    $("#mdFeatureQualityMatrix #th0_" + pid.substring(1)).find("text").css("fill", "Black");
});

FeatureQualityMatrix.method("applySearch", function (){
    //You can search multiple strings by seperating them with a space or comma (or both)

    var input = $("#search").val();
    if (input == "")
    {
       $("#comparison #tBody tbody tr").each(function() {
            $(this).removeClass("hiddenBySearch");
       });
       return;
    }

    var searchStrings = input.toLowerCase().split(/[,\s]{1,}/g);

    $("#comparison #tBody tbody tr").each(function() {
        var $this = $(this);
        var found = false;
        $this.find(".texttosearch").each(function(){
            for (var i = 0; i < searchStrings.length; i++)
            {
                if ($(this).html().toLowerCase().indexOf(searchStrings[i]) != -1)
                {
                    $this.removeClass("hiddenBySearch");
                    found = true;
                    break;
                }
            }
        });

        if (!found)
            $this.addClass("hiddenBySearch");

    });

});

// sorts instances in comparison table by either Instance numbers or quality values
// gets passed the text of the row clicked
FeatureQualityMatrix.method("rowSort", function(rowText){
    var i=0;
    var row = $("#comparison #r" + i);
    while (row.length != 0){
        //finds the correct row
        if (row.find(".numeric").length != 0 || i==0){
            var current = $(row).find(".td_abstract");
            if ($(current).text() == rowText){
                //gets cells of row and pairs them with their values
                var instances = row.find(".td_instance");
                var extra_td = row.find(".td_extra")[0];
                var sortableArray = [];
                for(var j=0; j<instances.length; j++){
                    sortableArray.push({ instance: $(instances[j]).attr("id"), value: $(instances[j]).text()} );
                }
                //checks what kind of sort is applied
                if($(current).hasClass("sortDesc")){ //sort instances by descending value
                    sortableArray.push({ instance: $(extra_td).attr("id"), value: -1000000000} );
                    sortableArray.sort(function(a,b){
                        return a.value - b.value;
                    });
                }
                else if($(current).hasClass("sortAsc")){
                    sortableArray.push({ instance: $(extra_td).attr("id"), value: 1000000000} );
                    sortableArray.sort(function(a,b){ //sort instances by ascending value
                        return b.value - a.value
                    });
                }
                //replace all cells in the new order
                while(sortableArray.length){
                    current = sortableArray.pop().instance;
                    current = current.replace(/[^_]{1,}/, "");
                    //headers
                    $("#comparison #th0" + current).appendTo("#comparison #r0");
                    //body
                    j = 1;
                    row = $("#comparison #r" + j);
                    while (row.length != 0){
                        $("#comparison #td" + (j-1) + current).appendTo(row);
                        j++;
                        row = $("#comparison #r" + j);
                    }

                }

            } else { //remove and sorting from other rows
                current.find("#sortText").text("  ");
                current.removeClass("sortAsc sortDesc");
                current.addClass("noSort");
            }
        }
        i++;
        row = $("#comparison #r" + i);
    }

//    this.synchronizeWidths();
});

FeatureQualityMatrix.method("getInitContent", function()
{
    return '';     
});

FeatureQualityMatrix.method("featureChecked", function (featurePath, state){
    this.filter.filterContent(); // filter after changing the feature status
    this.settings.onFeatureCheckedStateChange(this, featurePath, state);
//    this.synchronizeWidths();
});

FeatureQualityMatrix.method("removeInstance", function(instanceNum){
    this.filter.removeInstance(instanceNum);
    this.settings.onInstanceRemove(this, instanceNum);
});

FeatureQualityMatrix.method("onFeatureCollapsed", function(featurePath){
    this.filter.closeFeature(featurePath);
    this.settings.onFeatureCollapsed(this, featurePath);
});

FeatureQualityMatrix.method("onFeatureExpanded", function(featurePath){
    this.filter.openFeature(featurePath);
    this.settings.onFeatureExpanded(this, featurePath);
});

//saves all selected instances and downloads them to client
FeatureQualityMatrix.method("saveAll", function(){
    var instances = this.unparsedInstances;
    var parser = new InstanceConverter(instances);
    var data = "";
    var instanceCount = this.instanceProcessor.getInstanceCount();
    for (var i = 1; i <= instanceCount; i++){
        data += parser.getInstanceData(i) + "\n";
    }
    $("#saveAllData").val(data);
    $("#saveAllForm").submit();
});

