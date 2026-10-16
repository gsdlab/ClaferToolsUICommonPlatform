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
//====================================================
// Libraries and misc functions
//====================================================
var fs = require("fs");
var http = require("http");
var https = require("https");
var express = require("express");
var multer = require("multer");
var rateLimit = require("express-rate-limit").rateLimit;
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

var UPLOADS = ROOT + "/uploads";
core.cleanupUploads(UPLOADS);

// The size limit of submitted models and instance data, and of request bodies.
var MAX_UPLOAD_SIZE = config.maxUploadSize || 16 * 1024 * 1024;

/*
 * Sets up the common middleware of a web tool: security headers, static files, request
 * parsing with size limits, and rate limits of the requests that start processes.
 */
var configureServer = function(server)
{
    server.disable("x-powered-by");

    // e.g., "loopback" or 1 behind a reverse proxy, so that rate limits apply per client;
    // the TRUST_PROXY environment variable overrides config.json
    var trustProxy = process.env.TRUST_PROXY !== undefined ? process.env.TRUST_PROXY : config.trustProxy;
    if (trustProxy !== undefined && trustProxy !== "")
        server.set("trust proxy", /^[0-9]+$/.test(String(trustProxy)) ? parseInt(trustProxy) : trustProxy);

    server.use(function(req, res, next) {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
        res.setHeader("Content-Security-Policy", "frame-ancestors 'self'; object-src 'none'; base-uri 'self'");
        next();
    });

    // only the editor itself, not the demos and tests of ace
    server.use("/commons/Client/ace", function(req, res, next) {
        if (/^\/ace-builds\/src(-min)?(-noconflict)?\/[\w.-]+\.js$/.test(req.path))
            return next();
        res.status(404).end();
    });

    server.use("/commons/Client", express.static(ROOT + "/commons/Client"));
    server.use("/Client", express.static(ROOT + "/Client"));

    var limiter = function(limit) {
        return rateLimit({
            windowMs: 60 * 1000,
            limit: limit,
            standardHeaders: "draft-7",
            legacyHeaders: false,
            message: "Too many requests, please try again later."
        });
    };
    server.use("/upload", limiter(config.uploadsPerMinute || 30));
    server.use("/control", limiter(config.commandsPerMinute || 300));
    server.use("/poll", limiter(config.pollsPerMinute || 600));

    server.use(express.urlencoded({ extended: true, limit: MAX_UPLOAD_SIZE }));
    server.use(express.json({ limit: MAX_UPLOAD_SIZE }));
    server.use(multer({
        dest: UPLOADS,
        limits: { fieldSize: MAX_UPLOAD_SIZE, fileSize: MAX_UPLOAD_SIZE, files: 1, fields: 50 }
    }).any());
    server.use(function(req, res, next) { // uploaded files by field name, e.g., req.files.claferFile.path
        var files = {};
        (req.files || []).forEach(function(file) { files[file.fieldname] = file; });
        req.files = files;
        next();
    });
};

// Responds to errors without the details, which are only logged.
var addErrorHandler = function(server)
{
    server.use(function(err, req, res, next) {
        core.logSpecific("Request error: " + (err && err.stack || err), null);
        if (res.headersSent)
            return next(err);

        var status = err.status || err.statusCode || (err.code && /^LIMIT_/.test(err.code) ? 413 : 500);
        res.status(status >= 400 && status < 600 ? status : 500);
        res.type("text/plain");
        res.end(status == 413 ? "The request is too large" : "The request could not be processed");
    });
};

// Session keys are generated by the client; they are used in logs and to find the session.
var WINDOW_KEY = /^[A-Za-z0-9-]{1,64}$/;

// The extensions of the files that the clients submit: models and instance data.
var FILE_EXTENSIONS = [".cfr", ".data"];

// Prefixes of the URLs from which models can be loaded via ?claferFileURL=..., for example
// the ClaferWiki URLs "http://<wiki host>:<port>/clafer/". Loading models from URLs is
// disabled when the list is empty.
// The ALLOWED_MODEL_URLS environment variable (prefixes separated by spaces) overrides config.json.
var ALLOWED_MODEL_URLS = process.env.ALLOWED_MODEL_URLS !== undefined
    ? process.env.ALLOWED_MODEL_URLS.split(/\s+/).filter(function(url) { return url !== ""; })
    : (config.allowedModelURLs || []);


var badRequest = function(res, message, key)
{
    core.logSpecific("Rejected: " + message, WINDOW_KEY.test(key) ? key : null);
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(message);
};

var isAllowedModelURL = function(url)
{
    if (!/^https?:\/\//.test(url))
        return false;

    return ALLOWED_MODEL_URLS.some(function(prefix) {
        return url.indexOf(prefix) === 0;
    });
};

// Downloads a model from an allowed URL; calls back with an error message or the contents.
var downloadModel = function(url, callback)
{
    var client = url.indexOf("https:") === 0 ? https : http;
    var done = false;
    var finish = function(err, contents)
    {
        if (!done)
        {
            done = true;
            callback(err, contents);
        }
    };

    var request = client.get(url, { timeout: 10000 }, function(response) {
        if (response.statusCode != 200)
        {
            response.resume();
            return finish("Could not load the model: HTTP status " + response.statusCode);
        }

        var chunks = [];
        var size = 0;
        response.on("data", function(chunk) {
            size += chunk.length;
            if (size > MAX_UPLOAD_SIZE)
            {
                request.destroy();
                return finish("Could not load the model: it is too large");
            }
            chunks.push(chunk);
        });
        response.on("end", function() {
            finish(null, Buffer.concat(chunks));
        });
        response.on("error", function() {
            finish("Could not load the model");
        });
    });

    request.on("timeout", function() {
        request.destroy();
        finish("Could not load the model: the request timed out");
    });
    request.on("error", function() {
        finish("Could not load the model");
    });
};

// Reads an example shipped with the tool, by its file name.
var readExample = function(name, callback)
{
    var examples = ROOT + "/Examples";
    fs.readdir(examples, function(err, files) {
        if (err || name.charAt(0) == "." || files.indexOf(name) < 0)
            return callback("Unknown example");

        fs.readFile(examples + "/" + name, function(err, contents) {
            callback(err ? "Could not read the example" : null, contents);
        });
    });
};

/*
 * Handles the submission of a model: an uploaded file, an example, a model from a URL,
 * or the text from the editor. The model is stored in the session's folder and the
 * session is passed to finalCallback.
 */
var handleUploads = function(req, res, next, finalCallback, reuseEnabled)
{
    var key = req.body.windowKey;
    var fileExt = req.body.fileExt;

    // multer stores every uploaded file; keep only the submitted model file
    var file = req.body.exampleFlag == "0" && req.files ? req.files.claferFile : null;
    var discard = function(f) { if (f && f.path) fs.unlink(f.path, function() {}); };
    Object.keys(req.files || {}).forEach(function(field) {
        if (req.files[field] !== file)
            discard(req.files[field]);
    });

    if (typeof key !== "string" || !WINDOW_KEY.test(key))
    {
        discard(file);
        return badRequest(res, "Invalid session key", null);
    }

    if (FILE_EXTENSIONS.indexOf(fileExt) < 0)
    {
        discard(file);
        return badRequest(res, "Invalid file extension", key);
    }

    core.logSpecific("---Upload request initiated.", key);

    var store = function(err, contents, urlFile)
    {
        if (err)
            return badRequest(res, err, key);

        if (contents.length > MAX_UPLOAD_SIZE)
            return badRequest(res, "The model is too large", key);

        storeModel(req, res, contents, urlFile, finalCallback, reuseEnabled);
    };

    var noFile = function()
    {
        core.logSpecific("No clafer file submitted. Returning...", key);
        res.writeHead(200, { "Content-Type": "text/plain"});
        res.end("no clafer file submitted");
    };

    if (req.body.exampleFlag == "1") // an example
    {
        var exampleURL = req.body.exampleURL;
        if (typeof exampleURL !== "string" || exampleURL === "")
            return noFile();

        readExample(exampleURL, function(err, contents) { store(err, contents, false); });
    }
    else if (req.body.exampleFlag == "0") // a file or a URL
    {
        var claferFileURL = req.body.claferFileURL;
        if (typeof claferFileURL === "string" && claferFileURL !== "")
        {
            discard(file);
            if (!isAllowedModelURL(claferFileURL))
                return badRequest(res, "Loading models from this URL is not allowed", key);

            core.logSpecific('Downloading file at "' + claferFileURL + '"...', key);
            downloadModel(claferFileURL, function(err, contents) { store(err, contents, true); });
            return;
        }

        if (!file || !file.size)
        {
            discard(file);
            return noFile();
        }

        fs.readFile(file.path, function(err, contents) {
            discard(file);
            store(err ? "Could not read the uploaded file" : null, contents, false);
        });
    }
    else // the text from the editor
    {
        var text = req.body.claferText;
        store(typeof text === "string" ? null : "No model submitted", Buffer.from(text || ""), false);
    }
};

// Writes the model into the session's folder: a new folder for a new session, or the
// folder of the existing session when it is reused (e.g., on reload).
var storeModel = function(req, res, contents, urlFile, callback, reuseEnabled)
{
    var key = req.body.windowKey;
    var fileExt = req.body.fileExt;
    var existingProcess = core.getProcess(key);

    var failed = function(err)
    {
        core.logSpecific("Could not store the model: " + err, key);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Could not store the model");
    };

    if (existingProcess && (reuseEnabled === true))
    {
        fs.writeFile(existingProcess.file + fileExt, contents, function (err) {
            if (err)
                return failed(err);
            core.logSpecific("Proceeding with existing session file " + existingProcess.file, key);
            existingProcess.urlFile = urlFile;
            callback(core.resetProcessToCompilerMode(existingProcess));
        });
        return;
    }

    if (!core.canAddProcess(key))
    {
        core.logSpecific("Rejected: too many sessions", key);
        res.writeHead(503, { "Content-Type": "text/plain" });
        res.end("The server is busy, please try again later");
        return;
    }

    fs.mkdtemp(UPLOADS + "/session-", function (err, folder) {
        if (err)
            return failed(err);

        var file = folder + "/model";
        fs.writeFile(file + fileExt, contents, function (err) {
            if (err)
                return failed(err);
            core.logSpecific("Proceeding with a new session file " + file, key);
            callback(core.addProcess({
                windowKey: key,
                folder: folder,
                urlFile: urlFile,
                file: file}));
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

    process.clafer_compiler.on("error", function (err)
    {
        core.logSpecific("ERROR: Cannot run the Clafer compiler: " + err.message, key);
    });

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

// Whether the compiled model is a temporal (behavioral) Clafer model. Instance generation
// and optimization support only static models; clafer reports temporal models when it
// cannot produce the Choco output.
var isTemporalModel = function(process)
{
    return process.compiler_message.indexOf("because the model contains temporal operators") >= 0;
}

var temporalModelMessage = "Temporal Clafer models are not supported: instance generation and optimization work only with static models. You can edit temporal models in ClaferIDE.";

var produceScopes = function(process, backend)
{
    if (backend.scope_options.produce_scope_file)
    {
        try
        {
            if (process.tool && process.tool.stdin && !process.mode_completed)
                process.tool.stdin.write(backend.scope_options.produce_scope_file.command);
        }
        catch(e)
        {
            console.logSpecific("Error: Could not write produceScopes command. Please report this error.", process.windowKey);
        }
        
        process.producedScopes = false;
    }
    else
    {
        process.producedScopes = true;
    }
};

var writeCommand = function(process, command)
{
    try
    {
        if (process.tool)
            process.tool.stdin.write(command);
    }
    catch(e)
    {
        core.logSpecific("Error: Could not write the command '" + command + "'. Please report this error.", process.windowKey);
    }
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
        return false;
    }

    // the values end up in the instance generator's arguments and commands
    var integers = [req.body.intHighScopeValue, req.body.defaultScopeValue, req.body.allScopesDelta, req.body.operation_arg1];
    if (!integers.every(core.isOptionalInteger)
        || (req.body.operation_arg2 !== undefined && !core.isCommandValue(req.body.operation_arg2))
        || !core.isCommandValue(req.body.operation))
    {
        core.logSpecific("Rejected: invalid control values", req.body.windowKey);
        res.writeHead(400, { "Content-Type": "text/plain"});
        res.end("Error: Invalid values.");
        return false;
    }

    process.mode = "ig"; // we are running the IG.

    if (req.body.operation == "run") // "Run" operation
    {
        core.logSpecific("Control: Run", req.body.windowKey);

        var backendId = req.body.backend;
        core.logSpecific("Backend: " + backendId, req.body.windowKey);
/*
    never happens actually, the UI denies this case
    moreover, the ig would throw an error if something is not compiled yet

        if (process.mode != "ig")
        {
            core.logSpecific("Error: Not compiled yet", req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: The mode is not IG: the compilation is still running");        
            return false;
        }
        else
        {
*/            
            core.timeoutProcessClearInactivity(process); // reset the inactivity timeout

            // looking for a backend
            var backend = core.getBackend(backendId);
            if (!backend)
            {
                core.logSpecific("Error: Backend was not found", req.body.windowKey);
                res.writeHead(400, { "Content-Type": "text/html"});
                res.end("Error: Could not find the backend by its submitted id.");
                return false;
            }

            // looking for a format
            var format = core.getFormat(backend.accepted_format);
            if (!format)
            {
                core.logSpecific("Error: Required format was not found", req.body.windowKey);
                resultMessage = "Error: Could not find the required file format.";
                isError = true;
                return false;
            }

            core.logSpecific(backend.id + " ==> " + format.id, req.body.windowKey);
            process.mode_completed = false;

            var fileAndPathReplacement = [
                    {
                        "needle": "$dirname$", 
                        "replacement": ROOT + "/Backends"
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

            if (backend.scope_options && backend.scope_options.set_int_scope && backend.scope_options.set_int_scope.argument) 
            {
                var replacement = [
                    {
                        "needle": "$value$", 
                        "replacement": req.body.intHighScopeValue
                    }
                ];

                var intArg = core.replaceTemplate(backend.scope_options.set_int_scope.argument, replacement);

                args.push(intArg);
            }

            if (backend.scope_options && backend.scope_options.set_default_scope && backend.scope_options.set_default_scope.argument) 
            {
                var replacement = [
                    {
                        "needle": "$value$", 
                        "replacement": req.body.defaultScopeValue
                    }
                ];

                var intArg = core.replaceTemplate(backend.scope_options.set_default_scope.argument, replacement);

                args.push(intArg);
            }

            if (backend.scope_options && backend.scope_options.inc_all_scopes && backend.scope_options.inc_all_scopes.argument) 
            {
                var replacement = [
                    {
                        "needle": "$value$", 
                        "replacement": req.body.allScopesDelta
                    }
                ];

                var intArg = core.replaceTemplate(backend.scope_options.inc_all_scopes.argument, replacement);

                args.push(intArg);
            }


            var toolPath = core.replaceTemplate(backend.tool, fileAndPathReplacement);

            core.logSpecific(args, req.body.windowKey);
            process.ig_args = toolPath.replace(ROOT, "") + " " + args.join(" ").replace(process.file, "file").replace(ROOT, "");
            
            process.ig_just_started = true;
            process.producedScopes = true;

            process.tool = spawn(toolPath, args);

            // writing a command after the tool exited fails asynchronously (EPIPE)
            process.tool.stdin.on('error', function (err){
                core.logSpecific('Could not send a command to the instance generator: ' + err.message, req.body.windowKey);
            });

            process.tool.on('error', function (err){
                core.logSpecific('ERROR: Cannot run the chosen instance generator. Please check whether it is installed and accessible.', req.body.windowKey);
                var process = core.getProcess(req.body.windowKey);
                if (process != null)
                {
                    process.result = '{"message": "' + core.escapeJSON("Error: Cannot run instance generator") + '"}';
                    process.completed = true;
                    process.tool = null;
                }
            });

            process.tool.stdout.on("data", function(data) {
                settings.onData(data, backend);
            });

            process.tool.stderr.on("data", function(data) {
                settings.onError(data, backend);
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

            res.writeHead(200, { "Content-Type": "text/html"});
            res.end("started");

//        }
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
            return false;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.set_default_scope.command, replacements);
        writeCommand(process, command);
        produceScopes(process, backend);

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
            return false;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.inc_all_scopes.command, replacements);
        writeCommand(process, command);
        produceScopes(process, backend);

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
            return false;
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
        writeCommand(process, command);
        produceScopes(process, backend);

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
            return false;
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
        writeCommand(process, command);
        produceScopes(process, backend);

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
            return false;
        }

        core.logSpecific(backend.id + " " + req.body.operation_arg1, req.body.windowKey);

        var replacements = [
                {
                    "needle": "$value$", 
                    "replacement": req.body.operation_arg1
                }
            ];

        var command = core.replaceTemplate(backend.scope_options.set_int_scope.command, replacements);
        writeCommand(process, command);
        produceScopes(process, backend);

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end("int_scope_set");
    }
    else // else look for custom commands defined by backend config
    {
        var parts = req.body.operation.split("-");
        if (parts.length != 2)
        {
            core.logSpecific('Control: Command does not follow pattern "backend-opreration": "' + req.body.operation + '"', req.body.windowKey, req.body.windowKey);
            res.writeHead(400, { "Content-Type": "text/html"});
            res.end("Error: Command does not follow the 'backend-operation' pattern.");
            return false;
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
            return false;
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
            return false;
        }

        core.logSpecific(backend.id + " ==> " + operation.id, req.body.windowKey);
        writeCommand(process, operation.command);

        res.writeHead(200, { "Content-Type": "text/html"});
        res.end(operation.id);
    }

    return true;

};

module.exports.handleUploads = handleUploads;
module.exports.configureServer = configureServer;
module.exports.addErrorHandler = addErrorHandler;
module.exports.getMainHTML = getMainHTML;
module.exports.runClaferCompiler = runClaferCompiler;
module.exports.handleControlRequest = handleControlRequest;
module.exports.produceScopes = produceScopes;
module.exports.writeCommand = writeCommand;
module.exports.isTemporalModel = isTemporalModel;
module.exports.temporalModelMessage = temporalModelMessage;