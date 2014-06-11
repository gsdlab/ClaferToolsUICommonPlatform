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

			context.chartListeners.onSorted(d.id, sortFlag);
		});

});

TableVisualizer.method("refresh", function(data)
{
	this.data = data;
	var context = this;

	var titleNode = context.head.append("th").data([{"id" : "id"}]).text(data.title).attr("width", 200);

	var cat0 = context.head.selectAll("th.instance-id").data(data.instanceIds, function(d){return d;});

	context.headers = cat0.enter()
	    .append("th")
	    	.attr("class", "instance-id")
	    	.attr("id", function (d) {return context.nodeId + "-" + "th" + d; })
	    	.text(function (d) {return d; });

	if (context.options.sorting)
		context.addSortingFeature(titleNode);

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
                    d3.select(this).classed("selected", true);
				}
                else
                {
                    context.chartListeners.onDeselected(d);
                    d3.select(this).classed("selected", false);
                }
            })
		.on("mouseover", function(d){
            context.chartListeners.onMouseOver(d);
            d3.select(this).classed("over", true);
		})
		.on("mouseout", function(d){
            context.chartListeners.onMouseOut(d);
            d3.select(this).classed("over", false);
		})
		.style("cursor", "pointer");
   }

  var cat1 = context.body.selectAll("tr.field-row").data(data.fields, function(d){return d.id;});

  context.rows = cat1.enter()
    .append("tr").attr("class", "field-row").attr("id", function (d) {return d.path; });

  context.fieldCells = context.rows.append("td")
      .attr("class", "field-item").each(function(d){

      		var me = d3.select(this);
      		me.append("span").attr("class", "texttosearch").html(d.title.replaceAll(' ', '&nbsp;&nbsp;'));
      		me.append("span").attr("class", "path").style("display", "none").html(d.path);
//      		me.append("span").attr("class", "level").style("display", "none").html(d.level);
      		me.append("span").attr("class", "id").style("display", "none").html(d.id);
      		var typeLabel = me.append("span").attr("class", "typelabel " + d.type);
      		me.append("span").attr("class", "card").html(d.card != "" ? "&nbsp;" + d.card : "");

			if (d.em !== null)
			{
				me.append("span").text(' = ');
	      		me.append("span").attr("class", "emvalue").text(context.trimValue(context.filterClaferValue(d.em + "")));
				me.classed("emabstract", true);
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
      });

  context.rows.each(function(tr, i){

  		var path = d3.select(this).attr("id");
  		var field = context.data.fields.filter(function(el){return el.path == path})[0];

  		var reducedData = context.data.matrix.reduce(function(prev, cur){
  			prev.push({"value": cur[path], "id": cur.id});
  			return prev;
  		}, []);

  		var cat2 = d3.select(this).selectAll("td.content-cell").data(reducedData);

  		cat2.enter()
		    .append("td").each(function(d){

		    	var mappedObject = context.mapValue(field, d.value);
		    	if (mappedObject.elem == 'img')
		    	{
		    		var src = '';
		    		if (mappedObject.elemClass == 'tick')
		    			src = 'commons/Client/images/tick.png';
		    		else
		    			src = 'commons/Client/images/no.png';

		    		d3.select(this)
		    			.attr("class", "content-cell " + mappedObject.tdClass)
		    			.attr("title", mappedObject.hint)
		    				.append("img")
				    			.attr("class", mappedObject.elemClass)
		    					.attr("src", src);
		    	}
		    	else
		    	{
		    		d3.select(this)
		    			.attr("class", "content-cell " + mappedObject.tdClass)
		    			.attr("title", mappedObject.hint)
		    				.append(mappedObject.elem)
				    			.attr("class", mappedObject.elemClass)
		    					.html(mappedObject.elemContent);		    		
		    	}

		    });

  });

	if (this.options.filtering)
	{
	  	context.rows.each(function(tr, i){
		  	var me = d3.select(this);
			var typeLabelNode = me.select(".typelabel");
		  	if (typeLabelNode.classed("bool") || typeLabelNode.classed("boolclafer"))
		  	{
		  		me.attr("FilterStatus", "none");
	            var emValueNode = me.select(".emvalue");
	            if (!emValueNode.empty()) // is effectively  mandatory
	            {
	                if (emValueNode.text() == "none")
	                {
	                    typeLabelNode.classed("filter_unchecked", true);
	                }
	                else
	                {
	                    typeLabelNode.classed("filter_checked", true);
	                }                    
	            }
	            else
	            {
	                typeLabelNode.classed("filter_normal", true)
	                	.style("cursor", "pointer");

	                typeLabelNode.on("click", function(d){
	                	var row = d3.select(d3.select(this).node().parentNode.parentNode);
	                    var arg = d3.select(d3.select(this).node().parentNode).select(".path").text();

	                    if (row.attr("FilterStatus") == "none"){
	                        typeLabelNode.classed("filter_normal", false);
	                        typeLabelNode.classed("filter_unchecked", false);
	                        typeLabelNode.classed("filter_checked", true);
	                        row.attr("FilterStatus", "require");
	                        context.chartListeners.onFeatureChecked(arg, 1);
	                    } else if (row.attr("FilterStatus") == "require"){
	                        typeLabelNode.classed("filter_normal", false);
	                        typeLabelNode.classed("filter_unchecked", true);
	                        typeLabelNode.classed("filter_checked", false);
	                        row.attr("FilterStatus", "exclude");
	                        context.chartListeners.onFeatureChecked(arg, -1);
	                    } else {
	                        typeLabelNode.classed("filter_normal", true);
	                        typeLabelNode.classed("filter_unchecked", false);
	                        typeLabelNode.classed("filter_checked", false);
	                        row.attr("FilterStatus", "none");
	                        context.chartListeners.onFeatureChecked(arg, 0);                    
	                    }


	                });
	            }

		  	}
		});
	}
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

function TableVisualizer(nodeId, options, chartListeners) 
{
    this.nodeId = nodeId;
    this.options = options;
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

}

TableVisualizer.method("select", function(i)
{
    d3.select("#R" + i).classed("selected", true);    
});

//formats object as not selected
TableVisualizer.method("unselect", function(i)
{
    d3.select("#R" + i).classed("selected", false);    
});


TableVisualizer.method("filterClaferValue", function(s){
	return s.replace(/c[0-9]*_/g, "");
});

TableVisualizer.method("prettifyClaferSet", function(s){
	return s.replace("{", "{<br/>").replace("}", "<br/>}").replaceAll(";", "<br/>");
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


TableVisualizer.method("mapValue", function(field, sVal)
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
		else
		{
			result.hint = field.id + ' is present as ' + this.trimValue(this.filterClaferValue(sVal));
			result.elem = 'img';
			result.elemClass = 'tick';
			result.tdClass = 'bool tick clafer';
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
	else // just clafer of a non-primitive type
	{
		result.tdClass = 'clafer';
		if (sVal == "none")
		{
			result.hint = 'no ' + field.id;
			result.elem = 'span';
			result.elemClass = 'clafer';
			result.elemContent = '-';
		}
		else
		{
			result.hint = field.id + ' = ' + this.prettifyClaferSet(sVal);
			result.elem = 'span';
			result.elemContent = this.trimValue(this.filterClaferValue(sVal));
			result.elemClass = 'clafer texttosearch';
		}
	}


	if (field.em !== null)
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
	var context = this;
	context.headers.each(function(d){
		d3.select(this).style("display", data.matrix.some(function(el){ return (el.id == d) && (el["_hidden"] === true);}) ? "none" : null);
	});

	context.rows.selectAll("td.content-cell").each(function(d){
		d3.select(this).style("display", data.matrix.some(function(el){ return (el.id == d.id) && (el["_hidden"] === true);}) ? "none" : null);
	});

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