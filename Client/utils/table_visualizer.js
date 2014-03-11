/*
Copyright (C) 2012 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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

TableVisualizer.method("mapValue", function(sVal, type)
{
	var result = new Object();
	
	if (type == "bool")
	{
		if (sVal == "yes")
		{
			result.html = '<img class="tick" src="commons/Client/images/tick.png"/>';
			result.tdStyle = 'bool tick';
		}
		else
		{
			result.html = '<img class="no" src="commons/Client/images/no.png"/>';
			result.tdStyle = 'bool no';
		}
	}
	else if (type == "int")
	{
		result.tdStyle = 'numeric';
		result.html = '<span class="number">' + sVal + '</span>';
	}
	else // just clafer of a non-primitive type
	{
		result.tdStyle = 'clafer';
		result.html = '<span class="clafer">' + this.filterClaferValue(sVal) + '</span>';
	}
		
	return result;
});

// The Main Content Generator

TableVisualizer.prototype.getHTML = function(data) 
{
	var instanceCount = data.products.length;    
	var table = $('<table  id="tBody" width="100%" cellspacing="0" cellspadding="0"></table>').addClass('foo');

    // first row - headers
    var row = $('<tr id="r' + 0 +'"></tr>').addClass('bar');//
	var tagName = "th"; // to make headers
	var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract').addClass('table_title');
	td.html(data.title);
	row.append(td);
    
    for (var j = 0; j < instanceCount; j++)
    {
        var td = $('<' + tagName + ' id="' + tagName + "0" + "_" + (j + 1) + '"></' + tagName + '>').addClass('td_instance');
        td.html(data.products[j]);
		row.append(td);
    }
		
    table.append(row);
    
    // next rows
	
	tagName = "td";
    
    for (var i = 0; i < data.features.length; i++)
	{
			
		var row = $('<tr id="r' + (i + 1) +'"></tr>').addClass(data.features[i].type);
		
		var td = $('<' + tagName + '></' + tagName + '>').addClass('td_abstract').addClass(data.features[i].type);

		var tooltip = data.features[i].path.replaceAll(".", "::");

		$(td).attr("title", tooltip);	

		var html = data.features[i].title.replaceAll(' ', '&nbsp;&nbsp;');
		html += '<span class="path" style="display:none;">' + data.features[i].path + '</span>';
		html += '<span class="id" style="display:none;">' + data.features[i].id + '</span>';
		html += '<span class="typelabel ' + data.features[i].type + '"></span>';
		
		var space;
		if (data.features[i].card != "")
			space = "&nbsp;";
		else
			space = "";

		html += space + '<span class="card">' + data.features[i].card + '</span>';
		$(td).html(html);
        
		row.append(td);
				
		for (var j = 0; j < instanceCount; j++)
		{
			var td = $('<' + tagName + ' id="' + tagName + i + "_" + (j + 1) + '"></' + tagName + '>').addClass('td_instance');
			
            mappedValue = this.mapValue(data.matrix[i][j], data.features[i].type);
            td.html(mappedValue.html);
            td.addClass(mappedValue.tdStyle);

			row.append(td);
		}

        table.append(row);
	}
	return table;

}

