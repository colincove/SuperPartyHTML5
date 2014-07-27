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

    var x=200;
    var y=200;

    var speed = 3;

    directionInput.up.onPress       = function(){};
    directionInput.down.onPress     = function(){};
    directionInput.left.onPress     = function(){};
    directionInput.right.onPress    = function(){};

	var canvas 	= Stage.canvas;
    var context = Stage.superContext;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	Physics.startDebugDraw();
	
	var testBody  = Physics.bodies.getCircle({radius:50,mass:5, isTrigger:false});
	var charBody  = Physics.bodies.getCircle({radius:5, isTrigger:false, damp:0.2});
	var triggerBody  = Physics.bodies.getCircle({radius:20, isTrigger:true});
	
	charBody.transform.position.x = x;
	charBody.transform.position.y = y;
	
	triggerBody.transform.position.x = 100;
	triggerBody.transform.position.y = 200;
	
	function draw()
    {
		x = charBody.transform.position.x;
		y = charBody.transform.position.y;
		
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle="black";
		context.fill();
		
		
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
		//charBody.transform.setVelocity(0, 0);
        //movement
        if(directionInput.up.isDown)
        {
			charBody.transform.setVelocity(0, -speed);
            y-=speed;
        }
          if(directionInput.down.isDown)
        {
            charBody.transform.setVelocity(0, speed);
        }
        if(directionInput.right.isDown)
        {
           charBody.transform.setVelocity(speed, 0);
        }
        if(directionInput.left.isDown)
        {
            charBody.transform.setVelocity(-speed, 0);
        }
        Stage.cam.x += ((x-canvas.width/2)-Stage.cam.x)/10;
        Stage.cam.y += ((y-canvas.height/2)-Stage.cam.y)/10;
		
		
    }
}