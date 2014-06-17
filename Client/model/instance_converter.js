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

/* instance processing class */

function InstanceConverter(source)
{
	this.instances = source;
	this.residualText = "";
}

InstanceConverter.method("convertFromClaferMooOutputToXML", function(){
	var myRegExp = /\b([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ \t]*\=?[ \t]*(.*)/;
	var instanceRegExp = /^=== Instance ([0-9]*) Begin ===$/gm;
	var instanceEndRegExp = /^[-][-][-] Instance ([0-9]*) End [-][-][-]$/m;
//	var topClaferExp = /\^([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ ]*\=?[ ]*([^ ]*)\b/;

	var result = '<?xml version="1.0"?><instances>';
	var instanceTextArray = new Array();

	var match = instanceRegExp.exec(this.instances);

	this.residualExtraText = ""; // this is anything left after the processing: some debug text, etc.
	this.residualInstanceText = ""; // this contains incomplete instances (without "Instance End" marker)

	if (match == null) // meaning no instances
	{
		this.residualExtraText = this.instances;
		result += '</instances>';
		return result;		
	}

	var mPos1 = 0;
	var mPos2 = match.index;

	var text = this.instances.substring(0, match.index).trim();

	if (text.length > 0)
		text += "\n";

	this.residualExtraText = text;

	while (match = instanceRegExp.exec(this.instances)) 
	{
		mPos1 = mPos2;
		mPos2 = match.index;
	    instanceTextArray.push(this.instances.substring(mPos1, mPos2));
	}

	instanceTextArray.push(this.instances.substring(mPos2, this.instances.length));

	for (var instanceID = 0; instanceID < instanceTextArray.length; instanceID++)
	{
		var instanceText = instanceTextArray[instanceID];

		var match = instanceEndRegExp.exec(instanceText);

		if (!match)
		{
			// likely, we either have a formatting problem, or the instance data is not fully received
			this.residualInstanceText = instanceText;
			break; 
		}

		var text = instanceText.substring(match.index + match[0].length, match.index + match[0].length + instanceText.length).trim();
		if (text.length > 0)
			text += "\n";

		this.residualExtraText = this.residualExtraText + text; 
		// handling a case when something is printed between instances, then it goes to the residualExtraText
		
		instanceText = instanceText.substring(0, match.index); // removing this unnecessary things
		match = null;

		result += '\n<instance>';

		result += '\n<clafer id="' + 'root' + '" counter="' + '0' + '">';
		result += '<super>' + 'clafer' + '</super>';
		result += '<value id="" counter=""></value>';
		result += '<subclafers>';			

		var temp = "";
		var oldpos = -1;
		var pos = 0;
		var tabSize = 1;

		var lines = instanceText.split("\n");
	
		var line = 0; // we skip the instance label

		while (line < lines.length) // loop through all the lines in the instance
		{
			var s = lines[line];

			if (s.trim().length == 0)
			{
				line++;
				continue;
			}

			if (s.charAt(0) == "=" || s.charAt(0) == "-")
			{
				line++;
				continue;
			}

			line++;

			if (s.trim().length == 0)
			{
				line++;
				continue;
			}

			if (s.charAt(0) == "=" || s.charAt(0) == "-")
			{
				line++;
				continue;
			}
		
			var lineMatch = myRegExp.exec(s);
			if (lineMatch == null)
				continue;
				
			pos = lineMatch.index;
			
			var indent = 0;
			
			if (oldpos != -1)
			{					
				if (pos > oldpos) // nesting level increases
				{
					tabSize = pos - oldpos;
					result += ""; // don't do anything, clafers will be nested after the loop
				}
				else
				{
					result += "</subclafers></clafer>";
					if (pos < oldpos)
					{
						for (var j = 0; j < (oldpos - pos) / tabSize; j++)
						{
							result += "</subclafers></clafer>";
						}
					}
				}
									
				oldpos = pos;
			}
			else oldpos = 0;
			
			var claferParts = lineMatch[1].split("$");
			var claferId = claferParts[0];
			var claferCounter = claferParts[1];
				
			var superClafer = lineMatch[2].trim();
			if (superClafer == "clafer")
				superClafer = "";

			value = lineMatch[3]; // value can be numeric or another instance clafer, it does not matter
			result += '\n<clafer id="' + claferId + '" counter="' + claferCounter + '">';
			result += '<super>' + superClafer + '</super>';
			result += '<value v="' + value.encodeHTML() + '"/>';
			result += '<subclafers>';
		}

		result += "</subclafers></clafer>"; // close the current clafer

		for (var j = 0; j < oldpos / tabSize; j++)
		{
			result += "</subclafers></clafer>"; // close all the clafers on the way to the current one
		}

		result += "</subclafers></clafer>"; // close the ROOT
		result += "</instance>";
	}

	result += '</instances>';

	return result;
});

//returns the data for a single instance
InstanceConverter.method("getInstanceData", function(instanceID){ // todo: update this function
	var myRegExp = /\b([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ \t]*\=?[ \t]*([^ ]*)\b/;
	var instanceRegExp = /^=== Instance ([0-9]*) Begin ===$/gm;
	var instanceEndRegExp = /^[-][-][-] Instance ([0-9]*) End [-][-][-]$/m;

	var instanceTextArray = new Array();
	var match = instanceRegExp.exec(this.instances);

	if (match == null) // meaning no instances
	{
		return "";		
	}

	var mPos1 = 0;
	var mPos2 = match.index;

	while (match = instanceRegExp.exec(this.instances)) 
	{
		mPos1 = mPos2;
		mPos2 = match.index;
	    instanceTextArray.push(this.instances.substring(mPos1, mPos2));
	}

	instanceTextArray.push(this.instances.substring(mPos2, this.instances.length));

	var instanceText = instanceTextArray[instanceID - 1];
	var match = instanceEndRegExp.exec(instanceText);

	if (!match)
	{
		return "";
	}

	instanceText = instanceText.substring(0, match.index + match[0].length) + "\n"; // removing this unnecessary things

	return instanceText;
});