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

function DataTable () 
{
    this.clear();
}

DataTable.method("clear", function(){
    this.matrix = new Array();   // matrix
    this.products = new Array(); // product labels
    this.features = new Array(); // features
    this.title = "";                 // instance super clafer
    this.instanceCount = 0;
});

DataTable.method("loadFromXML", function(instanceProcessor, abstractClaferTree)
{
    this.clear();
    this.instanceCount = instanceProcessor.getInstanceCount();
    var parent = null;
    var current = abstractClaferTree;
    abstractClaferOutput = new Array();

    this.traverse(current, -1, []);
    output = abstractClaferOutput;
    
    this.title = output[0].displayWithMargins;
    
    for (var j = 1; j <= this.instanceCount; j++)
    {
        this.products.push(String(j));
    }
    
    for (var i = 1; i < output.length; i++)
    {
        var currentMatrixRow = new Array();
        
        feature = new Object();
        feature.title = output[i].displayWithMargins;
        feature.path = output[i].claferPath.join("-");
        feature.id = output[i].claferId;
        feature.type = output[i].type;
        feature.card = output[i].card;
        feature.em = null; // null means not effectively mandatory, else it has the common value for all the instances

        var emCheckComplete = false;

        for (var j = 1; j <= this.instanceCount; j++)
        {
            sVal = instanceProcessor.getFeatureValue(j, output[i].claferPath, output[i].type);
            currentMatrixRow.push(sVal);

            /* check for effective mandatory features */
            if (!emCheckComplete)
            {
                if (feature.em === null)
                {
                    feature.em = sVal;
                }
                else
                {
                    if (feature.em !== sVal)
                    {
                        feature.em = null;
                        emCheckComplete = true;
                    }
                }
            }
        }

        this.features.push(feature);        
        this.matrix.push(currentMatrixRow);        
    }

    return this;

});


//input: node in clafer tree, level in tree
//output: object with unique clafer id, id for display and, display id with indentation
DataTable.method("collector", function(clafer, spaceCount, path)
{
    var unit = new Object();
    unit.claferId = clafer.claferId;
    unit.displayId = clafer.displayId;
    unit.claferPath = path.slice(0); // cloning an array
    clafer.path = unit.claferPath; // NOT GOOD assignmend. TODO: make it better
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

    abstractClaferOutput.push(unit);
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



DataTable.method("subsetByProducts", function(arrayProducts)
{
    var result = new DataTable();
    
    var marked = new Array();
    var newProducts = new Array;
    
    for (var i = 0; i < this.products.length; i++)
    {
        var found = false;
        for (var j = 0; j < arrayProducts.length; j++)
        {
            if (arrayProducts[j] == this.products[i])
            {
                found = true;
                break;
            }
        }

        marked.push(found);
        if (found)
        {
            newProducts.push(this.products[i]);
        }
    }
    
    var newMatrix = new Array();
    
    for (var i = 0; i < this.features.length; i++)
    {
        var newMatrixRow = new Array();
        var denyAddContextRow = false;
        
        for (var j = 0; j < this.products.length; j++)
        {
            if (marked[j])
            {
                var sVal = this.matrix[i][j];
                newMatrixRow.push(sVal);
            }
        }
        
        newMatrix.push(newMatrixRow);
    }
    
    result.features = this.features;
    result.products = newProducts;    
    result.matrix = newMatrix;
    result.title = this.title;

    return result;
});

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
        
        for (var j = 0; j < this.products.length; j++)
        {
            var sVal = this.matrix[i][j];
            newMatrixRow.push(sVal);
        }
        
        newMatrix.push(newMatrixRow);
    }
    
    result.features = newFeatures;
    result.products = this.products;    
    result.matrix = newMatrix;
    result.title = this.title;    
    
    return result;

});

DataTable.method("makeAggregatedFeature", function(s)
{
    return s + " (mean)";
});


DataTable.method("getCommon", function(needAggregate)
{
    var result = new DataTable();

    if (this.products.length <= 1)
        return result; // the task is not meaningful

    result.title = "Commonalities";
    var jointProductName = "Value";
    result.products.push(jointProductName);
    
    for (var i = 0; i < this.features.length; i++)
    {
        var same = true;
        var pivot = this.matrix[i][0];
        var isNumber = isNumeric(pivot) && needAggregate;
        
        
        var aggregator;
        
        if (isNumber)
        {
            aggregator = 0;
        }
        
        for (var j = 0; j < this.products.length; j++)
        {
            if (isNumber)
                aggregator += parseInt(this.matrix[i][j]);
                
            if (this.matrix[i][j] != pivot)
            {
                same = false;
                if (!isNumber)
                    break;
            }
        }
        
        if (same)
        {
            result.features.push(this.features[i]);
            var tempAr = new Array();
            tempAr.push(pivot);
            result.matrix.push(tempAr);
        }
        else
        {
            if (isNumber)
            {/*
                aggregator = aggregator / this.products.length;
                result.features.push(this.makeAggregatedFeature(this.features[i]));
                var tempAr = new Array();
                tempAr.push(Math.round(aggregator * 100) / 100);
                result.matrix.push(tempAr);*/
            }   
        }
    }

    return result;
});

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


