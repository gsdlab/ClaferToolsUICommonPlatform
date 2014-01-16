//====================================================
// Libraries and misc functions
//====================================================
var fs = require("fs");
var http = require("http");
var core = require("./core_lib");
var config = require("./../config.json");
var includes = require("./../includes.json");
var formatConfig = require('./../Formats/formats.json');
var spawn = require('child_process').spawn;    
var ROOT = __dirname.substring(0, __dirname.length - "/commons".length);

var getMainHTML = function()
{
	var contents = fs.readFileSync("commons/Client/app.html");

    var scripts = new Array();
    var styles = new Array();
    var urlRegExp = /^http[s]?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;

    for (var i = 0; i < includes.scripts.length; i++)
    {
    	var prefix;
    	if (urlRegExp.test(includes.scripts[i]))
    	{
    		prefix = '';
    	}
    	else
    		prefix = '/Client/';

    	scripts.push('<script type="text/javascript" src="' + prefix + includes.scripts[i] + '"></script>');
    }

    for (var i = 0; i < includes.styles.length; i++)
    {
    	var prefix;
    	if (urlRegExp.test(includes.styles[i]))
    	{
    		prefix = '';
    	}
    	else
    		prefix = '/Client/';

    	styles.push('<link rel="stylesheet" type="text/css" href="' + prefix + includes.styles[i] + '"/>');
    }

    var replacementMap = [
            {
                "needle": "$title$", 
                "replacement": config.pageTitle
            },
			{
                "needle": "$scripts$", 
                "replacement": scripts.join("\n")
            },
			{
                "needle": "$styles$", 
                "replacement": styles.join("\n")
            }                                    
        ];

    contents = core.replaceTemplate(contents.toString(), replacementMap);

    return contents;
}

var handleUploads = function(req, res, next, finalCallback)
	{

		core.logSpecific("---Upload request initiated.", req.body.windowKey);

	    var key = req.body.windowKey;
	    var fileTextContents = req.body.claferText;
	    var currentURL = "";
	    var urlFile = false; // the file is passed via URL 

	    var uploadedFilePath = "";
	    
		//check if client has either a file directly uploaded or a url location of a file
	   	
	    if (req.body.exampleFlag == "1")
	    {
	        if (req.body.exampleURL !== undefined && req.body.exampleURL !== "") // if example submitted
	        {
	            core.logSpecific(req.headers.host, req.body.windowKey);
	            currentURL = "http://" + req.headers.host + "/Examples/" + req.body.exampleURL;                
	        }
	        else
	        {
	            core.logSpecific("No example submitted. Returning...", req.body.windowKey);
	            res.writeHead(200, { "Content-Type": "text/html"});
	            res.end("no clafer file submitted");
	            return;
	        }		
		} 
	    else if (req.body.exampleFlag == "0")
	    {    
	        // first, check for the URL clafer file name. It happens only on clafer file submit, not the example file submit
	        var found = false;

	        if (req.body.claferFileURL != "")
	        {
	            currentURL = req.body.claferFileURL;
	            found = true;
	            urlFile = true;
	        }
	    
	        if (!found) // if no URL was submitted
	        {
	            // then we have a series of checks, whether the file is submitted, exists, and non-empty
	            if (!req.files.claferFile)
	            {
	                core.logSpecific("No clafer file submitted. Returning...", req.body.windowKey);
	                res.writeHead(200, { "Content-Type": "text/html"});
	                res.end("no clafer file submitted");
	                return;        
	            }
	        
	            uploadedFilePath = req.files.claferFile.path;
	            if (!fs.existsSync(uploadedFilePath))
	            {
	                core.logSpecific("No Clafer file submitted. Returning...", req.body.windowKey);
	                res.writeHead(200, { "Content-Type": "text/html"});
	                res.end("no clafer file submitted");
	                return;
	            }
	            var pre_content = fs.readFileSync(uploadedFilePath);
	            if (pre_content.length == 0)
	            {
	                core.logSpecific("No Clafer file submitted. Returning...", req.body.windowKey);
	                res.writeHead(200, { "Content-Type": "text/html"});
	                res.end("no clafer file submitted");
	                return;
	            }        
	        }
		}
	    else // (req.body.exampleFlag == "2") submitted a text
	    {    
	        var i = 0;
	        uploadedFilePath = req.body.windowKey;
	        uploadedFilePath = uploadedFilePath.replace(/[\/\\]/g, "");
	        uploadedFilePath = ROOT + "/uploads/" + uploadedFilePath;
	        while(fs.existsSync(uploadedFilePath + i.toString() + req.body.fileExt)){
	            i = i+1;
	        }
	        uploadedFilePath = uploadedFilePath + i.toString() + req.body.fileExt;
	        
	        core.logSpecific('Creating a file with the contents...', req.body.windowKey);

	        core.logSpecific(fileTextContents, req.body.windowKey);

	        fs.writeFile(uploadedFilePath, fileTextContents, function(err) {
	            if(err) {
	                core.logSpecific(err, req.body.windowKey);
	            } else {
	                core.logSpecific("The file was saved to ./uploads", req.body.windowKey);
	                moveUploadedFile(req, res, next, uploadedFilePath, urlFile, finalCallback);
	            }
	        });

	    }
	    
	/* downloading the file, if required */ 

	    if (currentURL != "")
	    {
	        var i = 0;
	        uploadedFilePath = req.body.windowKey;
	        uploadedFilePath = uploadedFilePath.replace(/[\/\\]/g, "");
	        uploadedFilePath = ROOT + "/uploads/" + uploadedFilePath;
	        while(fs.existsSync(uploadedFilePath + i.toString() + req.body.fileExt)){
	            i = i+1;
	        }
	        uploadedFilePath = uploadedFilePath + i.toString() + req.body.fileExt;
	        
	        core.logSpecific('Downloading file at "' + currentURL + '"...', req.body.windowKey);
	        var file = fs.createWriteStream(uploadedFilePath);
	        http.get(currentURL, function(httpRes){
	            httpRes.on('data', function (data) {
	                file.write(data);
	            }).on('end', function(){
	                file.end();
	                core.logSpecific("File downloaded to ./uploads", req.body.windowKey);
	                moveUploadedFile(req, res, next, uploadedFilePath, urlFile, finalCallback);
	            });
	        });
	    }
	    else
	    {
	        if (req.body.exampleFlag != "2") 
	        	moveUploadedFile(req, res, next, uploadedFilePath, urlFile, finalCallback);
	    }
	};

var moveUploadedFile = function (req, res, next, uploadedFilePath, urlFile, callback)
	{                    
	    var i = 0;
	    while(fs.existsSync("./uploads/" + i + "tempfolder/")){
	        i++;
	    }
	    core.logSpecific("Uploaded file: " + uploadedFilePath, req.body.windowKey);
	    var pathTokens = "." + uploadedFilePath.split("Server")[1];
	    core.logSpecific("Partial path: " + pathTokens, req.body.windowKey);
	    
	    var pathTokensLinux = pathTokens.split("/");
	    var pathTokensWindows = pathTokens.split("\\");
	    
	    if (pathTokensWindows.length > pathTokensLinux.length)
	        pathTokens = pathTokensWindows;
	    else    
	        pathTokens = pathTokensLinux;
	    
	    core.logSpecific('Path tokens: "' + pathTokens.join('; ') + '"', req.body.windowKey);
	    var oldPath = uploadedFilePath;
	    uploadedFilePath = ROOT + "/" + pathTokens[1] + "/" + i + "tempfolder/"; // this slash will work anyways
	    fs.mkdir(uploadedFilePath, function (err){
	        if (err) throw err;
	        var uploadedFileDir = uploadedFilePath;
	        uploadedFilePath += pathTokens[2];
	        uploadedFilePath = uploadedFilePath.substring(0, uploadedFilePath.length - 4); // to remove the extention

	        fs.rename(oldPath, uploadedFilePath + req.body.fileExt, function (err){
	            if (err) throw err;
	            core.logSpecific("Proceeding with " + uploadedFilePath, req.body.windowKey);
	            callback(uploadedFilePath, uploadedFileDir, urlFile);
	        });
	    });
	};


var runClaferCompiler = function(key, specifiedArgs, genericArgs, onComplete)
{
    var formatModeArgs = [];
    var process = core.getProcess(key);

    process.compiler_args = genericArgs.concat(specifiedArgs).join(" ").replace(process.file, "file") + " {mode args}";

    for (var i = 1; i < formatConfig.formats.length; i++)
        // we skip the default source .CFR format, since it's already there
    {
        formatModeArgs.push("-m");
        formatModeArgs.push(formatConfig.formats[i].compiler_mode);
        formatModeArgs = formatModeArgs.concat(formatConfig.formats[i].compiler_args);
    }

    var finalArgs = genericArgs.concat(specifiedArgs).concat(formatModeArgs);

    process.clafer_compiler = spawn("clafer", finalArgs);

    process.compiled_formats = new Array();
    process.compiler_message = "";

    process.clafer_compiler.stdout.on("data", function (data)
    {
        var process = core.getProcess(key);
        if (process != null)
        {                    
            process.compiler_message += data;
        }
    });

    process.clafer_compiler.stderr.on("data", function (data)
    {
        var process = core.getProcess(key);
        if (process != null)
        {
            process.compiler_message += data;
        }
    });
    
    process.clafer_compiler.on('close', function (code)
    {	
        var process = core.getProcess(key);
        if (process != null)
        {
            process.clafer_compiler = null;

            if (code != 0) // if the result is non-zero, means compilation error
            {
                core.logSpecific("CC: Non-zero Return Value", key);
                process.compiler_result = '{"message": "' + core.escapeJSON("Error: Compilation Error") + '"}';
                process.compiler_code = 1;
            }
            else
            {
                core.logSpecific("CC: Zero Return Value", key);
                process.compiler_result = '{"message": "' + core.escapeJSON("Success") + '"}';
                process.compiler_code = 0;
            }


            // it makes sense to get the compiled files for the models (e.g., HTML) 
            // that may show syntax errors

            var formats_for_process = [];

            for (var j = 0; j < formatConfig.formats.length; j++)
            {
                var format = new Object();
                format.id = formatConfig.formats[j].id;
                format.file_suffix = formatConfig.formats[j].file_suffix;
                format.display_element = formatConfig.formats[j].display_element;
                format.shows_compilation_errors = formatConfig.formats[j].shows_compilation_errors;
                format.process = process;
                formats_for_process.push(format);
            }

            formats_for_process.forEach(function(item) 
            {
                if (item.shows_compilation_errors || (item.process.compiler_code == 0))
                {
                    fs.readFile(process.file + item.file_suffix, function (err, file_contents) 
                    {
                        var obj = new Object();
                        obj.id = item.id;
                        obj.fileSuffix = item.file_suffix;
                        obj.displayElement = item.display_element;
                        if (err) // error reading HTML, maybe it is not really present, means a fatal compilation error
                        {
                            core.logSpecific('ERROR: Cannot read the compiled file.', key);
                            obj.message = "compile_error";
                            obj.result = "";
                        }
                        else
                        {
                            obj.message = "OK";
                            obj.result = file_contents.toString();
                        }

                        item.process.compiled_formats.push(obj);

                        if (formats_for_process.length == item.process.compiled_formats.length)
                        {
                        	onComplete();
                        }
                    });
                }
                else 
                {
                    var obj = new Object();
                    obj.id = item.id;
                    obj.message = "compile_error";
                    obj.result = "";
                    item.process.compiled_formats.push(obj);

                    if (formats_for_process.length == item.process.compiled_formats.length)
                    {
                        onComplete();
                    }
                }
            });
        }
    });

};

var handleControlRequest = function(req, res, settings){

    core.logSpecific("Control: Enter", req.body.windowKey);

    var isError = true;
    var resultMessage;

    var process = core.getProcess(req.body.windowKey);
    if (process == null)
    {
        res.writeHead(400, { "Content-Type": "text/html"});
        res.end("process_not_found");               
        return;
    }

    if (req.body.operation == "run") // "Run" operation
    {
        core.logSpecific("Control: Run", req.body.windowKey);

        var backendId = req.body.backend;
        core.logSpecific("Backend: " + backendId, req.body.windowKey);
        if (process.mode != "ig")
        {
            core.logSpecific("Error: Not compiled yet", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: The mode is not IG: the compilation is still running");        
            return;
        }
        else
        {
            core.timeoutProcessClearInactivity(process); // reset the inactivity timeout

            // looking for a backend
            var backend = core.getBackend(backendId);
            if (!backend)
            {
                core.logSpecific("Error: Backend was not found", req.body.windowKey);
                res.writeHead(400, { "Content-Type": "text/html"});
                res.end("Error: Could not find the backend by its submitted id.");
                return;
            }

            // looking for a format
            var format = core.getFormat(backend.accepted_format);
            if (!format)
            {
                core.logSpecific("Error: Required format was not found", req.body.windowKey);
                resultMessage = "Error: Could not find the required file format.";
                isError = true;
                return;
            }

            core.logSpecific(backend.id + " ==> " + format.id, req.body.windowKey);
            process.mode_completed = false;

            var fileAndPathReplacement = [
                    {
                        "needle": "$dirname$", 
                        "replacement": __dirname + "/Backends"
                    },
                    {
                        "needle": "$filepath$", 
                        "replacement": process.file + format.file_suffix
                    }
                ];

            var args = core.replaceTemplateList(backend.tool_args, fileAndPathReplacement);

            if (backend.tool_args_forward_from_compiler) // so far forwarding only ss
            {
                args.push(process.ss);
            }

            core.logSpecific(args, req.body.windowKey);
            
            process.tool = spawn(core.replaceTemplate(backend.tool, fileAndPathReplacement), args);

            process.tool.on('error', function (err){
                core.logSpecific('ERROR: Cannot run the chosen instance generator. Please check whether it is installed and accessible.', req.body.windowKey);
                var process = core.getProcess(req.body.windowKey);
                if (process != null)
                {
                    process.result = '{"message": "' + lib.escapeJSON("Error: Cannot run instance generator") + '"}';
                    process.completed = true;
                    process.tool = null;
                }
            });

            process.tool.stdout.on("data", function(data) {
                settings.onData(data);
            });

            process.tool.stderr.on("data", function(data) {
                settings.onError(data);
            });

            process.tool.on("close", function (code)
            {
                var process = core.getProcess(req.body.windowKey);
                if (process != null)
                {
                    process.mode_completed = true;
                    process.tool = null;
                }                
            });


            // if the backend supports production of the scope file, then send this command
            // the command will be handled after the initial processing in any case


            if (backend.scope_options.produce_scope_file)
            {
                process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
                process.producedScopes = false;
            }
            else
            {
                process.producedScopes = true;
            }

            res.writeHead(200, { "Content-Type": "text/html"});
            res.end("started");

        }
    }
    else if (req.body.operation == "stop") // "Stop" operation
    {
        core.logSpecific("Control: Stop", req.body.windowKey);
        process.toKill = true;
        process.mode_completed = true;
        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("stopped");
    }
    else if (req.body.operation == "setDefaultScope") // "Set Global Scope" operation
    {
        core.logSpecific("Control: setDefaultScope", req.body.windowKey);

        // looking for a backend
        var backend = core.getBackend(req.body.backend);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.set_default_scope.command, replacements);
        process.tool.stdin.write(command);
            
        if (backend.scope_options.produce_scope_file)
        {
            process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
            process.producedScopes = false;
        }
        else
        {
            process.producedScopes = true;
        }

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("default_scope_set");
    }
    else if (req.body.operation == "incAllScopes") // "Inc all scopes" operation
    {
        core.logSpecific("Control: incAllScopes", req.body.windowKey);

        // looking for a backend
        var backend = core.getBackend(req.body.backend);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.inc_all_scopes.command, replacements);
        process.tool.stdin.write(command);
            
        if (backend.scope_options.produce_scope_file)
        {
            process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
            process.producedScopes = false;
        }
        else
        {
            process.producedScopes = true;
        }

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("all_scopes_increased");
    }
    else if (req.body.operation == "setIndividualScope") // "Set Clafer Scope" operation
    {
        core.logSpecific("Control: setIndividualScope", req.body.windowKey);

        // looking for a backend
        var backend = core.getBackend(req.body.backend);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1 + " " + req.body.operation_arg2, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$clafer$", 
                    "replacement": req.body.operation_arg2
                },
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.set_individual_scope.command, replacements);
        process.tool.stdin.write(command);
            
        if (backend.scope_options.produce_scope_file)
        {
            process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
            process.producedScopes = false;
        }
        else
        {
            process.producedScopes = true;
        }

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("individual_scope_set");
    }
    else if (req.body.operation == "incIndividualScope") // "Inc Clafer Scope" operation
    {
        core.logSpecific("Control: incIndividualScope", req.body.windowKey);

        // looking for a backend
        var backend = core.getBackend(req.body.backend);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1 + " " + req.body.operation_arg2, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$clafer$", 
                    "replacement": req.body.operation_arg2
                },
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.inc_individual_scope.command, replacements);
        process.tool.stdin.write(command);
            
        if (backend.scope_options.produce_scope_file)
        {
            process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
            process.producedScopes = false;
        }
        else
        {
            process.producedScopes = true;
        }

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("individual_scope_increased");
    }
    else if (req.body.operation == "setIntScope") // "Set Integer Scope" operation
    {
        core.logSpecific("Control: setIntScope", req.body.windowKey);

        // looking for a backend
        var backend = core.getBackend(req.body.backend);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1 + " " + req.body.operation_arg2, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$low$", 
                    "replacement": req.body.operation_arg1
                },
                {
                    "needle": "$high$", 
                    "replacement": req.body.operation_arg2
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.set_int_scope.command, replacements);
        process.tool.stdin.write(command);
            
        if (backend.scope_options.produce_scope_file)
        {
            process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
            process.producedScopes = false;
        }
        else
        {
            process.producedScopes = true;
        }

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("int_scope_set");
    }
    else if (req.body.operation == "setBitwidth") // "Set Bitwidth" operation
    {
        core.logSpecific("Control: setBitwidth", req.body.windowKey);

        // looking for a backend
        var backend = core.getBackend(req.body.backend);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.set_bitwidth.command, replacements);
        process.tool.stdin.write(command);
            
        if (backend.scope_options.produce_scope_file)
        {
            process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
            process.producedScopes = false;
        }
        else
        {
            process.producedScopes = true;
        }

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("bitwidth_set");
    }
    else // else look for custom commands defined by backend config
    {
        var parts = req.body.operation.split("-");
        if (parts.length != 2)
        {
            core.logSpecific('Control: Command does not follow pattern "backend-opreration": "' + req.body.operation + '"', req.body.windowKey, req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Command does not follow the 'backend-operation' pattern.");
            return;
        }

        var backendId = parts[0]; // it does not matter how to get backendid.
        var operationId = parts[1];

        var found = false;
        var operation = null;
        // looking for a backend

        var backend = core.getBackend(backendId);
        if (!backend)
        {
            core.logSpecific("Error: Backend was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the backend by its submitted id.");
            return;
        }

        // looking for the operation
        var found = false;

        for (var j = 0; j < backend.control_buttons.length; j++)
        {
            if (backend.control_buttons[j].id == operationId)
            {
                operation = backend.control_buttons[j];
                found = true;
                break;
            }
        }

        if (!found)
        {
            core.logSpecific("Error: Required operation was not found", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Could not find the required operation.");
            return;
        }

        core.logSpecific(backend.id + " ==> " + operation.id, req.body.windowKey);

        process.tool.stdin.write(operation.command);

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("operation");
    }

};

module.exports.handleUploads = handleUploads;
module.exports.getMainHTML = getMainHTML;
module.exports.runClaferCompiler = runClaferCompiler;
module.exports.handleControlRequest = handleControlRequest;
