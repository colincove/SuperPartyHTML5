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
    
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
    
    function update(e)
    {
         prefab.message("update", e);
    }
    
    return prefab;
}
Prefab.load = function(urls, callback)
{
    FileLoader.readFile(urls, fileLoaded, callback);
    function fileLoaded(url, data)
    {
        Prefab.prefabs[url.substring(url.lastIndexOf('/')+1).split('.')[0]] = $.parseJSON(data);
    }
}