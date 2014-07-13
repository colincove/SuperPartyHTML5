SuperParty.onSetupComplete = init;



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
	

	var canvas 	= Stage.canvas;
    var context = Stage.context;

	context.drawImage(R.drawable.testImage, 0, 0, 100, 100);
	
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(30, 30);
    context.lineWidth = 10;

    // set line color
    context.strokeStyle = '#ff0000';
    context.stroke();
	
	
}