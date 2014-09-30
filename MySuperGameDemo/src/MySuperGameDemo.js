SuperParty.onSetupComplete = doSetup;



function doSetup()
{
	SuperParty.loadScripts(init, ['MySuperGameDemo/src/DemoLevel.js', 'MySuperGameDemo/src/monsterBasic.js']);
}
function init()
{
	Resources.addEventListener(Resources.EVENT_ON_COMPELETE, startGame);
	
	Resources.addImage('testImage', 'MySuperGameDemo/res/3268850-master+chief+epicness.jpg');
	Resources.addImage('monster', 'MySuperGameDemo/res/microbe.png');
	
	Resources.startLoad();
}
function startGame(e)
{
	setupLevel();
	var canvas 	= Stage.canvas;
    var context = Stage.superContext;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	Physics.startDebugDraw();
	
	//var testBody  = Physics.bodies.getCircle({radius:50,mass:5, isTrigger:false});
	//var triggerBody  = Physics.bodies.getCircle({radius:20, isTrigger:true});

	var testBody  = Physics.bodies.getBox({height:20, width:80, mass:5, isTrigger:false});
	var triggerBody  = Physics.bodies.getBox({width:25, height:25, isTrigger:true});
	
	var userMonster = createUserMonster();
	
	userMonster.body.transform.position.x = 200;
	userMonster.body.transform.position.y = 200;

	testBody.transform.position.x = 50;
	testBody.transform.position.y = 50;
	
	triggerBody.transform.position.x = 100;
	triggerBody.transform.position.y = 200;
	
	function draw()
    {
		//reset canvas
		Stage.context.rect(0,0,canvas.width,canvas.height);
		context.setFillStyle="black";
		context.fill();

        context.drawImage(R.drawable.testImage, 0, 0, 500, 500);
    }
    function update()
    {
        Stage.cam.x += ((userMonster.body.transform.position.x-canvas.width/2)-Stage.cam.x)/10;
        Stage.cam.y += ((userMonster.body.transform.position.y-canvas.height/2)-Stage.cam.y)/10;
		
		
    }
}