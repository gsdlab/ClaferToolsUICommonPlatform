/* instance processing class */

function InstanceConverter(source)
{
	this.instances = source;
}

// Converts ClaferMoo output (list of instances with unique clafer names represented as a structural text)
// from the source to XML
// returns: XML in plain text format
/*
InstanceConverter.method("convertFromClaferMooOutputToXML", function(){
	myRegExp = /\b([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ ]*\=?[ ]*([^ ]*)\b/;
	var result = "";
	list = this.instances.split("\n");
	
	result = '<?xml version="1.0"?><instances><instance>';
	var temp = "";
	var oldpos = -1;
	var pos = 0;
	var empty = true;
	
	for (var i = 0; i < list.length; i++)
	{
		var s = list[i];

		if (s == "" && (oldpos != 0 || i !=list.length-1))
			continue;
		else if( s == "" && oldpos == 0 && i == list.length-1 ){
			result += "</subclafers></clafer>";
			continue;
		}
	
		empty = false;
	
		myMatch = myRegExp.exec(s);
		if (myMatch == null)
			continue;
			
		pos = myMatch.index;
		
		var indent = 0;
		
		if (oldpos != -1)
		{		
			if (pos > oldpos) // nesting level increases, only by one!!!
			{
				result += "";
			}
			
			if (pos < oldpos)
			{
				for (var j = 0; j < (oldpos - pos + 1); j++)
				{
					result += "</subclafers></clafer>";
				}
			}
			
			if (pos == oldpos) // clearly NO children
			{
				result += "</subclafers></clafer>";
			}
				
			if (pos == 0) // new instance begins
			{
				result += "</instance><instance>";
			}
			
			oldpos = pos;
		}
		else oldpos = 0;
		
		clafer = myMatch[1];
//		if (clafer == "c7_connectivity") alert("yes!");
			
		super_clafer = myMatch[2];
		value = myMatch[3];
		result += '<clafer id="' + clafer + '"><super>' + super_clafer + '</super><value>' + value + '</value><subclafers>';

	}
	
	if (empty)
	{
		return "";
	}
	
	if (0 < oldpos)
	{
		for (var j = 0; j < (oldpos + 1); j++)
		{
			result += "</subclafers></clafer>";
		}
	}	
	
	result += "</instance></instances>";

	console.log(result);
	alert(result);
	
	return result;
});
*/

InstanceConverter.method("convertFromClaferMooOutputToXML", function(targetClaferID){
	var myRegExp = /\b([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ ]*\=?[ ]*([^ ]*)\b/;
	var instanceRegExp = /^=== Instance ([0-9]*) ===$/gm;
//	var topClaferExp = /\^([^:= ]*)[ ]*\:?[ ]*([^:=]*)[ ]*\=?[ ]*([^ ]*)\b/;

	var result = '<?xml version="1.0"?><instances>';
	var instanceTextArray = new Array();
	

	var match = instanceRegExp.exec(this.instances);

	if (match == null) // meaning no instances
	{
		result += '</instances>';
		return result;		
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

	for (var instanceID = 0; instanceID < instanceTextArray.length; instanceID++)
	{
		result += '\n<instance>';

		if (targetClaferID == null)
		{
			result += '\n<clafer id="' + 'root' + '" counter="' + '0' + '">';
			result += '<super>' + 'clafer' + '</super>';
			result += '<value></value>';
			result += '<subclafers>';			
		}

		var temp = "";
		var oldpos = -1;
		var pos = 0;

//		alert(instanceTextArray[instanceID]);

		var lines = instanceTextArray[instanceID].split("\n");
//		lines.pop(); // remove the last line with --- instance ends
//		lines.pop(); // remove the last line with --- instance ends
//		lines.pop(); // remove the last line with --- instance ends
	
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

			var topClaferMatch = myRegExp.exec(lines[line]); // checking whether we are at the top clafer declaration
			if (topClaferMatch != null && (topClaferMatch.index == 0)) // if we are at the line with a top clafer
			{
//				alert("top clafer" + lines[line]);

				// we should skip the top clafers we don't need
				while (line < lines.length)
				{
					var topClaferMatch = myRegExp.exec(lines[line]);
					line++;
					if (topClaferMatch == null)
						continue;

					var claferParts = topClaferMatch[1].split("$");
					var claferId = claferParts[0];

					if (claferId == targetClaferID)
					{
						break;
					}
				}

				if (0 < oldpos)
				{
					for (var j = 0; j < (oldpos + 1); j++)
					{
						result += "</subclafers></clafer>";
					}
				}	

				if (line >= lines.length)
					break;

				s = lines[line - 1];

				oldpos = -1;
			}
			else
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
				if (pos == oldpos) // clearly NO children
				{
					result += "</subclafers></clafer>";
				}

				if (pos > oldpos) // nesting level increases
				{
					result += ""; // don't do anything, clafers will be nested after the loop
				}
				
				if (pos < oldpos)
				{
					for (var j = 0; j < (oldpos - pos + 1); j++)
					{
						result += "</subclafers></clafer>";
					}
				}
					
//				if (pos == 0) // new instance begins
//				{
//					result += "</instance><instance>";
//				}
				
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
			var valueId = "";
			var valueCounter;

			if (value == "")
			{
				valueId = "";
				valueCounter = "";
			}
			else
			{
				var valueParts = value.split("$");

				if (valueParts && valueParts.length == 2) // we have just value, not an instance reference
				{
					valueId = valueParts[0];
					valueCounter = valueParts[1];
				}
				else
				{
					valueId = value;
					valueCounter = "";
				}
			}

			result += '\n<clafer id="' + claferId + '" counter="' + claferCounter + '">';
			result += '<super>' + superClafer + '</super>';
			result += '<value id="'  + valueId  + '" counter="' + valueCounter  + '"></value>';
			result += '<subclafers>';
		}

		if (0 < oldpos)
		{
			for (var j = 0; j < (oldpos + 1); j++)
			{
				result += "</subclafers></clafer>";
			}
		}	
	
		if (targetClaferID == null)
		{
			result += "</subclafers>";
		}

		result += "</instance>";
	}

	result += '</instances>';

//	var obj = {};
//	obj.a = result;
//	console.log(obj);
//	console.log(obj.a);
	
	return result;
});

//function that can change an instance given by claferIG to match the output of ClaferMoo
InstanceConverter.method("convertFromClaferIGOutputToClaferMoo", function(oldAbstractXML){
	var instances = this.instances;
	//remove $x
	var myregex = /\x24[0-9]{1,}[ ]/g;
	instances = instances.replace(myregex, " ");

	//convert double spacing to tab
	instances = instances.replaceAll("  ", " ");

/* commenting out fixes a bug with `Bluetooth

	//make numbers the same
	myregex = /[c][0-9]{1,}[_][^\n <>]{1,}/g;
	var allFinds = instances.match(myregex);
	var uniqueFinds = [];
	if (allFinds === null){
		return "";
	}
	for (var i=0; i<allFinds.length; i++){
		if ($.inArray(allFinds[i], uniqueFinds) === -1){
			uniqueFinds.push(allFinds[i]);
		}
	}

	var allOldFinds = oldAbstractXML.match(myregex);
	var uniqueOldFinds = [];
	for (var i=0; i<allOldFinds.length; i++){
		if ($.inArray(allOldFinds[i], uniqueOldFinds) === -1){
			uniqueOldFinds.push(allOldFinds[i]);
		}
	}

	for (var i=0; i<uniqueFinds.length; i++){
		current = uniqueFinds[i].replace(/[c][0-9]{1,}[_]/, "");
		for (var y=0; y<uniqueOldFinds.length; y++){
			if (uniqueOldFinds[y].replace(/[c][0-9]{1,}[_]/, "") == current){
				instances = instances.replaceAll(uniqueFinds[i], uniqueOldFinds[y]);
			}
		}
	}
*/
	return instances;
});

//returns the data for a single instance
InstanceConverter.method("getInstanceData", function(pid){
	var instances = this.instances;
	var lines = instances.match(/^.*([\n\r]+|$)/gm);
	var supertype = lines[1].replace(/[c][0-9]{1,}[_]/, "");
	var myregex = new RegExp("[c][0-9]{1,}[_]" + supertype , "g"); 
	var data = lines[1] + instances.split(myregex)[pid.substring(1)];
	data = data.replace(" ", "  ");
	return data;
});