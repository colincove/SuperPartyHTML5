var Prefab = {};

Prefab.prefabs = {};

Prefab.instantiate = function(def)
{
    var gameObject = {};
   
    //------------------------------------------------------------------------------//
    //----------------------------Load scripts -------------------------------------//
    //------------------------------------------------------------------------------//
    
    gameObject.scripts  = [];
    var scripts         = def.scripts;
    
    for(var i in scripts)
    {
        gameObject.scripts.push(Components.createScript(scripts[i], gameObject));
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Load Body-----------------------------------------//
    //------------------------------------------------------------------------------//
    var bodyDef = def.body;
    
    if(bodyDef)
    {
        gameObject.body         = Physics.bodies.getBody(bodyDef.type, $.extend(bodyDef.config, {isTrigger:false}));
        gameObject.transform    = gameObject.body.transform;
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Load Body-----------------------------------------//
    //------------------------------------------------------------------------------//
    var triggers        = def.triggers;
    gameObject.triggers = [];
    if(triggers)
    {
        for(var i in triggers)
        {
            var trigger = triggers[i];
            gameObject[trigger.name] = Physics.bodies.getBody(bodyDef.type, $.extend(trigger.config, {isTrigger:true}));
            gameObject.triggers.push(gameObject[trigger.name]);
        }
    }
    
    //------------------------------------------------------------------------------//
    //----------------------------Messaging-----------------------------------------//
    //------------------------------------------------------------------------------//
    
    gameObject.message = function(msg, data)
    {
        for(var i in gameObject.scripts)
        {
            gameObject.scripts[i].message(msg, data);
        }
    }
    
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
    
    function update(e)
    {
         gameObject.message("update", e);
    }
    
    Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    
    function draw(e)
    {
        for( var i in def.renderers)
        {
            renderers[i].message
        }
         gameObject.message("update", e);
    }
    
    return gameObject;
}
Prefab.load = function(urls, callback)
{
    FileLoader.readFile(urls, fileLoaded, callback);
    function fileLoaded(url, data)
    {
        Prefab.prefabs[url.substring(url.lastIndexOf('/')+1).split('.')[0]] = eval("("+data+")");
    }
}