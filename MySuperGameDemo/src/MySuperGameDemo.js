
window.onload = function()
{
	SuperParty.setup(doSetup);
}
function doSetup()
{
	SuperParty.loadScripts(init, ['MySuperGameDemo/src/DemoLevel.js']);
}
function init()
{
 	var canvas 	= Stage.canvas;
    var context = Stage.context;

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(30, 30);
    context.lineWidth = 10;

    // set line color
    context.strokeStyle = '#ff0000';
    context.stroke();
}