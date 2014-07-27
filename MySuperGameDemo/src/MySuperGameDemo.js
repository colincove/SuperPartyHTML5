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

    var speed = 3;

    directionInput.up.onPress       = function(){};
    directionInput.down.onPress     = function(){};
    directionInput.left.onPress     = function(){};
    directionInput.right.onPress    = function(){};

	var canvas 	= Stage.canvas;
    var context = Stage.superContext;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	function draw()
    {
        context.drawImage(R.drawable.testImage, 0, 0, 500, 500);
    
        context.beginPath();
        context.moveTo(x, y);

        context.lineTo(30+x, 30+y);
		context.setLineWidth(10);

		context.setStrokeStyle('#ff0000');
		context.stroke();
    }
    function update()
    {


        //movement
        if(directionInput.up.isDown)
        {
            y-=speed;
        }
          if(directionInput.down.isDown)
        {
            y+=speed;
        }
        if(directionInput.right.isDown)
        {
            x+=speed;
        }
        if(directionInput.left.isDown)
        {
            x-=speed;
        }
        Stage.cam.x += ((x-canvas.width/2)-Stage.cam.x)/10;
        Stage.cam.y += ((y-canvas.height/2)-Stage.cam.y)/10;
    }
}