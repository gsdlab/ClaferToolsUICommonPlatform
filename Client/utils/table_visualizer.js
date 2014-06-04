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

function TableVisualizer () 
{
//	this.data = data;
}

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

TableVisualizer.method("mapValue", function(feature, sVal, type)
{
	var result = new Object();
//	result.title = "Hello";

	if (feature.em !== null)
	{
		result.title =  'All the values are the same and equal ' + feature.em;
		result.html = '<span>&nbsp;</span>';
		result.tdStyle = 'em';
		return result;
	}
	
	if (type == "bool")
	{
		if (sVal == "yes")
		{
			result.title = feature.id + ' is present';
			result.html = '<img class="tick" src="commons/Client/images/tick.png"/>';
			result.tdStyle = 'bool tick';
		}
		else
		{
			result.title = feature.id + ' is not present';
			result.html = '<img class="no" src="commons/Client/images/no.png"/>';
			result.tdStyle = 'bool no';
		}
	}
	else if (type == "boolclafer")
	{
		if (sVal == "none")
		{
			result.title = feature.id + ' is not present';
			result.html = '<img title class="no" src="commons/Client/images/no.png"/>';
			result.tdStyle = 'bool no';
		}
		else
		{
			result.title = feature.id + ' is present as ' + this.trimValue(this.filterClaferValue(sVal));
			result.tdStyle = 'bool tick clafer';
			result.html = '<img class="tick" src="commons/Client/images/tick.png"/>';
		}
	}
	else if (type == "int")
	{
		result.tdStyle = 'numeric';
		if (sVal == "none")
		{
			result.title = 'no ' + feature.id;
			result.html = '<span class="clafer">' + '-' + '</span>';
		}
		else
		{
			result.title = feature.id + ' = ' + sVal;
			result.html = '<span class="number texttosearch">' + sVal + '</span>';
		}
	}
	else // just clafer of a non-primitive type
	{
		result.tdStyle = 'clafer';
		if (sVal == "none")
		{
			result.title = 'no ' + feature.id;
			result.html = '<span class="clafer">' + '-' + '</span>';
		}
		else
		{
			result.title = feature.id + ' = ' + this.prettifyClaferSet(sVal);
			result.html = '<span class="clafer texttosearch">' + this.trimValue(this.filterClaferValue(sVal)) + '</span>';
		}
	}
		
	return result;
});

// The Main Content Generator

TableVisualizer.method("getHTML", function(data, colWidth) 
{
	var instanceCount = data.products.length;    
	var table = $('<table id="tBody" width="100%" cellspacing="0" cellspadding="0"></table>').addClass('foo');
	var body = $('<tbody></tbody>');

    // first row - headers
    var row = $('<thead id="r' + 0 +'"></thead>').addClass('bar');//
	var tagName = "th"; // to make headers
	var td = $('<' + tagName + ' width="' + colWidth + '" style="min-width:' + colWidth + 'px"></' + tagName + '>').addClass('td_abstract').addClass('table_title');
	td.html(data.title);
	row.append(td);
    
    for (var j = 0; j < instanceCount; j++)
    {
        var td = $('<' + tagName + ' id="' + tagName + "0" + "_" + (j + 1) + '"></' + tagName + '>').addClass('td_instance');
        td.html(data.products[j]);
		row.append(td);
    }

	var td = $('<' + tagName + ' id="' + tagName + "0" + "_" + (instanceCount + 1) + '"></' + tagName + '>').addClass('td_extra');
	row.append(td);

    table.append(row);
    
    // next rows
	
	tagName = "td";
    
    for (var i = 0; i < data.features.length; i++)
	{
			
		var row = $('<tr id="r' + (i + 1) +'"></tr>').addClass(data.features[i].type);
		
		var td = $('<' + tagName + ' width="' + colWidth + '" style="min-width:' + colWidth + 'px"></' + tagName + '>').addClass('td_abstract').addClass(data.features[i].type);

		var tooltip = data.features[i].path.replaceAll("-", "::");

		$(td).attr("title", tooltip);	

		var html = '<span class="texttosearch">' + data.features[i].title.replaceAll(' ', '&nbsp;&nbsp;') + '</span>';
		html += '<span class="path" style="display:none;">' + data.features[i].path + '</span>';
		html += '<span class="id" style="display:none;">' + data.features[i].id + '</span>';
		html += '<span class="typelabel ' + data.features[i].type + '"></span>';
		
		var space;
		if (data.features[i].card != "")
			space = "&nbsp;";
		else
			space = "";

		html += space + '<span class="card">' + data.features[i].card + '</span>';

		/* effectively mandatory */

		if (data.features[i].em !== null)
		{
			html += '<span class="emvalue"> = ' + this.trimValue(this.filterClaferValue(data.features[i].em + "")) + '</span>';
			$(td).addClass("emabstract");
		}

		$(td).html(html);
        
		row.append(td);
				
		for (var j = 0; j < instanceCount; j++)
		{
			var td = $('<' + tagName + ' id="' + tagName + i + "_" + (j + 1) + '"></' + tagName + '>').addClass('td_instance');
			
            mappedValue = this.mapValue(data.features[i], data.matrix[i][j], data.features[i].type);
            td.html(mappedValue.html);
            td.attr("title", mappedValue.title);
            td.addClass(mappedValue.tdStyle);

			row.append(td);
		}

		// adding a dummy column, so that the table will always have at least to columns, so that
		// the table will be formatted properly even if there are no instances after filtering

		var td = $('<' + tagName + ' id="' + tagName + i + "_" + (instanceCount + 1) + '"></' + tagName + '>').addClass('td_extra');
		row.append(td);

        body.append(row);
	}

    table.append(body);

	return table;

});

