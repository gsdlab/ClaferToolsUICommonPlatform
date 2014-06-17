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

function DataTable (dataSource) 
{
    this.clear();
    if (dataSource)
        this.loadFromDataSource(dataSource);
}

DataTable.method("clear", function(){
    this.matrix = new Array();   // the matrix in the form [{'clafer1' : value11, 'clafer2' : value12, ...}, {'clafer1' : value21, 'clafer2' : value22},]
    this.instanceIds = new Array(); // instance ids
    this.fields = new Array(); // fields (features and quality attributes)
    this.title = "";
    this.objectives = null;
    this.fieldsWithChildren = null;
    this.instanceCount = 0;
});

DataTable.method("computeRanges", function()
{
    for (var o in this.objectives)
    {
        this.objectives[o].minValue = d3.min(this.matrix, function(d) { return d[o];} );
        this.objectives[o].maxValue = d3.max(this.matrix, function(d) { return d[o];} );
    }
});


DataTable.method("loadFromDataSource", function(ds)
{
    console.log(ds.instancesXML);
    this.instanceProcessor = new InstanceProcessor(ds.instancesXML);
    this.claferProcessor = new ClaferProcessor(ds.claferXML);
    this.abstractClaferTree = this.claferProcessor.getTopClaferTree('root');
    this.unparsedInstances = ds.unparsedInstances;

    this.objectives = this.claferProcessor.getGoals();
    this.fieldsWithChildren = this.claferProcessor.getFeaturesWithChildren(this.abstractClaferTree);

    this.loadFromXMLDataSource(this.instanceProcessor, this.abstractClaferTree);
    this.computeRanges();

    console.log(this);
});

DataTable.method("loadFromXMLDataSource", function()
{
    this.instanceCount = this.instanceProcessor.getInstanceCount();
    this.instanceShown = this.instanceCount;

    this.abstractClaferOutput = new Array();
    var current = this.abstractClaferTree;
    this.traverse(current, -1, []); // traversing the xml to get the clafer model tree
    output = this.abstractClaferOutput;
    
//    this.title = output[0].displayWithMargins;
    this.title = "Model \\ Variants";
    
    for (var j = 1; j <= this.instanceCount; j++)
    {
        this.instanceIds.push(String(j));
    }
    
    var emCheckComplete = new Array();

    for (var i = 1; i < output.length; i++)
    {
        var field = new Object();
        field.title = output[i].displayWithMargins;
        field.pathAsArray = output[i].claferPath;
        field.level = field.pathAsArray.length;
        field.path = output[i].claferPath.join("-");
        field.id = output[i].claferId;
        field.super = output[i].super; 
        field.type = output[i].type;
        field.card = output[i].card;
        field.em = null; // null means not effectively mandatory, else it has the common value for all the instances

        emCheckComplete.push(false);
 
        this.fields.push(field);      
    }

    for (var i = 1; i <= this.instanceCount; i++)
    {
        var currentMatrixRow = new Object();      
        currentMatrixRow["id"] = i;

        for (var j = 0; j < this.fields.length; j++)
        {
            sVal = this.instanceProcessor.getFieldValue(i, this.fields[j].pathAsArray, this.fields[j].type);
            currentMatrixRow[this.fields[j].path] = sVal;

            /* check for effective mandatory fields */
            if (!emCheckComplete[j])
            {
                if (this.fields[j].em === null)
                {
                    this.fields[j].em = sVal;
                }
                else
                {
                    if (this.fields[j].em !== sVal)
                    {
                        this.fields[j].em = null;
                        emCheckComplete[j] = true;
                    }
                }
            }
        }

        this.matrix.push(currentMatrixRow);        

    }
});


//input: node in clafer tree, level in tree
//output: object with unique clafer id, id for display and, display id with indentation
DataTable.method("collector", function(clafer, spaceCount, path)
{
    var unit = new Object();
    unit.super = clafer.superClafer;
    unit.claferId = clafer.claferId;
    unit.displayId = clafer.displayId;
    unit.claferPath = path.slice(0); // cloning an array
    clafer.path = unit.claferPath; // NOT GOOD assignmend (by reference). TODO: make it a clone
    unit.type = clafer.type;

    var cardMin;
    var cardMax;

    if (clafer.claferCardMin == "-1")
        cardMin = "*";
    else
        cardMin = clafer.claferCardMin;

    if (clafer.claferCardMax == "-1")
        cardMax = "*";
    else
        cardMax = clafer.claferCardMax;

    var card;

    if (cardMin == cardMax)
        card = cardMin;
    else card = cardMin + ".." + cardMax;
    
    if (card == "0..1")
        card = "?";
    else if (card == "1")
        card = "";

    unit.card = card;

    unit.displayWithMargins = unit.displayId;
    
    for (var i = 0; i < spaceCount; i++)
        unit.displayWithMargins = " " + unit.displayWithMargins;

    this.abstractClaferOutput.push(unit);
});

//Traverses clafer tree to and runs collector on every node
DataTable.method("traverse", function(clafer, level, path)
{
    path.push(clafer.claferId);
    this.collector (clafer, level, path);

    if (clafer.subclafers != null){
        for (var i = 0; i < clafer.subclafers.length; i++)
        {
            this.traverse(clafer.subclafers[i], level + 1, path);
        }
    }

    path.pop();
});

DataTable.method("subsetByInstanceIds", function(requiredInstanceIds)
{
    var result = new DataTable();        
    result.fields = this.fields;
    result.fieldsWithChildren = this.fieldsWithChildren;
    result.instanceIds = requiredInstanceIds;  
    result.instanceCount = requiredInstanceIds.length;  
    result.matrix = this.matrix.filter(function(p, i){
        return (requiredInstanceIds.indexOf(p.id) >= 0); 
    });
    result.title = this.title;
    result.objectives = this.objectives;

    return result;
});
/*
DataTable.method("subsetByFeatures", function(arrayFeatures)
{
    var result = new DataTable();
    
    var marked = new Array();
    var newFeatures = new Array;
    
    for (var i = 0; i < this.features.length; i++)
    {
        var found = false;
        for (var j = 0; j < arrayFeatures.length; j++)
        {
            if (arrayFeatures[j] == this.features[i])
            {
                found = true;
                break;
            }
        }
        marked.push(found);
        if (found)
        {
            newFeatures.push(this.features[i]);
        }
    }
    
    var newMatrix = new Array();
    
    for (var i = 0; i < this.features.length; i++)
    {
        if (!marked[i])
            continue;
    
        var newMatrixRow = new Array();
        
        for (var j = 0; j < this.instanceIds.length; j++)
        {
            var sVal = this.matrix[i][j];
            newMatrixRow.push(sVal);
        }
        
        newMatrix.push(newMatrixRow);
    }
    
    result.features = newFeatures;
    result.instanceIds = this.instanceIds;    
    result.matrix = newMatrix;
    result.title = this.title;    
    
    return result;

});
*/

/* Produces a "common" datatable with a single instance - containing only common values for every feature */
/* and a "difference" datatable with a single instance - containing only common values for every feature */

DataTable.method("getCommonAndDifferent", function()
{
    var result = new Object();
    result["common"] = new DataTable();
    result["common"].title = "Commonalities";
    result["common"].instanceIds.push("Common Value");
    result["common"].instanceCount = 1;
    result["common"].fieldsWithChildren = this.fieldsWithChildren;
    result["common"].objectives = this.objectives;

    result["diff"] = new DataTable();
    result["diff"].title = "Differences";
    result["diff"].instanceIds = this.instanceIds;
    result["diff"].instanceCount = this.instanceCount;
    result["diff"].fieldsWithChildren = this.fieldsWithChildren;
    result["diff"].objectives = this.objectives;

    var jointInstance = {};
    jointInstance["id"] = "Common Value";
    
    for (var i = 0; i < this.fields.length; i++)
    {
        var field = this.fields[i];
        var same = true;
        var pivot = null;
                
        for (var j = 0; j < this.instanceCount; j++)
        {
            if (!pivot)
            {
                pivot = this.matrix[j][field.path];
            }
            else
            {
                if (this.matrix[j][field.path] != pivot)
                {
                    same = false;
                    break;
                }
            }
        }
        
        if (same)
        {
            result["common"].fields.push(field);
            jointInstance[field.path] = pivot;
        }
        else
        {
            result["diff"].fields.push(field);
        }
    }

    result["common"].matrix.push(jointInstance);

    for (var i = 0; i < this.instanceCount; i++)
    {
        var row = {"id" : this.matrix[i]["id"]};
        for (var j = 0; j < result["diff"].fields.length; j++)
        {
            row[result["diff"].fields[j].path] = this.matrix[i][result["diff"].fields[j].path];
        }
        result["diff"].matrix.push(row);
    }

    return result;
});
/*
DataTable.method("getMissingProductsInCommonData", function(commonData, productList)
{
    var commonProducts = new Array();

//    if (this.products.length <= 1)
//        return result; // the task is not meaningful
    
    
    for (var j = 0; j < this.products.length; j++)
    {
        var goes = true;
        for (var i = 0; i < commonData.features.length; i++)
        {
            for (var k = 0; k < this.features.length; k++)
            {
                if (commonData.features[i] == this.features[k])
                {
                    if (this.matrix[k][j] != commonData.matrix[i][0])
                    {
                        goes = false;
                        break;
                    }
                }
            }
        }
        
        if (goes)
            commonProducts.push(this.products[j]);
    }

    var commonSet = commonProducts; 
    
    if (productList.length == 0)
        return;
    
//    alert(productList);
    
    var baseSet = productList;
    var missingSet = commonSet.diff(baseSet);

//    var missingSet = commonSet.difference(baseSet); // subtract what we have from what we get    
    if (missingSet.length == 0)
        return new Array();
        
    var result = missingSet;
    
    return result;
});
*/