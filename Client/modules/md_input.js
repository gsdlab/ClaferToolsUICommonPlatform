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
function Input(host, settings)
{
    this.id = "mdInput";
    this.settings = settings;
    this.title = this.settings.title;

    this.requestTimeout = 60000; // what is the timeout for response after sending a file
    this.pollingTimeout = 60000;  // what is the timeout when polling
    this.pollingDelay = 700;    // how often to send requests (poll) for updates
    this.pollingTimeoutObject = null;
    this.toCancel = false;

    this.width = this.settings.layout.width;
    this.height = this.settings.layout.height;
    this.posx = this.settings.layout.posx;
    this.posy = this.settings.layout.posy;

    this.host = host;
    this.serverAction = "/upload";
    this.serverOptimizeAction = "/optimize";

    this.dataFileChosen = false;

    this.editor = null;
    this.editorWidth = this.width - 5;
    this.editorHeight = this.height - 83;

    this.resize = this.onResize.bind(this);

    if (this.settings.optimization_backend)
    {
        this.loadCounter = 2; // because 2 xmls to be loaded
    }
    else
        this.loadCounter = 1;
}

//Input.method("recalculateEditorSize", function()
//{
//    this.editorWidth = this.window.width - 5;
//    this.editorHeight = this.window.height - 83;
//});

Input.method("onInitRendered", function()
{
    this.optimizeFlag = 1;
    this.addInstancesFlag = 1;
    this.toCancel = false;

    $("#submitFile").click(this.submitFileCall.bind(this));
    $("#submitExample").click(this.submitExampleCall.bind(this));
    $("#submitText").click(this.submitTextCall.bind(this));
    $("#submitExample").attr("disabled", "disabled");

    $("#submitFile").attr("disabled", "disabled");

    $("#myform [type='file']").change(this.inputChange.bind(this));
    $("#exampleURL").change(this.exampleChange.bind(this));
    $("#loadExampleInEditor").change(this.exampleChange.bind(this));
//    $("#saveSourceButton").click(this.saveSourceCall.bind(this));

    var options = new Object();
    options.beforeSubmit = this.beginQuery.bind(this);
    options.success = this.fileSent.bind(this);
    options.error = this.handleError.bind(this);
    options.timeout = this.requestTimeout;

    $('#myform').ajaxForm(options);

    if (this.settings.optimization_backend)
    {
        $("#optimizationBackend")[0].onchange = this.onBackendChange.bind(this);
        $("#optimize")[0].onclick = this.onOptimizeChecked.bind(this);
    }


//    var options = new Object();
//    options.error = this.handleError.bind(this);
//    options.timeout = this.requestTimeout;

//    $('#optimizeForm').ajaxForm(options);


//    var optionsForFile = new Object();
//    optionsForFile.success = this.saveSourceSuccess.bind(this);
//    optionsForFile.error = this.handleError.bind(this);
//    optionsForFile.timeout = this.requestTimeout;
//    $('#saveSourceForm').ajaxForm(optionsForFile);

    this.editor = ace.edit("clafer_editor");
    this.editor.setTheme("ace/theme/eclipse");
    var ClaferMode = require("ace/mode/clafer").Mode;
    this.editor.getSession().setMode(new ClaferMode());
    this.editor.setShowPrintMargin(false);

    // $('#myform').submit(); MOVED TO another location
});

/*
 * Cancel request
 */

Input.method("cancelCall", function()
{
    $("#cancel").hide();
    $("#status_label").html("Cancelling...");
    this.toCancel = true;
});

/*
 * Shows uploader and hides the form
*/
Input.method("beginQuery", function(formData, jqForm, options) {

    if (!this.settings.onBeginQuery(this))
    {
        return false;
    }

    this.host.makeBusy(true);

    $("#load_area #myform").hide();
    $("#load_area").append('<div id="preloader"><img id="preloader_img" src="/commons/Client/images/preloader.gif" alt="Loading..."/><span id="status_label">Loading and processing...</span><button id="cancel">Cancel</button></div>');
    $("#cancel").click(this.cancelCall.bind(this));

    return true;
});

// post-submit callback
Input.method("endQuery", function()  {
    $("#preloader").remove();
    $("#load_area #myform").show();

    $("#claferFileURL").val(""); // empty the URL
    this.host.makeBusy(false);

    return true;
});

Input.method("onPoll", function(responseObject)
{
    if (!responseObject)
    {
        this.handleError(null, "empty_argument", null);
        return;
    }

    this.settings.onPoll(this, responseObject);

    if (responseObject.message == "Working")
    {
        this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay);
    }
    else // finished
    {
        this.settings.onCompleted(this, responseObject);
        this.endQuery();
    }
});

Input.method("poll", function()
{
    var options = new Object();
    options.url = "/poll";
    options.type = "post";
    options.timeout = this.pollingTimeout;
    if (!this.toCancel)
        options.data = {windowKey: this.host.key, command: "ping"};
    else
        options.data = {windowKey: this.host.key, command: "cancel"};

    options.success = this.onPoll.bind(this);
    options.error = this.handleError.bind(this);

    $.ajax(options);
});

Input.method("fileSent", function(responseText, statusText, xhr, $form)  {
    this.toCancel = false;

    if (responseText == "error")
    {
        this.handleError(null, "compile_error", null);
        return;
    }

    if (responseText != "no clafer file submitted")
    {
        this.settings.onFileSent(this);
        this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay);
    }
    else
    {
        this.endQuery(); // else enable the form anyways
//        this.setClaferModelHTML(this.host.findModule("mdCompiledFormats").lastModel);
    }
});

Input.method("handleError", function(response, statusText, xhr)  {
    clearTimeout(this.pollingTimeoutObject);
    this.endQuery();
    this.settings.onError(this, statusText, response, xhr);
});

Input.method("onSubmit", function(){
    if (this.pollingTimeoutObject)
        clearTimeout(this.pollingTimeoutObject);
});

Input.method("submitFileCall", function()
{
    $("#fileExt").val($("#fileExtFile").val());

    $("#exampleURL").val(null);
    $("#exampleFlag").val("0");
    this.onSubmit();
});

Input.method("submitExampleCall", function(){
    $("#fileExt").val($("#fileExtExample").val());
    $("#exampleFlag").val("1");
    this.onSubmit();
});

Input.method("submitTextCall", function(){
    $("#fileExt").val(this.settings.file_extensions[0].ext); // allow only clafer files
    $("#claferText").val(this.editor.getValue());
    $("#exampleFlag").val("2");
    this.onSubmit();
});


Input.method("getCaptionsByFileExt", function(fileName)
{
    var optimizationEnabled = $("#optimize").is(":checked");
    var flag = false;
    if (!optimizationEnabled)
        flag = "no-optimize";

    for (var i = 0; i < this.settings.file_extensions.length; i++)
    {
        if (fileName.length > this.settings.file_extensions[i].ext.length &&
            fileName.toLowerCase().substring(fileName.length - this.settings.file_extensions[i].ext.length)
            == this.settings.file_extensions[i].ext
            )
        {
            if (!flag || !this.settings.file_extensions[i].flag || flag == this.settings.file_extensions[i].flag)
            {
                return this.settings.file_extensions[i];
            }
        }
    }

    return false;
});

Input.method("exampleChange", function()
{
    var fileName = $("#exampleURL").val();

    if (fileName)
    {
        var captions = this.getCaptionsByFileExt(fileName);
        if (captions)
        {
            $("#submitExample").removeAttr("disabled");
            $("#fileExtExample").val(captions.ext);
            $("#submitExample").val(captions.button_example_caption);
        }
        else
        {
            $("#submitExample").val("Unknown");
            $("#submitExample").attr("disabled", "disabled");
            $("#fileExtExample").val("");
        }
    }
    else
    { // no example
        fileName = "any.cfr";
        $("#submitExample").attr("disabled", "disabled");
        $("#submitExample").val(this.getCaptionsByFileExt(fileName).button_example_caption);
        $("#fileExtExample").val("");
    }

});

Input.method("inputChange", function(){
    var fileName = $("#myform [type='file']").val();

    if (fileName)
    {
        var captions = this.getCaptionsByFileExt(fileName);
        if (captions)
        {
            $("#submitFile").removeAttr("disabled");
            $("#fileExtFile").val(captions.ext);
            $("#submitFile").val(captions.button_file_caption);
        }
        else
        {
            $("#submitFile").val("Unknown");
            $("#submitFile").attr("disabled", "disabled");
            $("#fileExtFile").val("");
        }
    }
    else{ // no file
        fileName = "any.cfr";
        $("#submitFile").attr("disabled", "disabled");
        $("#submitFile").val(this.getCaptionsByFileExt(fileName).button_file_caption);
        $("#fileExtFile").val("");
    }

});

Input.method("editorChange", function()
{
    // using the default name
    fileName = "any.cfr";
    $("#submitText").val(this.getCaptionsByFileExt(fileName).button_editor_caption);

});

Input.method("getInitContent", function()
{
    result = '<div id = "load_area" style="height:100%;overflow:hidden">';
    result += '<form id="myform" action="' + this.serverAction + '" method="post" enctype="multipart/form-data" style="display: block; height:100%">';

    result += '<input type="hidden" name="claferFileURL" id="claferFileURL" value="' + this.host.claferFileURL + '">';
    result += '<input type="hidden" name="exampleFlag" id="exampleFlag" value="0">';
    result += '<input type="hidden" name="fileExt" id="fileExt" value="' + this.settings.file_extensions[0].ext + '">';
    result += '<input type="hidden" id="fileExtFile" value="' + this.settings.file_extensions[0].ext + '">';
    result += '<input type="hidden" id="fileExtExample" value="' + this.settings.file_extensions[0].ext + '">';
    result += '<input type="hidden" id="windowKey" name="windowKey" value="' + this.host.key + '">';
    result += '<input id="claferText" name="claferText" type="hidden"/>';

    result += '<table width="100%" height="100%" cellspacing="0" cellpadding="0">';
    result += '<tr height="1em">';
    result += '<td><div style="width:100%"><input type="file" style="width:100%" name="claferFile" id="claferFile" title="If you want to upload your clafer file, select one here "/></div></td>';
    result += '<td width="60"><input id="submitFile" type="submit" value="' + this.settings.file_extensions[0].button_file_caption + '" title="' + this.settings.file_extensions[0].button_file_tooltip + '"/></td>';
    result += '<td width="160"><input id="loadExampleInEditor" type="checkbox" checked="checked" name="loadExampleInEditor" value="unchecked" title="If checked, the editor window below will be loaded with a file or an example submitted">Load into editor</input></td>';
    result += '</tr><tr height="1em">';
    result += '<td><div style="width:100%"><select id="exampleURL" style="width:100%" name="exampleURL" title="If you want, you can choose to compile an example clafer model from the list">';

    result += '</select></div></td>';
    result += '<td><input id="submitExample" type="submit" value="' + this.settings.file_extensions[0].button_example_caption + '" title="' + this.settings.file_extensions[0].button_example_tooltip + '"></input></td>';


    if (this.settings.optimization_backend)
    {
        result += '<td>';
        var checked = "";

        if (this.settings.input_default_cache)
            checked = ' checked = "checked"';

        result += '<input id="useCache" type="checkbox" name="useCache"' + checked + '/><span>Use cached results</span>';
        result += '</td>';
    }

//    result += '<td></td>';

    result += '</tr>'
    result += '<tr height="1em">';
    result += '<td style="border-top: 2px groove threedface;">';
    result += '<span id="input_editor_caption">Or enter your model:</span></td>';
    result += '<td style="border-top: 2px groove threedface; "><input id="submitText" type="submit" value="' + this.settings.file_extensions[0].button_editor_caption + '" title="' + this.settings.file_extensions[0].button_editor_tooltip + '"/></td>';

    result += '<td style="padding: 0px 2px 0px 2px; border-top: 2px groove threedface; border-left: 2px groove threedface"><div id="input_scopes">Scopes:<select id="ss" name="ss" title="Choose a scope computing strategy. Scopes are used for instantiation using finite scope reasoners">';

    result += '<option value="none" title="Disable scope computing strategy. All scopes are to be set to 1">Disable</option>';
    result += '<option value="simple" selected="selected" title="Fast computation. Scopes are not precise, but this strategy works in most cases">Fast</option>';

    result += '</select></div></td>';

//    result += '<td style="padding: 0px 2px 0px 2px;border-left: 2px groove threedface"><div id="input_flags">Flags: <input id="args" type="text" style="width:90px;" name="args" value="' + this.settings.input_default_flags + '" title="You can specify any additional compilation flags supported by the compiler"></input></div></td>';

    var padding = "";
    if (this.settings.optimization_backend)
    {
        padding = 'padding-bottom:60px;';
    }

    result += '</tr><tr height="100%"><td style="height:100%;border-top: 2px groove threedface;' + padding + '" colspan = "3"><div id="clafer_editor" style="height:100%">';

    result += '</div></td>';

    result += '</tr></table>';

    var context = this;

    if (this.settings.optimization_backend)
    {
        var checked = ' checked = "checked"';

        result += '<div id="input_bottom_container" style="position:absolute;bottom:0; left:0;right:0;margin-bottom:-22px; border: 2px groove threedface;">';
//        result += '<div style="height:2px; border-top: 2px groove threedface;"></div>';

        result += '<table width="100%" height="100%" cellspacing="0" cellpadding="0"><tr><td style="border-right: 2px groove threedface">';
        result += '<input id="optimize" type="checkbox" name="optimize" title="If you uncheck the box, you can run the model without optimization, and then add instances"' + checked + '></input>';
        result += '<span id="input_backend_label">Run optimization </span>';
        result += '</td>';

        result += '<td>';

        var checked = "";

        if (this.settings.input_default_optimizer_scope)
            checked = ' checked = "checked"';

        result += '<div class="optimizationBackendSetting"><span id="optimizerScopeSettings">';
        result += '<input id="optimizerScopeOverride" type="checkbox" name="optimizerScopeOverride" title="Override the global scope computed during the compilation process"' + checked + '></input>';
        result += '<span id="optimizerScopeLabel" style="padding-left:4px;padding-right:4px;">Scope:</span>';
        result += '<input type="text" class="scopeInput" size="2" value="127" id="optimizerScope" title="Enter the scope for optimization" name="optimizerScope"/>';
        result += '</span></div>';
        result += '</td>';

        result += '</td><td>';

        var checked = "";

        if (this.settings.input_default_optimizer_maxint)
            checked = ' checked = "checked"';

        result += '<div class="optimizationBackendSetting"><span id="optimizerMaxIntSettings">';
        result += '<input id="optimizerMaxIntOverride" type="checkbox" name="optimizerMaxIntOverride" title="Override the maximum integer value computed during the compilation process"' + checked + '></input>';
        result += '<span id="optimizerMaxIntLabel" style="padding-left:4px;padding-right:4px;">MaxInt:</span>';
        result += '<input type="text" class="scopeInput" size="2" value="127" id="optimizerMaxInt" title="Enter the highest integer for optimization" name="optimizerMaxInt"/>';
        result += '</span></div>';
        result += '</td>';





        result += '</tr>';

        // second row

        result += '<tr><td style="border-right: 2px groove threedface">';
        result += '<select id="optimizationBackend" name="optimizationBackend" title=""></select>';
        result += '</td>';






        result += '<td>';
        var checked = "";
        if (this.settings.input_default_optimizer_limit)
            checked = ' checked = "checked"';

        result += '<div class="optimizationBackendSetting"><span id="optimizerLimitSettings">';
        result += '<input id="optimizerLimitOverride" type="checkbox" name="optimizerLimitOverride" title="Limit the maximum number of instances produced"' + checked + '></input>';
        result += '<span id="optimizerLimitLabel" style="padding-left:4px;padding-right:4px;">Limit instances:</span>';
        result += '<input type="text" class="scopeInput" size="2" value="100" id="optimizerLimit" title="Enter the limit of instances for optimization" name="optimizerLimit"/>';
        result += '</span></div>';
        result += '</td>';


        result += '<td>';
        var checked = "";

        if (this.settings.input_default_optimizer_cores)
            checked = ' checked = "checked"';

        result += '<div class="optimizationBackendSetting"><span id="optimizerCoresSettings">';
        result += '<input id="optimizerCoresOverride" type="checkbox" name="optimizerCoresOverride" title="Use parallel optimization with the specified number of cores"' + checked + '></input>';
        result += '<span id="optimizerCoresLabel" style="padding-left:4px;padding-right:4px;">Number of cores:</span>';
        result += '<input type="text" class="scopeInput" size="2" value="4" id="optimizerCores" title="Enter the number of cores to use for optimization" name="optimizerCores"/>';
        result += '</span></div>';
        result += '</td>';

        result += '</tr></table>';
        result += '</div>';

        $.getJSON('/Backends/backends.json',
            function(data)
            {
                var backends = data.backends;
                context.backends = data.backends;
                var options = "";

                var display = "block";

                for (var i = 0; i < backends.length; i++)
                {
                    options += '<option value="' + backends[i].id + '" title="' + backends[i].tooltip + '">' + backends[i].label + '</option>';
                }

                $("#optimizationBackend").html(options);

                context.onBackendChange();
                context.partLoaded();
            }
        ).error(function()
            {
                var options = '<option value="">(Could not load instance generators)</option>';
                $("#optimizationBackend").html(options);
                context.partLoaded();

            });
    }

    result += '</form>';


//    result += '<form id="saveSourceForm" action="/savesource" method="post" enctype="multipart/form-data">';
//    result += '<input type="hidden" name="windowKey" value="' + this.host.key + '"/>';
//    result += '<input type="hidden" name="saveSourceField" id="saveSourceField" value=""></form>';

    var context = this;

    $.getJSON('/Examples/examples.json',
        function(data)
        {
            var examples = data.examples;
            var options = "";

            for (var i = 0; i < examples.length; i++)
            {
                var optionClass = 'normal_option';

                if (i == 0)
                    optionClass = 'first_option';

                options += '<option class="' + optionClass + '" value="' + examples[i].url + '">' + examples[i].label + '</option>';
            }

            $("#exampleURL").html(options);

            context.partLoaded();

        }
    ).error(function()
        {
            var optionClass = 'first_option';
            var options = '<option class="' + optionClass + '" value="">Or Choose Example (Could not load examples)</option>';
            $("#exampleURL").html(options);
            context.partLoaded();

        });

    return result;

});

Input.method("onResize", function()
{
    this.editor.resize();
});

Input.method("partLoaded", function()
{
    this.loadCounter = this.loadCounter - 1;

    if (this.loadCounter == 0)
    {
       this.host.loaded(this); // notify about getting fully loaded
    }
});

function unescapeJSON(escaped)
{
    return escaped
        .replaceAll('\\\\', '\\')
        .replaceAll('\\"', '"')
        .replaceAll('\\/', '/')
        .replaceAll('\\b', '\b')
        .replaceAll('\\f', '\f')
        .replaceAll('\\n', '\n')
        .replaceAll('\\r', '\r')
        .replaceAll('\\t', '\t');
}

Input.method("onBackendChange", function()
{
    var selectedId = $( "#optimizationBackend option:selected" ).val();

    for (var i = 0; i < this.backends.length; i++)
    {
        if (this.backends[i].id == selectedId && this.backends[i].optimization_options)
        {
            this.updateOptimizationSettings(this.backends[i].optimization_options.set_int_scope, "MaxInt");
            this.updateOptimizationSettings(this.backends[i].optimization_options.set_default_scope, "Scope");
            this.updateOptimizationSettings(this.backends[i].optimization_options.cores, "Cores");
            this.updateOptimizationSettings(this.backends[i].optimization_options.limit, "Limit");

            break;

        }
    }

    if (this.settings.onBackendChange)
        this.settings.onBackendChange(this, result);
});

Input.method("updateOptimizationSettings", function(config, id)
{
    $("#optimizer" + id + "Override").unbind("change");

    $("#optimizer" + id + "Override").change(function(){
        $("#optimizer" + id).prop("disabled", !$("#optimizer" + id + "Override").is(":checked"));
    });

    if (config && config.argument)
    {
        $("#optimizer" + id + "Settings").show();
        if (config.default_value)
        {
            $("#optimizer" + id).val(config.default_value);
        }
        if (config.label)
        {
            $("#optimizer" + id + "Label").html(config.label);
        }

        $("#optimizer" + id + "Override").change();
    }
    else
    {
        $("#optimizer" + id + "Settings").hide();
        $("#optimizer" + id).prop("disabled", true);
    }
});

Input.method("onOptimizeChecked", function(){
    var value = $("#optimize").is(":checked");
    $('#optimizationBackend').attr('disabled', !value);
    $('.optimizationBackendSetting').toggle(value);
    $('#useCache').toggle(value);
    $('#useCache').next("span").toggle(value);

    this.inputChange();
    this.exampleChange();
    this.editorChange();
});
