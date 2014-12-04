var ScriptLoader = {};

ScriptLoader.scripts = {};

ScriptLoader.load = function(scripts, callback)
{
    var numScripts;
    var scriptsLoaded = 0;
    if(scripts instanceof Array)
    {
        numScripts = scripts.length;
        for(var i in scripts)
        {
            loadUrl(scripts[i], scriptLoaded);
        }
    }
    else
    {
        loadUrl(scripts, scriptsLoaded);
    }
    function scriptLoaded(url, data)
    {
        ScriptLoader.scripts[url.substring(url.lastIndexOf('/')+1).split('.')[0]] = data;
        if(++scriptsLoaded == numScripts)
        {
            callback();
        }
    }
    function loadUrl(url, callback)
    {
        $.get(url, function(data) {callback(url, data)});
    }
    
}