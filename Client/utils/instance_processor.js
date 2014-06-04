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

// Instance Processor is used to work with sets of configurations presented as XML

function InstanceProcessor (sourceXML) {
    this.source = (new XMLHelper()).stringToXML(sourceXML);
    this.xmlHelper = new XMLHelper();
}

// returns the number of instances in the set
InstanceProcessor.method("getInstanceCount", function() 
{
	var elements = this.source.getElementsByTagName("instance");
	if (elements == null)
		return 0;

	return elements.length;
});

InstanceProcessor.method("makeXMLPath", function(pathArray)
{
	var result = "";

	for (var i = 0; i < pathArray.length; i++)
	{
		if (i > 0)
		{
			result += '/subclafers';
		}

		result += '/' + 'clafer[@id="' + pathArray[i] + '"]';
	}

	return result;
});




// returns feature value of featureName feature of an instance number instanceIndex
// forceNumeric forces to return an integer

InstanceProcessor.method("getFeatureValue", function(instanceIndex, claferPath, type) 
{
	try
	{
        var xPath = 'instances/instance[' + instanceIndex + ']' + this.makeXMLPath(claferPath);
        var clafers = this.xmlHelper.queryXML(this.source, xPath);
		if (clafers.length == 0)
		{
//			alert("Feature value not found: '" + instanceIndex + " " + claferPath + "'");

			if (type == 'int')
				return "none";

			if (type == 'bool')
				return "-";

			return "none";
		}

		var results = new Array();

		if (type == 'bool')
		{
			return "yes";			
		}

		for (var resultId = 0; resultId < clafers.length; resultId++)
		{
			var result;

			for (var i = 0; i < clafers[resultId].childNodes.length; i++)
			{
				var current = clafers[resultId].childNodes[i];

				if (current.tagName == "value")
				{
//					alert("foundValue");
					var id = current.getAttribute("id");
					var counter = current.getAttribute("counter");
//					alert(id + " | " + counter);

					if (counter == "")
						result = id;
					else
						result = id + "$" + counter;

//					break;
				}
			}

			if (result == "")
				result = clafers[resultId].getAttribute("id") + "$" + clafers[resultId].getAttribute("counter");

			if (type == 'int')
				results.push(parseInt(result));
			else results.push(result);

		}

//		if (type == 'boolclafer')
//			alert(claferPath + "|" + results[0]);

		if (results.length == 1)
		{
			if (type == 'int')
				return parseInt(results[0]); // cannot join integers!
			else
				return results[0];
		}

		return "{" + results.join("; ") + "}";
	}
	catch(e)
	{
		alert("Error while checking the feature specified by: '" + instanceIndex + " " + claferPath + "'");
		return "";
	}
		
});
/*
InstanceProcessor.method("getInstanceName", function(){
	try {
		var ClaferId = this.xmlHelper.queryXML(this.source, "/instances/instance/clafer/@id");
	} catch(e) {
		alert("Could not get a clafer id of the instance root");
		return "";
	}
	
	return ClaferId[0].nodeValue;
});
*/