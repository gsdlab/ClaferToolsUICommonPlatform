/*
Copyright (C) 2012, 2013 Alexander Murashkin, Neil Redman <http://gsd.uwaterloo.ca>

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

// returns the base abstract clafer of all instances (they should have the same base abstract clafer)

InstanceProcessor.method("getInstanceSuperClafer", function() 
{
	try
	{
		var rootClafer = this.xmlHelper.queryXML(this.source, "/instances/instance/clafer/super[1]")[0].firstChild.nodeValue;
	}
	catch(e)
	{
		alert("Could not get a super clafer of the instance root");
		return "";
	}
	
	return rootClafer;
});


// returns feature value of featureName feature of an instance number instanceIndex
// forceNumeric forces to return an integer

InstanceProcessor.method("getFeatureValue", function(instanceIndex, featureName, forceNumeric) 
{
	try
	{
        var clafers = this.xmlHelper.queryXML(this.source, 'instances/instance[' + instanceIndex + ']' + '//clafer[@id="' + featureName + '"]');
		if (clafers.length == 1)
		{	
			var result;

			if (forceNumeric)
				result = 0;
			else
				result = "yes";
		
			for (var i = 0; i < clafers[0].childNodes.length; i++)
			{
				var current = clafers[0].childNodes[i];

				if (current.tagName == "value")
				{
//					alert("foundValue");
					var id = current.getAttribute("id");
					var counter = current.getAttribute("counter");
//					alert(id + " | " + counter);

					if (counter == "")
						result = id;
					else
						result = id + "#" + counter;

					break;
				}
			}

			if (forceNumeric)
				return parseInt(result);
			
			return result;
		}
		else
        {
//        	alert(clafers.length + " " + instanceIndex + " " + featureName + " " + forceNumeric);
			if (forceNumeric)
				return 0;
			return "-";
        }
	}
	catch(e)
	{
		alert("Error while checking the feature specified by: '" + instanceIndex + " " + featureName + "'");
		return "";
	}
		
});

InstanceProcessor.method("getInstanceName", function(){
	try {
		var ClaferId = this.xmlHelper.queryXML(this.source, "/instances/instance/clafer/@id");
	} catch(e) {
		alert("Could not get a clafer id of the instance root");
		return "";
	}
	
	return ClaferId[0].nodeValue;
});