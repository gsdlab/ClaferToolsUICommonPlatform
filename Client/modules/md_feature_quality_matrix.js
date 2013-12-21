/*
Copyright (C) 2012, 2013 Neil Redman, Alexander Murashkin <http://gsd.uwaterloo.ca>

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
    this.normalOpacity = "1.0"

    this.host = host;

    this.SavedFilters = [];
    this.permahidden = [];

    this.host.loaded();

//    this.dataTable.matrix = null;
//    this.dataTable.
    
}

FeatureQualityMatrix.method("onDataLoaded", function(data){
    this.instanceProcessor = new InstanceProcessor(data.instancesXML);
    this.processor = new ClaferProcessor(data.claferXML);
    this.filter = new tableFilter("comparison", data.claferXML, data.instancesXML, this);    
    this.clearFilters();
    this.abstractClaferOutput = "";    
    this.toggled = false;
    
    this.dataTable = this.getDataTable();    
    this.content = $('<div id="comparison" class="comparison"></div>').append(new TableVisualizer().getHTML(this.dataTable));
    $("#mdFeatureQualityMatrix .window-titleBar-content").text("Feature and Quality Matrix: " + this.dataTable.title);
    this.currentRow = 1;
    this.EMfeatures = [];

});

FeatureQualityMatrix.method("onRendered", function()
{
    this.filter.onRendered();
    
    $.resizeWindow(this.id, this.width, $("#comparison").height() + 80); // resize the table to fit everything

// Add search bar 
    var td = $('#comparison .table_title')[0];
    $(td).html('<input type="text" id="search" class="text_input" placeholder="search" style="width: 100px">');
    $(td).addClass("TableSearch");

// Adding buttons for comparison table
// Distinct button for greying out non-distinct features
    td = $('#comparison .TableSearch')[0];
    $(td).append('<button id="toggle_link">Toggle</button>');
    var that = this;
    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(function(event){
        event.stopPropagation();  //to keep table from sorting by instance number
        that.toggleDistinct();
    }).css("cursor", "pointer");

// Reset button for reseting filters

    $(td).append('&nbsp;<button id="filter_reset">Toggle</button>');

    $('#filter_reset').html("Reset");
    $('#filter_reset').click(function(event){
        event.stopPropagation(); //to keep table from sorting by instance number
        that.filter.cleanFilters();
        that.settings.onReset(that);
            //if currently set to distinct mode, refresh distinct rows
        if (this.toggled){
            this.toggleDistinct(); //one to turn off distinct
            this.toggleDistinct(); //one to reapply it
        }
    }).css("cursor", "pointer");


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
//************************* Most of the following is to get proper formatting on the table  *******************

// Move headers into new div
    $("#comparison").prepend('<div id="tHeadContainer"><table id="tHead" width="100%" cellspacing="0" cellspadding="0"></table></div>');
    $("#tHead").append($("#comparison #r0"));

// make headers positioning always on top of window
    $('#mdFeatureQualityMatrix .window-content').scroll(function(){
            $("#comparison #tHeadContainer").css("position", "relative");
            $("#comparison #tHeadContainer").css("top", ($("#comparison").height() - $('#mdFeatureQualityMatrix .window-content').scrollTop())*(-1) + $("#comparison #tHeadContainer").height());
            $("#comparison #tBodyContainer").css("top" , $("#comparison #tHeadContainer").height());
    });

    $("#mdFeatureQualityMatrix").resize(function(){
        $('#mdFeatureQualityMatrix .window-content').scroll();
    })

// Move body into new div
    $("#comparison").prepend('<div id="tBodyContainer" style="position: relative;"></div>');
    $("#tBodyContainer").prepend($("#comparison #tBody"));
    



// fix formatting for new headers
// shrink table to obtain minimum widths
    $("#tBodyContainer").css("width", "10%")
    $("#tHeadContainer").css("width", "10%")

// obtain minimum widths
    var i;

    $("#tHead .td_abstract").width("40%");
    $("#tBody .td_abstract").width("40%");

    i = 0;
    var row = $("#r" + i);
    var minWidth = 0;
    while ($(row).children().length != 0){
        for (var x = 1; x<=$(row).children().length; x++){
            var current = $(row).children()[x];
            if ($(current).width() > minWidth)
                minWidth = $(current).width();
        }
        i++;
        row = $("#r" + i);
    }

    var minAbstractWidth = $("#tBody .td_abstract").width();

// Set new widths and minimum widths (important to do both for cross browser functionality)
    for(i=1; i<$("#tHead #r0").children().length; i++){
        $("#tHead #th0_" + i).width(minWidth);
        $("#tBody #td0_" + i).width(minWidth);
        $("#tHead #th0_" + i).css("min-width", minWidth);
        $("#tBody #td0_" + i).css("min-width", minWidth);
        var x = 1;
        row = $("#r" + x);
        while ($(row).children().length != 0){
            $("#tBody #td" + x + "_" + i).width(minWidth);
            $("#tBody #td" + x + "_" + i).css("min-width", minWidth);
            x++;
            row = $("#r" + x);
        }
    }

    $("#tHead .td_abstract").width(minAbstractWidth);
    $("#tBody .td_abstract").width(minAbstractWidth);
    $("#tHead .td_abstract").css("min-width", minAbstractWidth);
    $("#tBody .td_abstract").css("min-width", minAbstractWidth);

// reset table widths to 100%
    $("#tBodyContainer").css("width", "100%")
    $("#tHeadContainer").css("width", "100%")

// Mostly done formatting table. adding interactive features now.

// Add tristate checkboxes for filtering features
    i = 1;
    row = $("#r" + i);
    var that = this;
    while (row.length != 0){
        if (!row.find(".numeric").length && !row.find(".EffectMan").length){
            $("#r" + i + " .td_abstract").prepend('<image id="r' + i + 'box" src="commons/Client/images/checkbox_empty.bmp" class="maybe">');
            $("#r" + i + "box").click(function(){
                if (this.className == "maybe"){
                    this.src = "commons/Client/images/checkbox_ticked.bmp";
                    this.className = "wanted";
                    $(this).parent().parent().attr("FilterStatus", "require");
                    that.featureChecked($(this).parent().text().replaceAll(/[^A-z0-9]/g, ''), 1);
                } else if (this.className == "wanted"){
                    this.src = "commons/Client/images/checkbox_x.bmp";
                    this.className = "unwanted";
                    $(this).parent().parent().attr("FilterStatus", "exclude");
                    that.featureChecked($(this).parent().text().replaceAll(/[^A-z0-9]/g, ''), -1);
                } else {
                    this.src = "commons/Client/images/checkbox_empty.bmp";
                    this.className = "maybe";
                    $(this).parent().parent().attr("FilterStatus", "none");
                    that.featureChecked($(this).parent().text().replaceAll(/[^A-z0-9]/g, ''), 0);                    
                }
            }).css("cursor", "pointer");
        }
//  Add Greyed out checkboxes to denote effectively mandatory features
        else if (!row.find(".numeric").length && row.find(".EffectMan").length){
            $("#r" + i + " .td_abstract").prepend('<image id="r' + i + 'box" src="commons/Client/images/checkbox_ticked_greyed.png" class="wanted">');
        }
        i++;
        row = $("#r" + i);
    }
    //  Add collapse buttons for features with children
    var instanceSuperClafer = this.instanceProcessor.getInstanceSuperClafer();
    var abstractClaferTree = this.processor.getAbstractClaferTree("/module/declaration/uniqueid", instanceSuperClafer);
    var hasChild = this.processor.getFeaturesWithChildren(abstractClaferTree)
    i = 1;
    row = $("#r" + i);
    var that = this;
    while (row.length != 0){
        if (!row.find(".numeric").length){
            var feature = $("#r" + i + " .td_abstract").text().replaceAll(/[\s?]{1,}/g, '');
            if (hasChild.indexOf(feature) != -1){
                $("#r" + i + " .td_abstract").append('<text id="r' + i + 'collapse" status="false">   \u21B4<text>')
                $("#r" + i + "collapse").click(function(){
                    if ($(this).attr("status") === "false"){
                        that.onFeatureCollapsed($(this).parent().text().replaceAll(/[^A-z]/g, ''));
                        $(this).attr("status", "true")
                        $(this).text("   \u2192")
                    } else {
                        that.onFeatureExpanded($(this).parent().text().replaceAll(/[^A-z]/g, ''));
                        $(this).attr("status", "false")
                        $(this).text("   \u21B4")
                    }
                }).css("cursor", "pointer");
            }
        }
//  Add sorting to quality attributes
        else {
            $("#r" + i + " .td_abstract").append('<div id=sortText style="display:inline"></div>');
            $("#r" + i + " .td_abstract").addClass('noSort');
            $("#r" + i + " .td_abstract").click(function(){
                if($(this).hasClass("sortAsc")){
                    $(this).toggleClass("sortAsc sortDesc");
                    $(this).find("#sortText").text(" \u25B6");
                } else if ($(this).hasClass("sortDesc")){
                    $(this).toggleClass("sortDesc sortAsc");
                    $(this).find("#sortText").text(" \u25C0");
                } else if ($(this).hasClass("noSort")){
                    $(this).toggleClass("noSort sortAsc");
                    $(this).find("#sortText").text(" \u25C0");
                }
                that.rowSort($(this).text());
            }).css("cursor", "pointer");
        }
            
        i++;
        row = $("#r" + i);
    }
//  Add sorting by instance names (default);
    $("#r" + 0 + " .td_abstract").append('<div id=sortText style="display:inline"> \u25C0</div>');
    $("#r" + 0 + " .td_abstract").addClass('sortAsc');
    $("#r" + 0 + " .td_abstract").click(function(){
        if($(this).hasClass("sortAsc")){
            $(this).toggleClass("sortAsc sortDesc");
            $(this).find("#sortText").text(" \u25B6");
        } else if ($(this).hasClass("sortDesc")){
            $(this).toggleClass("sortDesc sortAsc");
            $(this).find("#sortText").text(" \u25C0");
        } else if ($(this).hasClass("noSort")){
            $(this).toggleClass("noSort sortAsc");
            $(this).find("#sortText").text(" \u25C0");
        }
        that.rowSort($(this).text());
    }).css("cursor", "pointer");
// Selection of instances for analysis from top row of table
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

// add handler to search bar
    that = this;
    $('#search').keyup(function(){
        that.scrollToSearch($(this).val());
    }); 
    $('#search').click(function(event){
        event.stopPropagation(); //to keep table from sorting by instance number
    });

    this.filter.resetFilters(this.SavedFilters, this.permahidden);

    //fire the scroll handler to align table after half a second (fixes chrome bug)
    setTimeout(function(){$('#mdFeatureQualityMatrix .window-content').scroll()},500);

    this.filter.filterContent();

});

FeatureQualityMatrix.method("getContent", function()
{
    return this.content;
});


//input: node in clafer tree, level in tree
//output: object with unique clafer id, id for display and, display id with indentation
FeatureQualityMatrix.method("collector", function(clafer, spaceCount)
{
    var unit = new Object();
    unit.claferId = clafer.claferId;
    unit.displayId = clafer.displayId;

    unit.displayWithMargins = unit.displayId;
    
    for (var i = 0; i < spaceCount; i++)
        unit.displayWithMargins = " " + unit.displayWithMargins;

    abstractClaferOutput.push(unit);
});

//Traverses clafer tree to and runs collector on every node
FeatureQualityMatrix.method("traverse", function(clafer, level)
{
    this.collector (clafer, level);

    if (clafer.subclafers != null){
        for (var i = 0; i < clafer.subclafers.length; i++)
        {
            this.traverse(clafer.subclafers[i], level + 1);
        }
    }
});

//generate data table
FeatureQualityMatrix.method("getDataTable", function()
{
    var instanceCount = this.instanceProcessor.getInstanceCount();
    var instanceSuperClafer = this.instanceProcessor.getInstanceSuperClafer();
    var abstractClaferTree = this.processor.getAbstractClaferTree("/module/declaration/uniqueid", instanceSuperClafer);
    var EMfeatures = this.processor.getEffectivelyMandatoryFeatures(abstractClaferTree)
    
    var parent = null;
    var current = abstractClaferTree;
    abstractClaferOutput = new Array();

    this.traverse(current, 0);
    output = abstractClaferOutput;
    

    var originalPoints = this.host.storage.originalPoints;
    var goalNames = this.processor.getGoals();
    var result = new DataTable();   
    result.title = output[0].displayWithMargins;
    
    for (var j = 1; j <= instanceCount; j++)
    {
        result.products.push(String(j));
    }
    
    for (var i = 0; i < output.length; i++)
    {
        var currentMatrixRow = new Array();
        var currentContextRow = new Array();
        if (i > 0){ // do not push the parent clafer
            result.features.push(output[i].displayWithMargins + " " + this.processor.getIfMandatory(output[i].claferId));
            currentContextRow.push(output[i].displayWithMargins + " " + this.processor.getIfMandatory(output[i].claferId));
            var featureIsEM = (EMfeatures.indexOf(output[i].displayId) != -1);
        }
        else 
            currentContextRow.push(output[i].displayWithMargins);

        denyAddContextRow = false;
        
        for (var j = 1; j <= instanceCount; j++)
        {
            if (i == 0)
            {
                currentContextRow.push(String(j));
            }
            else
            {
                sVal = this.instanceProcessor.getFeatureValue(j, output[i].claferId, false);
                currentMatrixRow.push(sVal);
                if (sVal == "yes")
                    currentContextRow.push("X");
                else if (sVal == "-")
                    currentContextRow.push("");
                else
                    denyAddContextRow = true;
            }
        }
        
        if (i > 0)
            result.matrix.push(currentMatrixRow);
            
        if (!denyAddContextRow)
            result.formalContext.push(currentContextRow);
            result.EMcontext.push(featureIsEM);


    }
    return result;

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
            var last = "";

/*  loop iterates through cells until it has crossed an entire row without finding 
    a difference (non-distinct) or it finds a difference (distinct). It will also 
    break if it finds that the row is an effectively mandatory row (non-distinct)*/

            for (var j = 0; j < instanceTds.length; j++)
            {
                if ($(instanceTds[j]).css("display") == "none"){ //case for filtered out elements that are hidden
                    //do nothing
                }
                else if ($(instanceTds[j]).hasClass("tick"))
                {
                    if (last == "" || last == "tick")
                        last = "tick";
                    else {allAreTheSame = false; break;}
                }   
                else if ($(instanceTds[j]).hasClass("no"))
                {
                    if (last == "" || last == "no")
                        last = "no";
                    else {allAreTheSame = false; break;}
                }
                else if ($(instanceTds[j]).hasClass("EffectMan")){
                    allAreTheSame = true; break;
                }
                else {allAreTheSame = false; break;}
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
    this.scrollToSearch($("#search").val());
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

FeatureQualityMatrix.method("scrollToSearch", function (input){
    //method name is from before. doesn't actually scroll... hides rows not containing input.
    //You can search multiple strings by seperating them with a space or comma (or both)
    var searchStrings = input.split(/[,\s]{1,}/g);
    var iteratedRow = 0;
    while (iteratedRow <= $("#comparison #tBody tbody").children().length){
        var found = false;
        for (var i = 0; i<searchStrings.length; i++){
            if ($("#comparison #tBody #r" + iteratedRow).text().toLowerCase().indexOf(searchStrings[i].toLowerCase()) != -1)
                found = true;
        }
        if (found)
            $("#comparison #tBody #r" + iteratedRow).removeClass("searchOmitted");
        else
            $("#comparison #tBody #r" + iteratedRow).addClass("searchOmitted");;
        iteratedRow++;
    }
    $('#mdFeatureQualityMatrix .window-content').scroll();

/*  OLD VERSION --Consider for removal
    if (input == ""){
        $('#mdFeatureQualityMatrix .window-content').scrollTop(0);
    }
    var firstPass = true;
    var iteratedRow = this.currentRow;

    if (input == this.previousInput){
        firstPass = false;
        iteratedRow++;
    }
    this.previousInput = input;

    while(iteratedRow != this.currentRow || firstPass){
        if (iteratedRow >= ($("#tBody tbody").children().length + 1))
            iteratedRow = 0;
        else if ($("#tBody #r" + iteratedRow).text().indexOf(input) !== -1){
            $('#mdFeatureQualityMatrix .window-content').scrollTop(0);
            $('#mdFeatureQualityMatrix .window-content').scrollTop($("#tBody #r" + iteratedRow).position().top);
            this.currentRow = iteratedRow;
            return;
        }
        iteratedRow++;
        firstPass = false;
    }
*/

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
                var sortableArray = [];
                for(var j=0; j<instances.length; j++){
                    sortableArray.push({ instance: $(instances[j]).attr("id"), value: $(instances[j]).text()} );
                }
                //checks what kind of sort is applied
                if($(current).hasClass("sortDesc")){ //sort instances by descending value
                    sortableArray.sort(function(a,b){
                        return a.value - b.value;
                    });
                }
                else if($(current).hasClass("sortAsc")){
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
});

FeatureQualityMatrix.method("getInitContent", function()
{
    return '';     
});

FeatureQualityMatrix.method("featureChecked", function (feature, state){
    this.filter.filterContent(); // filter after changing the feature status
    this.settings.onFeatureCheckedStateChange(this, feature, state);
});

FeatureQualityMatrix.method("removeInstance", function(instanceNum){
    this.filter.removeInstance(instanceNum);
    this.settings.onInstanceRemove(this, instanceNum);
});

FeatureQualityMatrix.method("onFeatureCollapsed", function(feature){
    this.filter.closeFeature(feature);
    this.settings.onFeatureCollapsed(this, feature);
});

FeatureQualityMatrix.method("onFeatureExpanded", function(feature){
    this.filter.openFeature(feature);
    this.settings.onFeatureExpanded(this, feature);
});

FeatureQualityMatrix.method("clearFilters", function (){
    this.SavedFilters = [];
    this.permahidden = [];
});
