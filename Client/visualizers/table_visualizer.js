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

function TableVisualizer(nodeId, options, chartListeners) 
{
    this.nodeId = nodeId;
    this.options = options;

    if (this.options.displayLimit) // how many instances to show maximum
    {
    	this.displayLimit = this.options.displayLimit;
    }
    else
    {
    	this.displayLimit = 100;
    }

    var context = this;
    context.chartListeners = chartListeners;

   /* appending a "canvas" */

    var root = d3.select("#" + context.nodeId);
    context.table = root.append("table")
    	.attr("width", "100%")
    	.attr("cellspadding", "0")
    	.attr("cellspacing", "0")
    	.attr("height", "100%");

    context.head = context.table.append("thead");
    context.body = context.table.append("tbody");

    this.firstColWidth = 330;
    this.colWidth = 220;
}

TableVisualizer.method("addSortingFeature", function(elem){
	var context = this;
	var me = elem;
	var sortLabel = me.append("div")
		.attr("class", "sortLabel")
		.style("display", "inline")

	me.classed("noSort", true)
		.style("cursor", "pointer")
		.on("click", function(d){
			var sortFlag;

			var sortedAsc = me.classed("sortAsc");
			var sortedDesc = me.classed("sortDesc");

			d3.selectAll(".sortAsc, .sortDesc")
				.classed("noSort", true)
				.classed("sortAsc", false)
				.classed("sortDesc", false);
			
			d3.selectAll(".sortLabel").html("&nbsp;");

			if (sortedAsc)
			{
				sortFlag = "desc";
				me.classed("sortDesc", true);
				sortLabel.html("&nbsp;\u25B6");
			}
			else if (sortedDesc)
			{
				sortFlag = "none";
				me.classed("noSort", true);
				sortLabel.html("&nbsp;");
			}
			else
			{
				sortFlag = "asc";
				me.classed("sortAsc", true);
				sortLabel.html("&nbsp;\u25C0");
			}

			if (context.chartListeners.onSorted)
				
				context.chartListeners.onSorted(d.path, sortFlag);
		});

});


// CC: remove instance from the table
TableVisualizer.method("removeAllInstances", function() {

	
	this.body.selectAll("td:not(.field-item)").remove();
	this.head.selectAll("th").remove();

	
	
});

TableVisualizer.method("refresh", function(sdata)
{

	var data = this.preprocessData(sdata);

	this.data = data;
	var context = this;

	var titleNode = context.head.selectAll("th.title").data([{"id" : "id"}]).enter()
		.append("th")
		.attr("class", "title")
		.text(data.title)
		.attr("width", context.firstColWidth)
		.style("min-width", context.firstColWidth + "px")
		.style("max-width", context.firstColWidth + "px");

	if (context.options.sorting)
		context.addSortingFeature(titleNode);


	var cat0 = context.head.selectAll("th.instance-id").data(data.instanceIds, function(d){ return d;});

	cat0.exit().remove();

	context.headers = cat0.enter()
	    .append("th")
	    	.attr("class", "instance-id")
	    	.attr("id", function (d) {return context.nodeId + "-" + "th" + d; })
			.attr("width", context.colWidth)
	    	.text(function (d) {return d; });
/*
	var emptyCell = context.head.selectAll("th.empty-cell").data([{"id" : "id"}]).enter()
		.append("th") // extra col for the ease of resizing
		.attr("class", "empty-cell"); // extra col for the ease of resizing
*/
    if (context.options.buttonsForRemoval)
    {
		var buttonsForRemoval = context.headers.append('img')
			.attr("id", function(d){return context.nodeId + "-rem" + d;})
			.attr("name", function(d){return context.nodeId + "-rem" + d;})
			.attr("src", "commons/Client/images/remove.png")
            .style("float", "left")
            .style("vertical-align", "middle")
            .style("cursor", "pointer")
            .on("click", function(d){
            	var me = d3.select(this);
            	if (context.chartListeners.removeInstance)
                	context.chartListeners.removeInstance(me.attr("name"));
            })
            .on("mouseover", function(d){
            	d3.select(this).attr("src", "/commons/Client/images/removeMouseOver.png");
            })
            .on("mouseout", function(d){
            	d3.select(this).attr("src", "/commons/Client/images/removeMouseOver.png");
            });
   }

   if (context.options.selectable){

		context.headers.on("click", function(d){
				if (!d3.select(this).classed("selected"))
				{
                    context.chartListeners.onSelected(d);
				}
                else
                {
                    context.chartListeners.onDeselected(d);
                }
            })
		.on("mouseover", function(d){
            context.chartListeners.onMouseOver(d);
            context.makeActive(d);
		})
		.on("mouseout", function(d){
            context.chartListeners.onMouseOut(d);
            context.makeInactive(d);
		})
		.style("cursor", "pointer");
   }

  var cat1 = context.body.selectAll("tr.field-row").data(data.fields, function(d){return d.path;});

  context.rows = cat1.enter()
    .append("tr").attr("class", "field-row").attr("id", function (d) {return context.nodeId + "-" + d.path; });

  // adding fields
  context.fieldCells = context.rows.append("td")
      .attr("class", "field-item").each(function(d){

      		var me = d3.select(this);
      		d.type.split(" ").forEach(function(el){
	      		me.classed(el, true);
      		});
			me.attr("width", context.firstColWidth)
				.style("min-width", context.firstColWidth + "px")
				.style("max-width", context.firstColWidth + "px");

		    if (context.options.useFullyQualified) // how many instances to show maximum
		    {
	      		me.append("span").attr("class", "texttosearch").html(context.prettifyPath(d.path));
	      	}
	      	else
	      	{
	      		me.append("span").attr("class", "texttosearch").html(d.title.replaceAll(' ', '&nbsp;&nbsp;'));
	      	}
      		me.append("span").attr("class", "path").style("display", "none").html(d.path);
      		me.append("span").attr("class", "super").style("display", "none").html(d.super);
      		me.append("span").attr("class", "id").style("display", "none").html(d.id);
      		var typeLabel = me.append("span").attr("class", "typelabel " + d.type);
      		me.append("span").attr("class", "card").html(d.card != "" ? "&nbsp;" + d.card : "");


			if (d.em !== null) // all values are equal
			{
		    	var mappedObject = context.mapValue(d, d.em, true);

		    	if (mappedObject.elem == 'img')
		    	{
		    		var b = (d.card != "");

					me.append("span").attr("class", "emvalueEq").text(' = ').style("display", b ? null : "none");
			      	me.append("span").attr("class", "emvalue " + mappedObject.tdClass).html(

						(mappedObject.tdClass.indexOf("no") >= 0) ? "no" : "yes" 
		      			).style("display", b ? null : "none");
		    	}
		    	else
		    	{
					me.append("span").attr("class", "emvalueEq").text(' = ');
		      		me.append("span").attr("class", "emvalue " + mappedObject.tdClass).html(mappedObject.elemContent);		    		
		    	}

				me.classed("emabstract", true);
			}
			else {
				     if(d.type == "clafer"){
		      			me.append("input").attr("type", "text").attr("class", "filter-input").attr('placeholder', 'Search...').on('change', function(d){
				            context.chartListeners.onFilterChanged(d.path,this.value);
						});
		      		}
      		
			}

		    if (context.options.sorting && typeLabel.classed("int"))
      		{
      			context.addSortingFeature(me);
      		}
      		else if (context.options.collapsing)
      		{
      			if (context.data.fieldsWithChildren.indexOf(d.id) != -1)
      			{
      				var triggerNode = me.append('text')
      					.classed("collapser", true)
      					.attr("status", "false")
      					.html("&nbsp;\u21B4")
      					.on("click", function(d){
      						var s = d3.select(this);
      						if (s.attr("status") == "false")
      						{
	      						d3.select(this).attr("status", "true");
	      						d3.select(this).html("&nbsp;\u2192");
	      						context.collapse(d.path);
	      					}
	      					else
      						{
	      						d3.select(this).attr("status", "false");
	      						d3.select(this).html("&nbsp;\u21B4");
	      						context.expand(d.path);
	      					}
      					})
	            }

      		}

			if (context.options.filtering)
			{
			  	if (typeLabel.classed("bool") || typeLabel.classed("boolclafer"))
			  	{
			  		me.attr("FilterStatus", "none");
		            var emValueNode = me.select(".emvalue");
		            if (!emValueNode.empty()) // is effectively  mandatory
		            {
		                if (emValueNode.classed("no"))
		                {
		                    typeLabel.classed("filter_unchecked", true);
		                }
		                else
		                {
		                    typeLabel.classed("filter_checked", true);
		                }                    
		            }
		            else
		            {
		                typeLabel.classed("filter_normal", true)
		                	.style("cursor", "pointer");

		                typeLabel.on("click", null);

		                typeLabel.on("click", function(d){
		                	var row = d3.select(d3.select(this).node().parentNode.parentNode);
		                    var arg = d3.select(d3.select(this).node().parentNode).select(".path").text();

		                    if (row.attr("FilterStatus") == "none"){
		                        typeLabel.classed("filter_normal", false);
		                        typeLabel.classed("filter_unchecked", false);
		                        typeLabel.classed("filter_checked", true);
		                        row.attr("FilterStatus", "require");
		                        context.chartListeners.onFeatureChecked(arg, 1);
		                    } else if (row.attr("FilterStatus") == "require"){
		                        typeLabel.classed("filter_normal", false);
		                        typeLabel.classed("filter_unchecked", true);
		                        typeLabel.classed("filter_checked", false);
		                        row.attr("FilterStatus", "exclude");
		                        context.chartListeners.onFeatureChecked(arg, -1);
		                    } else {
		                        typeLabel.classed("filter_normal", true);
		                        typeLabel.classed("filter_unchecked", false);
		                        typeLabel.classed("filter_checked", false);
		                        row.attr("FilterStatus", "none");
		                        context.chartListeners.onFeatureChecked(arg, 0);                    
		                    }


		                });
		            }
		        }
		    }

      	});

  // adding values
  cat1.each(function(tr, i){

  		var me = d3.select(this);

  		var path = me.attr("id").substring((context.nodeId + "-").length);
  		var field = context.data.fields.filter(function(el){return el.path == path})[0];

  		var reducedData = context.data.matrix.reduce(function(prev, cur){
  			prev.push({"value": cur[path], "id": cur.id});
  			return prev;
  		}, []);


      	var typeLabel = me.select(".typelabel");

  		var cat2 = me.selectAll("td.content-cell").data(reducedData, function(d) {return d.id;});

  		cat2.enter()
		    .append("td")
				.attr("width", context.colWidth)
		    	.style("max-width", context.colWidth + "px")

	      		.on("mouseover", function(d){
	      			d3.select(this).style("overflow", "visible");
	      		}).on("mouseout", function(d){
	      			d3.select(this).style("overflow", null);
	      		});


  		cat2.exit()
		    .remove();

		cat2.each(function(d){

		    	var mappedObject = context.mapValue(field, d.value);
		    	if (mappedObject.elem == 'img')
		    	{
		    		var src = 'commons/Client/images/' + mappedObject.elemClass + '.png';

		    		d3.select(this).html("")
		    			.attr("class", "content-cell " + mappedObject.tdClass)
		    			.attr("title", mappedObject.hint)
		    				.append("img")
				    			.attr("class", mappedObject.elemClass)
		    					.attr("src", src);
		    	}
		    	else
		    	{
		    		d3.select(this).html("")
		    			.attr("class", "content-cell " + mappedObject.tdClass)
		    			.attr("title", mappedObject.hint)
		    				.append(mappedObject.elem)
				    			.attr("class", mappedObject.elemClass)
		    					.html(mappedObject.elemContent);		    		
		    	}

		});


//		alert(typeLabel);

//		typeLabel.attr("class", "typelabel " + field.type);

  		var col = me.select(".field-item");

		if (field.em !== null)
		{
	    	var mappedObject = context.mapValue(field, field.em, true);

	    	if (mappedObject.elem == 'img')
	    	{
	    		var b = (field.card != "");

				col.select(".emvalueEq").text(' = ').style("display", b ? null : "none");
		      	col.select(".emvalue").attr("class", "emvalue " + mappedObject.tdClass).html(

					(mappedObject.tdClass.indexOf("no") >= 0) ? "no" : "yes" 
	      			).style("display", b ? null : "none");
	    	}
	    	else
	    	{
				col.select(".emvalueEq").text(' = ');
	      		col.select(".emvalue").attr("class", "emvalue " + mappedObject.tdClass).html(mappedObject.elemContent);		    		
	    	}

			col.classed("emabstract", true);
		}
		else
		{
			col.select(".emvalueEq").remove();
			col.select(".emvalue").remove();

			var wasEM = col.classed("emabstract");

			col.classed("emabstract", false);

			if (context.options.filtering)
			{
			  	if (typeLabel.classed("bool") || typeLabel.classed("boolclafer"))
			  	{
			  		if (!me.attr("FilterStatus"))
			  		{
				  		me.attr("FilterStatus", "none");
				  	}

					var oldFilterClass = "filter_normal ";

					if (!wasEM)
					{
						if (typeLabel.classed("filter_unchecked")){
							oldFilterClass = "filter_unchecked ";
						}
						if (typeLabel.classed("filter_checked")){
							oldFilterClass = "filter_checked ";
						}
					}

			      	typeLabel.attr("class", "typelabel " + oldFilterClass + field.type)
				      	.style("cursor", "pointer");

	                typeLabel.on("click", function(d){
	                	var row = d3.select(d3.select(this).node().parentNode.parentNode);
	                    var arg = d3.select(d3.select(this).node().parentNode).select(".path").text();

	                    if (row.attr("FilterStatus") == "none"){
	                        typeLabel.classed("filter_normal", false);
	                        typeLabel.classed("filter_unchecked", false);
	                        typeLabel.classed("filter_checked", true);
	                        row.attr("FilterStatus", "require");
	                        context.chartListeners.onFeatureChecked(arg, 1);
	                    } else if (row.attr("FilterStatus") == "require"){
	                        typeLabel.classed("filter_normal", false);
	                        typeLabel.classed("filter_unchecked", true);
	                        typeLabel.classed("filter_checked", false);
	                        row.attr("FilterStatus", "exclude");
	                        context.chartListeners.onFeatureChecked(arg, -1);
	                    } else {
	                        typeLabel.classed("filter_normal", true);
	                        typeLabel.classed("filter_unchecked", false);
	                        typeLabel.classed("filter_checked", false);
	                        row.attr("FilterStatus", "none");
	                        context.chartListeners.onFeatureChecked(arg, 0);                    
	                    }


	                });
				}
			}
		}
  });
/*
  	context.rows.each(function(tr, i){
	  	d3.select(this).append("td").attr("class", "extra-cell").html("&nbsp;"); // extra td for ease of resizing

	});
*/
});

/*
TableVisualizer.method("resize", function (w, h, m)
{
    var context = this;
    this.margin = m;
    this.width = w - m[1] - m[3],
    this.height = h - m[0] - m[2];

//    var sizeData = [{"width": context.width, "height": context.height, "margin": context.margin}];

});
*/

TableVisualizer.method("select", function(d)
{
	d3.select("#" + this.nodeId + "-" + "th" + d).classed("selected", true);
});

//formats object as not selected
TableVisualizer.method("unselect", function(d)
{
	d3.select("#" + this.nodeId + "-" + "th" + d).classed("selected", false);
});


TableVisualizer.method("filterClaferValue", function(s){
	return s.replace(/c[0-9]*_/g, "").replaceAll("$0", "");
});

TableVisualizer.method("prettifyPath", function(s){
	return s.replace(/c[0-9]*_/g, "").replaceAll("-", ".").substring(5);
});

TableVisualizer.method("prettifyClaferSet", function(s){
	return this.filterClaferValue(s.replace("{", "").replace("}", "").replaceAll(";", "<br/>"));
});

TableVisualizer.method("trimValue", function(s)
{
	return s;
/*
	var maxLength = 25;

	if (s.length <= maxLength)
		return s;

	return s.substring(0, maxLength) +  "&hellip;";
*/
});

//			result.html = '<img class="tick" src="commons/Client/images/tick.png"/>';
//			result.html = '<img class="no" src="commons/Client/images/no.png"/>';


TableVisualizer.method("mapValue", function(field, sVal, denyEMCheck)
{
	var result = new Object();
//	result.title = "Hello";
	var type = field.type;
	
	if (type == "bool")
	{
		if (sVal == "yes")
		{
			result.hint = field.id + ' is present';
			result.elem = 'img';
			result.elemClass = 'tick';
			result.tdClass = 'bool tick';
		}
		else
		{
			result.hint = field.id + ' is not present';
			result.elem = 'img';
			result.elemClass = 'no';
			result.tdClass = 'bool no';
		}
	}
	else if (type == "boolclafer")
	{
		if (sVal == "none")
		{
			result.hint = field.id + ' is not present';
			result.elem = 'img';
			result.elemClass = 'no';
			result.tdClass = 'bool no';
		}
/*		else
		{
			result.hint = field.id + ' is present';
			result.elem = 'img';
			result.elemClass = 'tick';
			result.tdClass = 'bool tick';
		}
*/		
		else
		{
			result.hint = field.id + ' is present as ' + this.trimValue(this.filterClaferValue(sVal));
			result.elem = 'img';
			result.elemClass = 'tick';
			result.tdClass = 'bool tick';
		}
	}
	else if (type == "int")
	{
		result.tdClass = 'numeric';
		if (sVal == "none")
		{
			result.hint = 'no ' + field.id;
			result.elem = 'span';
			result.elemClass = 'number';
			result.elemContent = '-';
		}
		else
		{
			result.hint = field.id + ' = ' + sVal;
			result.elem = 'span';
			result.elemContent = sVal;
			result.elemClass = 'number texttosearch';
		}
	}
	else if (type == "string")
	{
		result.tdClass = 'string';
		if (sVal == "none")
		{
			result.hint = 'no ' + field.id;
			result.elem = 'img';
			result.elemClass = 'noMan';
		}
		else
		{
			result.hint = field.id + ' = ' + sVal;
			result.elem = 'span';
			result.elemContent = sVal;
			result.elemClass = 'string texttosearch';
		}
	}
	else // just clafer of a non-primitive type
	{
		result.tdClass = 'clafer';

		if (field.card == "")
		{
			if (sVal == "none")
			{
				result.hint = field.id + ' is not present';
				result.elem = 'img';
				result.elemClass = 'noMan';
				result.tdClass = 'bool no';
			}
			else
			{
				result.hint = field.id + ' is present as ' + this.trimValue(this.filterClaferValue(sVal));
				result.elem = 'span';
				result.elemContent = this.trimValue(this.filterClaferValue(sVal));
				result.elemClass = 'string texttosearch';
/*
				result.hint = field.id + ' is present as ' + this.trimValue(this.filterClaferValue(sVal));
				result.elem = 'img';
				result.elemClass = 'tickMan';
				result.tdClass = 'bool tick';
*/
			}
		}
		else
		{
			if (sVal == "none")
			{
				result.hint = 'no ' + field.id;
				result.elem = 'img';
				result.elemClass = 'noMan';
			}
			else
			{
				result.hint = field.id + ' = ' + this.prettifyClaferSet(sVal);
				result.elem = 'span';
				result.elemContent = this.prettifyClaferSet(sVal);
				result.elemClass = 'clafer texttosearch';
			}
		}
	}


	if (field.em !== null && (denyEMCheck === undefined || denyEMCheck === false ))
	{
		result.hint =  'All the values are the same and equal ' + field.em;
		result.elem = 'span';
		result.elemContent = '&nbsp;';
		result.tdClass += ' em';
	}
		
	return result;
});

TableVisualizer.method("filter", function(data)
{
	this.refresh(data);
});

TableVisualizer.method("preprocessData", function(sdata)
{

	var filteredInstanceIds = new Array();
	var context = this;

	var filteredMatrix = sdata.matrix.reduce(function(prev, cur){
//		console.log(cur["_hidden"]);
		if ((prev.length < context.displayLimit) && (cur["_hidden"] === undefined || cur["_hidden"] === false))
		{
			prev.push(cur);
			filteredInstanceIds.push(cur["id"]);
		}
		return prev;
	}, []);

	// warning: a potential memory leak here!!!
	var newData = jQuery.extend(true, {}, sdata);	
	newData.matrix = filteredMatrix;
	newData.instanceMatch = filteredInstanceIds.length;
	newData.instanceIds = filteredInstanceIds;

	return newData;

});

TableVisualizer.method("collapse", function(id)
{
	var context = this;
	context.fieldCells.each(function(d){
		if ((d.path.length > id.length) && (d.path.substring(0, id.length) == id))
		{
			d3.select(d3.select(this).node().parentNode).classed("collapsed", true);
		}
	});

	if (context.chartListeners.onCollapsed)
		context.chartListeners.onCollapsed(id);
});

TableVisualizer.method("expand", function(id)
{
	var context = this;
	context.fieldCells.each(function(d){
		if ((d.path.length > id.length) && (d.path.substring(0, id.length) == id))
		{
			d3.select(d3.select(this).node().parentNode).classed("collapsed", false);
		}
	});

	if (context.chartListeners.onExpanded)
		context.chartListeners.onExpanded(id);
});

TableVisualizer.method("makeActive", function(d)
{
	d3.select("#" + this.nodeId + "-" + "th" + d).classed("over", true);
});

TableVisualizer.method("makeInactive", function(d)
{
	d3.select("#" + this.nodeId + "-" + "th" + d).classed("over", false);
});