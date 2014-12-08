Components.createScript = function(scriptName, gameObject)
{
    var script = {};
    
    function MyMessage(data)
    {
        alert(data.myLittleMessage);
    }
    
    eval(ScriptLoader.scripts[scriptName]);
    
    script.message = function(msg, data)
    {
        //data needs to be in JSON form
        var stringData = JSON.stringify(data);
        var call = msg + "(data);";
        try
        {
            eval(call); 
        }
        catch(e)
        {
            return;
        }
       
    }
    return script;
}
/*
Look into this:

var stringifiedJSON = '{"hello":"world"}';
var parsed = new Function('return ' + stringifiedJSON)();
alert(parsed.hello);
*/