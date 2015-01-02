SuperParty.onSetupComplete = doSetup;
SuperParty.projectName = "MySuperGameDemo";


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
	/*var canvas 	= Stage.canvas;
    var context = Stage.superContext;

	Looper.addEventListener(Looper.EVENT_DRAW_TICK, draw);
    Looper.addEventListener(Looper.EVENT_LOGIC_TICK, update);
	
	Physics.startDebugDraw();
	
	//var testBody  = Physics.bodies.getCircle({radius:50,mass:5, isTrigger:false});
	//var triggerBody  = Physics.bodies.getCircle({radius:20, isTrigger:true});

	var testBody  = Physics.bodies.getBox({height:20, width:80, mass:5, isTrigger:false, static:true});
	var triggerBody  = Physics.bodies.getBox({width:25, height:25, isTrigger:true});
	var ground  = Physics.bodies.getBox({height:20, width:500, mass:5, isTrigger:false, static:true});
	var ground2  = Physics.bodies.getBox({height:20, width:500, mass:5, isTrigger:false, static:true});
	
	var userMonster = createUserMonster();
	
	userMonster.body.transform.position.x = 200;
	userMonster.body.transform.position.y = 200;

	userMonster.body.transform.setVelocity(10, 0);
	userMonster.body.drag = 1.01;
	userMonster.body.fric = 1.05;

	testBody.transform.position.x = 50;
	testBody.transform.position.y = 50;

	ground.transform.position.x = -50;
	ground.transform.position.y = 300;
	ground2.transform.position.x = 200;
	ground2.transform.position.y = 400;
	
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
        Stage.cam.x += ((userMonster.body.transform.position.x-canvas.width/2)-Stage.cam.x)/5;
        Stage.cam.y += ((userMonster.body.transform.position.y-canvas.height/2)-Stage.cam.y)/5;
		
		
    }*/
    Physics.startDebugDraw();
    var testObj = Prefab.instantiate(Prefab.prefabs['testPrefab']);
    testObj.message("MyMessageBrake", {myLittleMessage:"POOP"});
    
    var testThing = {test:{testAgain:1}, thing:5};
    
    var testAgain = eval("({test:{testAgain:1}, thing:5})");
}