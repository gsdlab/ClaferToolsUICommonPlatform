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

$(document).ready(function()
{
    var configuration = getConfiguration();    
    
    new Host(configuration.modules, configuration.settings);

});

Host.method("makeBusy", function(isOn)
{
    if (isOn)
    {
        $(window).bind("beforeunload", exitConfirmation);
    }
    else
    {
        $(window).unbind("beforeunload");
    }

});

function exitConfirmation() {
    return ['The tool is in the middle of something running now...\n',
            'Are you sure you want to close the tool?\n',
            'If you exit now, your session will be cleared. If you have some data unsaved, you may want to save it first.\n',
            'Close the tool now?'].join("");
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function Host(modules, settings)
{
    this.settings = settings;
    this.storage = new Object();
    this.settings.onInitialize(this);

    /* GUID for each browser tab */
    /* Note that page refresh is supposed to create a new session */

    var GUID = function () { 
    // taken from a sample at http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
                //------------------
                var S4 = function () {
                    return(
                            Math.floor(
                                    Math.random() * 0x10000 /* 65536 */
                                ).toString(16)
                        );
                };
                //------------------

                return (
                        S4() + S4() + "-" +
                        S4() + "-" +
                        S4() + "-" +
                        S4() + "-" +
                        S4() + S4() + S4()
                    );
            };

    this.key = GUID();
    this.claferFileURL = getParameterByName("claferFileURL");
    this.modules = new Array();
    this.helpGetter = new helpGetter(this);
    
    this.loadCounter = modules.length + 1; // the host should also be loaded, so that +1.    

    for (var i = 0; i < modules.length; i++)
    {
        var MyClass = stringToFunction(modules[i].name);        
        var instance = new MyClass(this, modules[i].configuration);
        
        this.modules.push(instance);
    }    
    
    for (var i = 0; i < this.modules.length; i++)
    {
        var resize = null;
        
        if (this.modules[i].resize)
        {
            resize = this.modules[i].resize.bind(this.modules[i]);
        }

        var windowType = "normal";
        
//        if (this.modules[i].iframeType)
//        {
//            windowType = "iframe";
//        }
        
        var x = $.newWindow({
            id: this.modules[i].id,
            title: this.modules[i].title,
            width: this.modules[i].width,
            height: this.modules[i].height,
            posx: this.modules[i].posx,
            posy: this.modules[i].posy,
            content: '',
            type: windowType,
            onDragBegin : null,
            onDragEnd : null,
            onResizeBegin : null,
            onResizeEnd : resize,
            onAjaxContentLoaded : null,
            statusBar: true,
            minimizeButton: true,
            maximizeButton: true,
            closeButton: false,
            draggable: true,
            resizeable: true
        });    

        if (this.modules[i].getInitContent)
            $.updateWindowContent(this.modules[i].id, this.modules[i].getInitContent());
  
//        if (this.modules[i].iframeType)
//        {
//            $.updateWindowContent(this.modules[i].id, '<iframe id="model" style="height:100%" src="' + this.modules[i].ajaxUrl + '" frameborder="0" width="' + this.modules[i].width + '"></iframe>');
//        }

        if (this.modules[i].onInitRendered)
            this.modules[i].onInitRendered();        

//        var helpButton = this.getHelpButton(this.modules[i].id);
//        $("#" + this.modules[i].id + " .window-titleBar").append(helpButton);   
    }

    this.print("Welcome! Session: " + this.key + "\n");

    var context = this;

    $.getJSON('/initdata', 
        function(data)
        {
            var versions = data.versions;
            context.print(versions);            
            context.loaded(context);
            context.initHelp(data.title, data.version);
        }
    ).error(function() 
        { 
            alert("Could not get server initialization data. Could not print versions");
            context.loaded(context);
            context.initHelp(data.title, data.version);
        });
}

Host.method("initHelp", function(title, version)
{
    this.helpGetter.initialize(title, version);

    for (var i = 0; i < this.modules.length; i++)
    {
        var helpButton = this.getHelpButton(this.modules[i].id);
        $("#" + this.modules[i].id + " .window-titleBar").append(helpButton);   
    }
});

Host.method("loaded", function(module)
{
    this.loadCounter = this.loadCounter - 1;
    
    if (this.loadCounter == 0)
    {
        this.settings.onLoaded(this);
    }
    else if (this.loadCounter < 0)
    {
        alert("The loaded() is called more times than expected");
    }
});

Host.method("print", function(text)
{
    this.findModule("mdOutput").appendConsole(text);
});

//returns the module object. useful for modifying or getting data from other modules.
Host.method("findModule", function(id)
{
    for (var i = 0; i < this.modules.length; i++)
    {
        if (this.modules[i].id == id)
            return this.modules[i];
    }
    
    return null;

});

Host.method("getHelp", function(moduleName){
    this.helpGetter.getHelp(moduleName);
});

Host.method("getHelpButton", function(moduleName){
    return this.helpGetter.getHelpButton(moduleName);
});

Host.method("errorWindow", function(errorRecord){

    var htmlTitle = '<b>' + errorRecord.caption + '</b>'; 
    var htmlTime = errorRecord.datetime; 
    var htmlBody = errorRecord.body.replaceAll("\\n", "<br>").replaceAll("\\t", "&nbsp;&nbsp;").replaceAll("\\r", "").replaceAll("\\\"", "\"") + "<br><br>" + errorRecord.contact;
    var content = htmlTime + '<br>' + htmlBody;

    var x = $.newWindow({
        id: "error",
        title: errorRecord.caption,
        width: 700,
        height: 500,
        posx: 100,
        posy: 100,
        content: content,
        type: "normal",
        statusBar: true,
        minimizeButton: true,
        maximizeButton: true,
        closeButton: true,
        draggable: true,
        resizeable: true,
        modal: true
    });  

});

(function($){
  $(document).ready(function(){
     $(document).delegate('.sidemenu .sm-open','click',function(e){
      // TODO: fix sidemenu z-index bug
      e.preventDefault();
      
      $(this).closest('.sm-content').toggleClass('active');
    })
    
  });
})(jQuery);