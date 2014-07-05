var numberOfScripts = 0;
function getScript(url,success){
    numberOfScripts++;
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0], done=false;
    script.onload = script.onreadystatechange = function(){
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done=true;
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    head.appendChild(script);
}

function onScriptSuccess(){
    if(--numberOfScripts==0)
    {
        Looper.setFps(30);
        Looper.start();

        var body = $('body')[0];
        var counter = document.createElement("span");
        body.appendChild(counter);

        var interval = 0;
        var lastDraw=0;
        
        Looper.addEventListener(Looper.EVENT_DRAW_TICK, function(){
            interval++;
            counter.innerHTML = interval+" : "+(lastDraw-(new Date).getTime())/1000;
            lastDraw=(new Date).getTime();
        });
        
    }
}

getScript('superParty/lib/uuid.js', onScriptSuccess);
getScript('superParty/src/base/events.js', onScriptSuccess);
getScript('superParty/src/base/stage.js', onScriptSuccess);
getScript('superParty/src/base/looper.js', onScriptSuccess);


