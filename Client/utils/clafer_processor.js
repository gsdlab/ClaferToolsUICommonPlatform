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
function ClaferProcessor (sourceXML) {
    this.source = (new XMLHelper()).stringToXML(sourceXML);
    this.xmlHelper = new XMLHelper();
}

//returns claferid without the cXX_ extension
ClaferProcessor.method("claferFilter", function(s)
{
	return s.replace(/c[^_]*_/g, "");
});

ClaferProcessor.method("operationFilter", function(s)
{
	var result = "";
	
	if (s == "max")
		result = "max" + " ";
		
	else if (s == "min")
		result = "min" + " ";
	else
		result = s;
		
	return result;
});

ClaferProcessor.method("buildExp", function(exp)
{
	var argCount = 0;
	var operation = "";
	
	var renderedArgs = new Array();
	
	for (var i = 0; i < exp.childNodes.length; i++)
	{
		var current = exp.childNodes[i];
		if (current.tagName == "argument")
		{			
			var expressions = current.getElementsByTagName("exp");
			if (expressions.length != 0)
				renderedArgs[argCount++] = this.buildExp(expressions[0]);
		}
		else if (current.tagName == "operation")
		{
			operation = this.operationFilter(current.childNodes[0].nodeValue);
		}
		else if (current.tagName == "id")
		{
			return current.childNodes[0].nodeValue;
		}
	}
	
	if (argCount == 1)
		return operation + renderedArgs[0];
	else
		return renderedArgs.join(operation);
	
});

ClaferProcessor.method("getGoals", function() 
{
	var xpGoals = this.xmlHelper.queryXML(this.source, "/module/declaration[@type='IGoal']/parentexp/exp");
	var result = new Object();

	for (var i = 0; i < xpGoals.length; i++) 
	{
		var builtExp = this.buildExp(xpGoals[i]);
		
		var parts = builtExp.split(" ");
		var operation = parts[0];
		var rest = builtExp.replace(/[^ ]* /, "").replace(".ref", "");
		
		var goal = new Object();
		goal.operation = operation;
		goal.arg = ("root." + rest).replaceAll(".", "-"); // cause . confuses HTML ids
//		alert(goal.arg);
//		rest = rest.replace(/[^.]*\./, "");
		goal.label = this.claferFilter(rest);
		
//		alert("|" + rest + "|");
		
		result[goal.arg] = goal;
	}
	
	return result;
});

ClaferProcessor.method("calcClaferType", function(clafer)
{
	if (clafer.superClafer == 'integer')
		return 'int';

	if (clafer.claferCardMin == 0 && clafer.claferCardMax == 1)
	{
		if (clafer.superClafer == 'clafer')
		{
			return 'bool';
		}
		return 'boolclafer';
	}

	return 'clafer';

});

ClaferProcessor.method("getClaferTree", function(root, options)
{
	var subLength = 0;
	var result = new Object();
	result.subclafers = new Array();
	result.claferId = "root";
	result.displayId = "root";
	result.claferValue = "";

	if (root.tagName != 'module' && root.getAttribute("type") != "IClafer")
	{
		return null;
	}

	for (var j = 0; j < root.childNodes.length; j++)
	{
		var current = root.childNodes[j];

		if (current.tagName == "value")
			result.claferValue = current.firstChild.nodeValue;
		else if (current.tagName == "uniqueid")
			result.claferId = current.firstChild.nodeValue;
		else if (current.tagName == "id")
			result.displayId = current.firstChild.nodeValue;
		else if (current.tagName == "card") // cardinality
		{
			result.claferCardMin = $($($(current).find("min")[0]).find("intliteral")[0]).text();
			result.claferCardMax = $($($(current).find("max")[0]).find("intliteral")[0]).text();
		}
		else if (current.tagName == "declaration")
		{
			if ((options.omitAbstracts == true) && ($($(current).find("isabstract")[0]).text() == "true"))
			{
				continue;
			}

			var nextSubtree = this.getClaferTree(current, {});

			if (nextSubtree != null)
				result.subclafers[subLength++] = nextSubtree; 
		} 
		else if (current.tagName == "supers")
		{
			if ($($(current).find("isoverlapping")[0]).text() == "false") // if NOT a reference
			{
				result.superClafer = $(current).find("id").text();
				var nextSubtree = this.getTopClaferTree(result.superClafer, {});
				if (nextSubtree != null)
					for (var i = 0; i<nextSubtree.subclafers.length; i++)
						result.subclafers[subLength++] = nextSubtree.subclafers[i];		 
			}
		}		
	}
	
	result.type = this.calcClaferType(result);
	return result;
});
//
ClaferProcessor.method("getTopClaferTree", function(id) // id can be either 'root' or a top clafer required
{
	try
	{
		var node = null;
		var omitAbstracts = false;
		
		if (id == 'integer' || id == 'clafer') // a primitive type, will not be in the IR
		{
			return null;
		}

		if (id == 'root') // if we request the entire tree from the root
		{
			var declarations = this.xmlHelper.queryXML(this.source, '/module'); // IE8 cannot handle the entire path (with checking text value)
			node = declarations[0];
			omitAbstracts = true;
		}
		else
		{
			var uniqueIds = this.xmlHelper.queryXML(this.source, "/module/declaration/uniqueid"); // IE8 cannot handle the entire path (with checking text value)
			
			for (var i = 0; i < uniqueIds.length; i++)
			{
				if (uniqueIds[i].firstChild.nodeValue == id)
				{
					node = uniqueIds[i].parentNode;
					break;
				}
			}
		}

		if (node == null)
		{
			// clafer not found
			console.log("The requested top clafer not found: " + id);			
			return null;
		}

		return this.getClaferTree(node, {"omitAbstracts" : omitAbstracts});
	}
	catch(e)
	{
		console.log("Exception while searching for the top clafer: " + id);			
		return "";
	}
		
});

ClaferProcessor.method("getFeaturesWithChildren", function(tree){
	var list = [];
	if(tree.subclafers!=null){
		for (var i = 0; i<tree.subclafers.length; i++){
			list = list.concat(this.recursiveHasChildrenCheck(tree.subclafers[i]));
		}
		return list;
	} else 
		return [];
});

ClaferProcessor.method("recursiveHasChildrenCheck", function(root){
	var list = []
	if (root.subclafers.length > 0){
		list.push(root.claferId);
		for (var i = 0; i<root.subclafers.length; i++){
			list = list.concat(this.recursiveHasChildrenCheck(root.subclafers[i]));
		}
	}
	return list;
});