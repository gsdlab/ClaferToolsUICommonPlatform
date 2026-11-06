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

function Control(host, settings)
{ 
    this.id = "mdControl";
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

    this.sessionActive = false;
}

Control.method("getInitContent", function(){
    var ret = '<form id="ControlForm" method="post" action="control" style="display: block; padding:1px;">';
    ret += '<input type="hidden" id="ControlOp" name="operation" value=""/>';
    ret += '<input type="hidden" id="ControlOpArg1" name="operation_arg1" value=""/>';
    ret += '<input type="hidden" id="ControlOpArg2" name="operation_arg2" value=""/>';
    ret += '<input type="hidden" id="BackendId" name="backend" value=""/>';

    ret += '<select id="backend" title="Choose a solution generator backend">'; 
        // no name here, because if disabled, then the id is not submitted at all
    ret += '</select>';

    ret += '<input type="hidden" id="windowKey" name="windowKey" value="' + this.host.key + '">';
    ret += '<input type="button" class="inputRunStopButton" id="RunStop" value="Run" title="Run the chosen solution generator" disabled="disabled"/><br>';
    ret += '<fieldset id="backendButtonsFieldset"><div id="backendButtons"></div></fieldset>';

    ret += '<div style="height:5px;"></div><fieldset id="scopeControl">';

    ret += '<legend>Scopes</legend>';  
    ret += '<table width="100%" border="0" cellspacing="0" cellpadding="0">'; 

    ret += '<tr id="defaultScopeSettings">';

    ret += '<td style="padding: 0px 4px 0px 4px" id="defaultScopeSettingsIncLabel">All:</td>';
    ret += '<td><input type="text" class="scopeInput" title="Enter the delta by which increase scopes" size="2" value="1" id="allScopesDelta" name="allScopesDelta"/><button id="incAllScopes" title="Increase all the scopes by the specified value">Inc</button></td>';

    ret += '<td style="padding: 0px 4px 0px 12px; border-left: 2px groove threedface;" id="defaultScopeSettingsSetLabel">Default:</td>';
    ret += '<td ><input type="text" class="scopeInput" title="Enter the scope (an integer from 0 up to a number the backend can handle)" size="2" value="1" id="defaultScopeValue" name="defaultScopeValue"/><button id="setDefaultScope" title="Set the default scope">Set</button></td>';

    ret += '</tr>';

    ret += '</table>';
    ret += '<table width="100%" border="0" cellspacing="0" cellpadding="0" id="individualScopeSettings">'; 
    ret += '<tr><td colspan="4"><div style="border-bottom: 2px groove threedface; height:6px;"></div></td>';
    ret += '</tr>';
    ret += '<tr id="claferScopeSettings1">';
    ret += '<td style="padding: 0px 4px 0px 4px" width="60">Custom:</td>';
    ret += '<td colspan="3">';
    ret += '<input type="text" id="individualClafer" class="fullwidth" placeholder="Clafer name(s)" list="ClaferList" autocomplete="off" title="Enter the clafer name, namespace or path, depending on the backend, or choose one of the suggestions"></input>';
    ret += '<datalist id="ClaferList"></datalist>';
    ret += '</td>';
    ret += '</tr>';

    ret += '<tr id="claferScopeSettings2">';
    ret += '<td></td>';
    ret += '<td>';    
    ret += '<input type="text" size="2" value="1" class="scopeInput" id="individualScopeDelta" title="Scope value"/>';
    ret += '<button id="incIndividualScope" title="Increase the scope of the specified clafer(s) by the specified delta">Inc</button>';
    ret += '</td>';

    ret += '<td colspan="2">';
    ret += '<input type="text" size="2" value="1" class="scopeInput" id="individualScopeValue" title="Scope value"/>';
    ret += '<button id="setIndividualScope" title="Set the scope of the specified clafer(s)">Set</button>';
    ret += '</td>';
    ret += '</tr>';

    ret += '</table>';
    ret += '</fieldset>';
    ret += '<div style="height:4px;"></div>';

    ret += '<fieldset id="intControl">';  
    ret += '<table width="100%" border="0" cellspacing="0" cellpadding="0">'; 

    ret += '<tr id="intScopeSettings">';
    ret += '<td style="padding-left:4px;padding-right:4px;" width="60">Max Int:</td>';
    ret += '<td><input type="text" class="scopeInput" size="2" value="63" id="intHighScopeValue" title="Enter the upper bound for unknown integers" name="intHighScopeValue"/>';
    ret += '<button id="setIntScope" title="Set the selected scope for integers">Set</button></td>';
    ret += '</tr>';

    ret += '</table>';
    ret += '</fieldset>';
   
    ret += '</form>';

    var context = this;

    $.getJSON('Backends/backends.json', 
        function(data)
        {
            var backends = data.backends;
            context.backends = data.backends;
            var options = "";
        
            var backendButtons = "";

            var display = "block";

            for (var i = 0; i < backends.length; i++)
            {
                options += '<option value="' + backends[i].id + '" title="' + backends[i].tooltip + '">' + backends[i].label + '</option>';

                backendButtons += '<div id="' + backends[i].id + '_buttons" class="button_panel" style="display:' + display + ';">';
                display = "none";

                for (var j = 0; j < backends[i].control_buttons.length; j++)
                {
                    var button = backends[i].control_buttons[j];
                    backendButtons += '<button class="control_button' + (button.default_on ? " control_button_on" : "") + '"' + (button.toggle ? "" : ' disabled="disabled"') + ' id="' + backends[i].id + "-" + backends[i].control_buttons[j].id + '" name="' + backends[i].control_buttons[j].id + '"' + (backends[i].control_buttons[j].toggle ? ' data-toggle="true"' : '') + ' title="' + backends[i].control_buttons[j].tooltip + '">' + backends[i].control_buttons[j].label + "</button>";

                    if (backends[i].control_buttons[j].argument)
                    {
                        backendButtons += '<input type="number" class="control_argument" disabled="disabled"' + (backends[i].control_buttons[j].argument.allow_negative ? "" : ' min="0"') + ' id="' + backends[i].id + "-" + backends[i].control_buttons[j].id + '-arg" value="' + backends[i].control_buttons[j].argument.default_value + '" title="' + backends[i].control_buttons[j].argument.tooltip + '"/>';
                    }
                }

                backendButtons += '</div>';

            }

            $("#backend").html(options);
            $("#backendButtons").html(backendButtons);

            $(".control_button").on("click", function(){
                $("#ControlOp").val(this.id);

                var argument = $("#" + this.id + "-arg");
                if (argument.length)
                {
                    $("#ControlOpArg1").val(argument.val());
                }

                if ($(this).is("[data-toggle]"))
                {
                    $(this).toggleClass("control_button_on");

                    if ($("#RunStop").val() != "Kill") // not running: the next run starts with this setting
                    {
                        return false;
                    }
                }

                if (context.settings.onControlButtonClick)
                {
                    context.settings.onControlButtonClick(context, this.id);
                }
            });

            // Enter runs the button of the argument, not the first button of the form
            $(".control_argument").on("keypress", function(event){
                if (event.which == 13)
                {
                    event.preventDefault();
                    $(this).prev("button").trigger("click");
                }
            });

            context.onBackendChange();

            context.host.loaded(context); // notify about getting fully loaded

        }
    ).fail(function() 
        { 
            var options = '<option value="">(Could not load solution generators)</option>';
            $("#backend").html(options);
            context.host.loaded(context); // notify about getting fully loaded

        });

    this.data = "";
    this.error = "";
    this.overwrite = false;

    return ret;
});

Control.method("onInitRendered", function()
{
    $("#backend")[0].onchange = this.onBackendChange.bind(this);        
    $("#RunStop")[0].onclick = this.runStopClick.bind(this);

    $("#setDefaultScope")[0].onclick = this.setDefaultScopeClick.bind(this);
    $("#setIndividualScope")[0].onclick = this.setIndividualScopeClick.bind(this);
    $("#setIntScope")[0].onclick = this.setIntScopeClick.bind(this);
    $("#incAllScopes")[0].onclick = this.incAllScopesClick.bind(this);
    $("#incIndividualScope")[0].onclick = this.incIndividualScopeClick.bind(this);
 
    var options = new Object();
    options.beforeSubmit = this.beginQuery.bind(this);
    options.success = this.showResponse.bind(this);
    options.error = this.handleError.bind(this);
    ajaxForm("#ControlForm", options);

});

Control.method("resetControls", function(){
    $("#RunStop").prop("disabled", false)
                    .val("Run")
                    .attr("title", "Run the chosen solution generator");

    $('#getInstances').prop('disabled', true);


    this.adjustBackendArgumentSettings();
    
});

Control.method("runStopClick", function(){
    if ($("#RunStop").val() == "Run")
    {
        if (this.settings.onStart(this))
        {
            $("#ControlOp").val("run");

            // the toggles that are on, whose run arguments the server adds
            var toggles = $("#" + $( "#backend option:selected" ).val() + "_buttons").children(".control_button_on").map(function(){
                return this.name;
            }).get();
            $("#ControlOpArg2").val(toggles.join(","));

            this.host.makeBusy(true);
            this.sessionActive = true; // activating IG session
            $("#ControlForm").trigger("submit");
        }
    }
    else
    {
        if (this.settings.onStop(this))
        {
            $("#ControlOp").val("stop");
            $("#ControlForm").trigger("submit");
        }
    }
});

Control.method("setDefaultScopeClick", function(){
    $("#ControlOp").val("setDefaultScope");
    $("#ControlOpArg1").val($ ("#defaultScopeValue").val());
});

Control.method("incAllScopesClick", function(){
    $("#ControlOp").val("incAllScopes");
    $("#ControlOpArg1").val($ ("#allScopesDelta").val());
});

Control.method("setIndividualScopeClick", function(){
    $("#ControlOp").val("setIndividualScope");
    $("#ControlOpArg1").val($ ("#individualScopeValue").val());
    $("#ControlOpArg2").val($ ("#individualClafer").val());
});

Control.method("incIndividualScopeClick", function(){
    $("#ControlOp").val("incIndividualScope");
    $("#ControlOpArg1").val($ ("#individualScopeDelta").val());
    $("#ControlOpArg2").val($ ("#individualClafer").val());
});

Control.method("setIntScopeClick", function(){
    $("#ControlOp").val("setIntScope");
    $("#ControlOpArg1").val($ ("#intHighScopeValue").val());
});

Control.method("enableRuntimeControls", function(){
    $("#" + $( "#backend option:selected" ).val() + "_buttons").children("button, input").prop("disabled", false);
    $("#RunStop").val("Kill");
    $("#RunStop").attr("title", "Force the running backend to stop");

    $("#setIndividualScope").prop("disabled", false);
    $("#setDefaultScope").prop("disabled", false);
    $("#defaultScopeValue").prop("disabled", false);    
    $("#individualScopeValue").prop("disabled", false);    
    $("#individualClafer").prop("disabled", false);   

    $("#incIndividualScope").prop("disabled", false);
    $("#individualScopeDelta").prop("disabled", false);    
    $("#incAllScopes").prop("disabled", false);
    $("#allScopesDelta").prop("disabled", false);

//    $("#intLowScopeValue").prop("disabled", false);    
    $("#intHighScopeValue").prop("disabled", false);   
    $("#setIntScope").prop("disabled", false);   
    
//    $("#bitwidthValue").prop("disabled", false);   
//    $("#setBitwidth").prop("disabled", false);   

    $("#backend").prop("disabled", true);

    $('#getInstances').prop('disabled', false);


});

Control.method("disableRuntimeControls", function(){
    $("#" + $( "#backend option:selected" ).val() + "_buttons").children("button, input").not("[data-toggle]").prop("disabled", true);
    $("#RunStop").val("Run");
    $("#RunStop").attr("title", "Run the selected backend");

    $("#setIndividualScope").prop("disabled", true);
    $("#setDefaultScope").prop("disabled", true);
    $("#defaultScopeValue").prop("disabled", true);    
    $("#individualScopeValue").prop("disabled", true);    
    $("#individualClafer").prop("disabled", true);    

    $("#incIndividualScope").prop("disabled", true);
    $("#individualScopeDelta").prop("disabled", true);    
    $("#incAllScopes").prop("disabled", true);
    $("#allScopesDelta").prop("disabled", true);
    $("#setIntScope").prop("disabled", true);

    $("#backend").prop("disabled", false);

    $('#getInstances').prop('disabled', true);



    this.adjustBackendArgumentSettings();
});

Control.method("disableAll", function(){
    $("#RunStop").prop("disabled", true);
    $("#" + $( "#backend option:selected" ).val() + "_buttons").children("button, input").not("[data-toggle]").prop("disabled", true);

    $("#setIndividualScope").prop("disabled", true);
    $("#setDefaultScope").prop("disabled", true);
    $("#defaultScopeValue").prop("disabled", true);    
    $("#individualScopeValue").prop("disabled", true);    
    $("#individualClafer").prop("disabled", true);    

    $("#incIndividualScope").prop("disabled", true); 
    $("#individualScopeDelta").prop("disabled", true);    
    $("#incAllScopes").prop("disabled", true); 
    $("#allScopesDelta").prop("disabled", true); 

    $("#intHighScopeValue").prop("disabled", true);   
    $("#setIntScope").prop("disabled", true);   

    $("#backend").prop("disabled", false);    
});

Control.method("beginQuery", function(formData, jqForm, options){
    $("#ControlForm").hide();
});

Control.method("showResponse", function(responseText, statusText, xhr, $form)
{
    if (responseText == "started" && this.settings.onStarted)
    {   
        this.settings.onStarted(this);
        this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay); // start polling
        this.enableRuntimeControls();
    }
    else if (responseText == "stopped" && this.settings.onStopped)
    {
        this.settings.onStopped(this);
    }
    else if (responseText == "default_scope_set" && this.settings.onDefaultScopeSet)
    {
        this.settings.onDefaultScopeSet(this);
    }
    else if (responseText == "all_scopes_increased" && this.settings.onAllScopesIncreased)
    {
        this.settings.onAllScopesIncreased(this);
    }
    else if (responseText == "int_scope_set" && this.settings.onIntScopeSet)
    {
        this.settings.onIntScopeSet(this);
    }
    else if (responseText == "individual_scope_set" && this.settings.onIndividualScopeSet)
    {
        this.settings.onIndividualScopeSet(this);
    }
    else if (responseText == "individual_scope_increased" && this.settings.onIndividualScopeIncreased)
    {
        this.settings.onIndividualScopeIncreased(this);
    }
    else if (this.settings.onCustomEvent)
    {
        this.settings.onCustomEvent(this, responseText);
    }

    this.endQuery();
});

Control.method("endQuery", function()  { 
    $("#ControlForm").show();
    
    return true;
});

Control.method("handleError", function(response, statusText, xhr)  { 
    clearTimeout(this.pollingTimeoutObject);
    
    this.sessionActive = false;
    this.host.makeBusy(false);

    this.endQuery();
    this.settings.onError(this, statusText, response, xhr);
    
});


Control.method("onPoll", function(responseObject)
{
//    console.log(responseObject);
    if (!responseObject)
    {
        this.handleError(null, "empty_argument", null);
        return;
    }

    if (responseObject.scopes != "")
    {
        this.updateClaferList(JSON.parse(responseObject.scopes));    
    }

    this.settings.onPoll(this, responseObject);
    
    if (responseObject.completed)
    {
        this.settings.onCompleted(this, responseObject);
        this.disableRuntimeControls();
        this.sessionActive = false;
        this.host.makeBusy(false);
    }
    else
    {
        this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay);
    }
});        

Control.method("poll", function()
{
    var options = new Object();
    options.url = "poll";
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

// The clafers and their scopes as suggestions of the field "Clafer name(s)" (a datalist):
// choosing one fills in its scope and moves to the scope value.
Control.method("updateClaferList", function(jsonList){

    if (!jsonList.length)
        return;

    var scopes = {};
    var list = $("#ClaferList").empty();

    for (var i = 0; i < jsonList.length; i++)
    {
        if (jsonList[i].lpqName == "")
            continue;

        var hierarchy = "";
        if (jsonList[i].hierarchy)
            hierarchy = " [" + jsonList[i].hierarchy + "]";

        scopes[jsonList[i].lpqName] = jsonList[i].scope;
        list.append($("<option>").attr("value", jsonList[i].lpqName).attr("label", "[" + jsonList[i].scope + "]" + hierarchy));
    }

    $("#individualClafer").off("input.claferList").on("input.claferList", function(event) {
        var name = $(this).val();
        if (!Object.prototype.hasOwnProperty.call(scopes, name))
            return;

        $("#individualScopeValue").val(scopes[name]);

        // a suggestion was chosen, not the last letter of a name typed
        var inputType = event.originalEvent && event.originalEvent.inputType;
        if (!inputType || inputType == "insertReplacementText")
        {
            $("#individualScopeValue").trigger("focus");
            $("#individualScopeValue").trigger("select");
        }
    });
});


Control.method("adjustBackendSettings", function(backend)
{
    var hasIntScopeSettings = false;

    if (backend.scope_options.set_int_scope)
    {
        $("#intScopeSettings").show();
        if (backend.scope_options.set_int_scope.default_value)
        {
            $("#intHighScopeValue").val(backend.scope_options.set_int_scope.default_value);
        }

        if (backend.scope_options.set_int_scope.argument)
        {
            $("#intHighScopeValue").prop("disabled", false);   
        }
        else 
        {
            $("#intHighScopeValue").prop("disabled", true);   
        }                

        hasIntScopeSettings = true;
    }
    else
    {
        $("#intScopeSettings").hide();                
    }

    if (backend.scope_options.set_individual_scope)
    {
        $("#individualScopeSettings").show();
    }
    else
    {
        $("#individualScopeSettings").hide();                
    }

    if (backend.scope_options.inc_all_scopes)
    {
        var label = "All:";
        if (backend.scope_options.inc_all_scopes.label)
        {
            label = backend.scope_options.inc_all_scopes.label;
        }
        $("#defaultScopeSettingsIncLabel").html(label);

        if (backend.scope_options.inc_all_scopes.argument)
        {
            $("#allScopesDelta").prop("disabled", false);   
        }
        else 
        {
            $("#allScopesDelta").prop("disabled", true);   
        }                

        if (backend.scope_options.inc_all_scopes.default_value)
        {
            $("#allScopesDelta").val(backend.scope_options.inc_all_scopes.default_value);
        }
    }

    if (backend.scope_options.set_default_scope)
    {

        var label = "Default:";
        if (backend.scope_options.set_default_scope.label)
        {
            label = backend.scope_options.set_default_scope.label;
        }

        $("#defaultScopeSettingsSetLabel").html(label);

        if (backend.scope_options.set_default_scope.argument)
        {
            $("#defaultScopeValue").prop("disabled", false);   
        }
        else 
        {
            $("#defaultScopeValue").prop("disabled", true);   
        }                

        if (backend.scope_options.set_default_scope.default_value)
        {
            $("#defaultScopeValue").val(backend.scope_options.set_default_scope.default_value);
        }
    }


    if (hasIntScopeSettings)
    {
        $("#intControl").show();        
    }
    else
    {
        $("#intControl").hide();        
    }

});

Control.method("adjustBackendArgumentSettings", function()
{
    var selectedId = $("#BackendId").val();
    
    for (var i = 0; i < this.backends.length; i++)
    {
        if (this.backends[i].id == selectedId)
        {
            if (this.backends[i].scope_options && this.backends[i].scope_options.set_int_scope && this.backends[i].scope_options.set_int_scope.argument)
            {
                $("#intHighScopeValue").prop("disabled", false);   
            }
            else 
            {
                $("#intHighScopeValue").prop("disabled", true);   
            }

            if (this.backends[i].scope_options && this.backends[i].scope_options.set_default_scope && this.backends[i].scope_options.set_default_scope.argument)
            {
                $("#defaultScopeValue").prop("disabled", false);   
            }
            else 
            {
                $("#defaultScopeValue").prop("disabled", true);   
            }            

            if (this.backends[i].scope_options && this.backends[i].scope_options.inc_all_scopes && this.backends[i].scope_options.inc_all_scopes.argument)
            {
                $("#allScopesDelta").prop("disabled", false);   
            }
            else 
            {
                $("#allScopesDelta").prop("disabled", true);   
            }            

            break;
        }
    }
});

Control.method("onBackendChange", function()
{
    $("#backendButtons").children().each(function(){
        this.style.display = "none";
    });

    var selectedId = $( "#backend option:selected" ).val();
    $("#BackendId").val(selectedId);
    $("#backendButtons").children("#" + selectedId + "_buttons")[0].style.display = "block";

    var result = null;

    for (var i = 0; i < this.backends.length; i++)
    {
        if (this.backends[i].id == selectedId)
        {
            result = this.backends[i];
            this.adjustBackendSettings(result);
            break;
        }
    }

    if (this.settings.onBackendChange) 
        this.settings.onBackendChange(this, result);
});

Control.method("reload", function()
{       
    this.resumePolling();

    var selectedId = $( "#backend option:selected" ).val();
    var reloadButton = $("#" + selectedId + "-reload");

    if ($(reloadButton).length > 0) // has reload button
    {
        reloadButton.trigger("click");
        return true;
    }
    else
    {
        // no reload button
        return false;
    }
});

Control.method("pausePolling", function()
{
    clearTimeout(this.pollingTimeoutObject); // it's replaced with the compilation timeout 
});

Control.method("resumePolling", function()
{
    this.pollingTimeoutObject = setTimeout(this.poll.bind(this), this.pollingDelay); // start polling
});