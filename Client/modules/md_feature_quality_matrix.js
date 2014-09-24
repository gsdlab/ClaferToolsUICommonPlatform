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

    this.host = host;
    this.host.loaded();
}

FeatureQualityMatrix.method("resize", function() // not attached to the window anymore, so need to call the method
{
//    this.synchronizeWidths();
    return true;
});

FeatureQualityMatrix.method("onDataLoaded", function(data){

    this.data = data;
//    var instanceCount = this.data.instanceCount;
    this.toggled = false;    
    this.currentRow = 1;
});

FeatureQualityMatrix.method("addControlPanel", function()
{
    var context = this;

// Add search bar 
    var panel = $('<div id="matrix-panel"></div>');
    var vl = '<div class="verticalLine">&nbsp;</div>';
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
    $(panel).append('<span><span id="instancematch">0</span> out of <span id="instancecount">0</span> variant(s) satisfy the criteria</span>');
    $(panel).append(vl);
    $(panel).append('<span id="instanceshown"></span>');
    $(panel).append(vl);
    $(panel).append('<input type="checkbox" id="showQualities" checked="checked"/> Show nested quality attributes');
    $(panel).append('<form id="saveAllForm" action="/saveinstances" method="post" enctype="multipart/form-data">' + '<input type="hidden" name="data" id="saveAllData" value=""/>' + '<input type="hidden" name="windowKey" value="' + this.host.key + '"/>' + '</form>');

    $("#table").prepend(panel);


    $('#toggle_link').html("Distinct");
    $('#toggle_link').click(function(event){
        context.toggleDistinct();
    }).css("cursor", "pointer");

// Reset button for reseting filters

    $('#filter_reset').html("Reset filters");
    $('#filter_reset').click(function(event){
/*
        context.filter.cleanFilters();
        context.filter.filterContent();
        context.settings.onReset(context);
            //if currently set to distinct mode, refresh distinct rows
        if (this.toggled){
            this.toggleDistinct(); //one to turn off distinct
            this.toggleDistinct(); //one to reapply it
        }
*/
    }).css("cursor", "pointer");

// add handler to search bar
    $('#search').keyup(function(){
        context.applySearch();
    }); 

    $('#search').click(function(event){
//        event.stopPropagation(); //to keep table from sorting by instance number
    });

    var context = this;

    $('#showQualities').click(function(){

        $("#table").find(".typelabel.int").parent().parent().each(function(){
            if (Object.keys(context.data.objectives).indexOf($(this).find(".path").text()) == -1)
                $(this).toggleClass("hiddenAsNestedQuality");
        });
    });

    $('#saveAll').click(this.saveAll.bind(this)).css("cursor", "pointer");

});

FeatureQualityMatrix.method("refresh", function()
{
    this.tableVisualizer.refresh(this.data);    

    this.updateIndicators();

//    $(".field-item").tipsy({delayIn: 2000, delayOut: 500, fade: true, gravity: 'w', html: true});
//    $(".content-cell").tipsy({delayIn: 2000, delayOut: 500, fade: true, gravity: 's', html: true});

//    this.filter.resetFilters(this.SavedFilters, this.permahidden);

    //fire the scroll handler to align table after half a second (fixes chrome bug)

//    if ($("#tBody").length > 0)
//        $("#tBody").colResizable();

    var h1 = $("#mdFeatureQualityMatrix #table").outerHeight();
    var h2 = $("#mdFeatureQualityMatrix #matrix-panel").outerHeight();
    var h3 = $("#mdFeatureQualityMatrix .window-titleBar").outerHeight();

    $.resizeWindow(this.id, this.width, h1 + h2 + h3); // resize the table to fit everything

});

FeatureQualityMatrix.method("onRendered", function()
{
    var context = this;

    this.tableVisualizer = new TableVisualizer("table", {
        sorting: true,
        filtering: true,
        selectable: true,
        collapsing: true
    }, {
        "onFeatureChecked": function(f, value){
            context.settings.onFeatureCheckedStateChange(context, f, value);
        },
        "onSelected": function(i){
            context.settings.onSelected(context, getPID(i));
        },
        "onDeselected": function(i){
            context.settings.onDeselected(context, getPID(i));
        },
        "onMouseOver": function(i){
            context.settings.onMouseOver(context, getPID(i));
        },
        "onMouseOut": function(i){
            context.settings.onMouseOut(context, getPID(i));
        },
        "onFilterChanged": function(path, val){
            context.settings.onFilterChanged(context, path, val);
        }

    });

    this.addControlPanel();    
    this.refresh(this.data);    
});

FeatureQualityMatrix.method("getContent", function()
{
    return '<div id="table" class="comparison"></div>';
//    return this.content;
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
    var context = this;
    this.toggled = !this.toggled;
    if (!this.toggled)
    {
        $("#toggle_link").html("Distinct");

        var tableBody = $("#table table tBody");        
        var rows = tableBody.children();
        for (var i = 0; i < rows.length; i++)
        {
            context.toggleRow(rows[i], true);
        }
    }
    else
    {
        $("#toggle_link").html("Normal");

        var tableBody = $("#table table tBody");
        
        tableBody.children().each(function(e){
            var row = $(this);
            var instanceTds = row.children(".content-cell");

            var allAreTheSame = true;

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
                context.toggleRow(row, false);
            }
            
        });
    }
//  since the table height has potentially changed we call this to realign the headers. 
    this.applySearch();
    return true;
});

//makes instance red on graph, for actual selection function see onSelected(pid) in selector.js
FeatureQualityMatrix.method("makePointsSelected", function (pid){;
    this.tableVisualizer.select(parsePID(pid));
});

//makes instance red on graph, for actual deselection function see onDeselected(pid) in selector.js
FeatureQualityMatrix.method("makePointsDeselected", function (pid){
    this.tableVisualizer.unselect(parsePID(pid));
});

FeatureQualityMatrix.method("applySearch", function (){
    //You can search multiple strings by seperating them with a space or comma (or both)

    var input = $("#search").val();
    if (input == "")
    {
       $("#table tbody tr").each(function() {
            $(this).removeClass("hiddenBySearch");
       });
       return;
    }

    var searchStrings = input.toLowerCase().split(/[,\s]{1,}/g);

    $("#table tbody tr").each(function() {
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
    var row = $("#table #r" + i);
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
                    $("#table #th0" + current).appendTo("#table #r0");
                    //body
                    j = 1;
                    row = $("#table #r" + j);
                    while (row.length != 0){
                        $("#table #td" + (j-1) + current).appendTo(row);
                        j++;
                        row = $("#table #r" + j);
                    }

                }

            } else { //remove and sorting from other rows
                current.find("#sortText").text("  ");
                current.removeClass("sortAsc sortDesc");
                current.addClass("noSort");
            }
        }
        i++;
        row = $("#table #r" + i);
    }

//    this.synchronizeWidths();
});

FeatureQualityMatrix.method("getInitContent", function()
{
    return '';     
});

FeatureQualityMatrix.method("featureChecked", function (featurePath, state){
    this.settings.onFeatureCheckedStateChange(this, featurePath, state);
});

FeatureQualityMatrix.method("removeInstance", function(instanceNum){
//    this.filter.removeInstance(instanceNum);
//    this.settings.onInstanceRemove(this, instanceNum);
});

//saves all selected instances and downloads them to client
FeatureQualityMatrix.method("saveAll", function(){
    var instances = this.data.unparsedInstances;
    var parser = new InstanceConverter(instances);
    var data = "";
    var instanceCount = this.data.instanceCount;
    for (var i = 1; i <= instanceCount; i++){
        data += parser.getInstanceData(i) + "\n";
    }
    $("#saveAllData").val(data);
    $("#saveAllForm").submit();
});

// this function is called every time a user filters by features or quality values
FeatureQualityMatrix.method("onFiltered", function(data)
{
    if (this.tableVisualizer)
    {
        this.tableVisualizer.filter(data);
        this.updateIndicators();
    }
});

FeatureQualityMatrix.method("updateIndicators", function(data)
{
    $('#instancematch').html(this.data.instanceMatch);
    $('#instancecount').html(this.data.instanceCount);

    if (this.data.instanceMatch <= this.tableVisualizer.displayLimit)
    {
        $('#instanceshown').html("Shown all matching");
    }
    else
    {
        $('#instanceshown').html("<b>Shown first " + this.tableVisualizer.displayLimit + " matching</b>");
    }
});

FeatureQualityMatrix.method("makeHighlighted", function(pid)
{ 
    this.tableVisualizer.makeActive(parsePID(pid));
});

FeatureQualityMatrix.method("makeDehighlighted", function(pid)
{ 
    this.tableVisualizer.makeInactive(parsePID(pid));
});