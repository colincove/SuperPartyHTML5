var Prefab = {};

Prefab.prefabs = {};

Prefab.instantiate = function(def)
{
    var prefab = {};
    prefab.scripts = [];
    var components = def.components;
    var scriptLoader = ScriptLoader;
    for(var i in components)
    {
        prefab.scripts.push(Components.createScript(components[i], prefab));
    }
    
    prefab.message = function(msg, data)
    {
        for(var i in prefab.scripts)
        {
            prefab.scripts[i].message(msg, data);
        }
    }
    
    return prefab;
}
Prefab.load = function(urls, callback)
{
    var numScripts;
    var scriptsLoaded = 0;
    if(urls instanceof Array)
    {
        numScripts = urls.length;
        for(var i in urls)
        {
            loadUrl(urls[i], scriptLoaded);
        }
    }
    else
    {
        loadUrl(urls, scriptLoaded);
    }
    function scriptLoaded(url, data)
    {
        Prefab.prefabs[url.substring(url.lastIndexOf('/')+1).split('.')[0]] = $.parseJSON(data);
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