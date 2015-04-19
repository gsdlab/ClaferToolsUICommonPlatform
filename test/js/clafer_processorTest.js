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
function ClaferProcessor (sourceJSON) {
    
    this.source = sourceJSON;

    this.claferTemplate =  {
			subclafers: 	[],
			claferId: 		"",
			displayId: 		"",
			claferValue: 	"", // TODO
			superClafer: 	"",
			reference: 		"",
			super: 				"" // TODO: rename to supers
		};

		this.clafers = ClaferAPI.getClafers(this.source);
}

//returns claferid without the cXX_ extension
ClaferProcessor.method("claferFilter", function(s) {
	return s.replace(/c[0-9]*_/g, "");
});

ClaferProcessor.method("getByUID", function(uid) {
	var clafers = this.clafers;

	return _.filter(clafers, function(clafer){
						return ClaferAPI.getProperty(clafer, 'uid') === uid;
					});
});

ClaferProcessor.method("getAllChildren", function(clafer) {

	var processor = this,
			result =  _.filter(processor.clafers, function(cl){
													return !cl.isAbstract && cl.parentUID === ClaferAPI.getProperty(clafer, 'uid'); 
												});

		_.each(ClaferAPI.getProperty(clafer, 'supers'), function(superUID){
	
			var superClafer = processor.getByUID(superUID)[0],
					children = _.filter(processor.clafers, function(cl){
																return !cl.isAbstract && cl.parentUID === ClaferAPI.getProperty(superClafer, 'uid'); 
															})

			result = result.concat(children);
		}); 

		return result;
});


ClaferProcessor.method("calcClaferType", function(clafer) {

	if (clafer.superClafer === 'integer')
		return 'int';

	if (clafer.superClafer === 'string')
		return 'string';

	if (clafer.claferCardMin == 0 && clafer.claferCardMax == 1)
	{
		if (clafer.superClafer == 'clafer') // TODO
		{
			return 'bool';
		}
		return 'boolclafer';
	}

	return 'clafer';

});

ClaferProcessor.method("createClaferObject", function(clafer) {

	var processor = this;

	if(clafer === undefined || _.isEmpty(clafer) ) {
		return null;
	}

	var result = $.extend({},processor.claferTemplate, {
		claferId 			: ClaferAPI.getProperty(clafer, 'uid', ""),
		displayId			: ClaferAPI.getProperty(clafer, 'ident', ""),
		superClafer		: ClaferAPI.getProperty(clafer, 'superClafer', ""),
		reference			: ClaferAPI.getProperty(clafer, 'reference', ""),
		claferCardMin	: ClaferAPI.getProperty(clafer, 'card')[0],
		claferCardMax	: ClaferAPI.getProperty(clafer, 'card')[1],
	});

	// Supers
	var supers = ClaferAPI.getProperty(clafer, 'supers');
	if(supers !== null) {
		result.super = supers;
	}

	// Type
	result.type = this.calcClaferType(result);

	//Subclafers 
	var subclafers = processor.getAllChildren(clafer);

	result.subclafers = _.map(subclafers, function(subclafer){ 
															return processor.createClaferObject(subclafer); 
														});
	return result;

});

ClaferProcessor.method("getTopClaferTree", function(id) { // id can be either 'root' or a top clafer required
	var processor = this;
	try {

		if (ClaferAPI.primitiveTypes.indexOf(id) >= 0) { // a primitive type, will not be in the IR
			return null;
		}

		if (id === 'root'){ // if we request the entire tree from the root

			// Top level concrete clafers
			var nodes = _.filter(processor.clafers, function(clafer){
										return !clafer.isAbstract && clafer.parentUID === 'root'; 
									});

			var result = $.extend({}, processor.claferTemplate, {
																				claferId 	: "root",
																				displayId	: "root"
																			});

			for (var i = 0; i < nodes.length; i++) {
				result.subclafers.push(processor.createClaferObject(nodes[i]));
			};

			return result;

		} else {
			var node = processor.getByUID(id)[0];

			if (node === undefined) {
				// clafer not found
				console.log("The requested top clafer not found: " + id);
				return null;
			}

			return this.createClaferObject(node);
		}

	}
	catch(e) {
		console.log("Exception while searching for the top clafer: " + id);

		return "";
	}

});


ClaferProcessor.method("buildExp", function(goal) {
	var exp = ClaferAPI.getProperty(goal, 'goalExp',{});
	var argCount = 0;
	var operation = this.operationFilter(ClaferAPI.getProperty(exp, 'goalOperation', ""));

	var renderedArgs = new Array();

	var id = ClaferAPI.getProperty(exp, 'goalExpId');



	if(id) {
		return id;
	}

	var exps = ClaferAPI.getProperty(exp, 'goalExps', []);

	for (var i = 0; i < exps.length; i++) {
		var childExp = this.buildExp(exps[i]);

		renderedArgs.push(childExp);
	};

	if (renderedArgs.length === 1){
		return operation + renderedArgs[0];
	}
	else{
		return renderedArgs.join(operation);
	}


});

ClaferProcessor.method("getGoals", function()
{


	var xpGoals = ClaferAPI.getGoals(this.source);



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