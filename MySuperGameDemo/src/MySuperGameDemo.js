SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, ['MySuperGameDemo/src/DemoLevel.js']);
}
function init()
{
	Resources.addEventListener(Resources.EVENT_ON_COMPELETE, startGame);
	
	Resources.addImage('testImage', 'MySuperGameDemo/res/3268850-master+chief+epicness.jpg');
	
	Resources.startLoad();
}
function startGame(e)
{

    var directionInput = Input.getStandardDirectionInput({wasd:true});

    var x=0;
    var y=0;

    directionInput.addEventListener(Input.EVENT_KEYUP_DOWN, function(e){y-=5;});
    directionInput.addEventListener(Input.EVENT_KEYDOWN_DOWN, function(e){y+=5;});
    directionInput.addEventListener(Input.EVENT_KEYRIGHT_DOWN, function(e){x+=5;});
    directionInput.addEventListener(Input.EVENT_KEYLEFT_DOWN, function(e){x-=5;});

	var canvas 	= Stage.canvas;
    var context = Stage.context;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
	
	function draw()
    {
        context.drawImage(R.drawable.testImage, 0, 0, 100, 100);
    
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(30+x, 30+y);
        context.lineWidth = 10;

        // set line color
        context.strokeStyle = '#ff0000';
        context.stroke();
    }
}