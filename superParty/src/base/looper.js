var Looper = {};

//-------------------------
//Static Variables
//-------------------------
Looper.DEFAULT_LOOP_TIME 	= 100;
//-------------------------
//Events
//-------------------------
Looper.EVENT_LOGIC_TICK		= "EVENT_LOGIC_TICK";
Looper.EVENT_DRAW_TICK		= "EVENT_DRAW_TICK";

//-------------------------
//Setup
//-------------------------
Events.setup(Looper);
Looper.timer				= null;

//will cause loop to fall out when set to true
Looper.markStop 			= false;
Looper.loopTime 			= Looper.DEFAULT_LOOP_TIME;

Looper.tick = (function()
{
	//http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/

	var loops = 0;
	var skipTicks = Looper.loopTime;
	var maxFrameSkip = 10;
	Looper.nextGameTick = (new Date).getTime();
	  
	return function()
	{
		loops = 0;
			    
		while ((new Date).getTime() > Looper.nextGameTick && loops < maxFrameSkip) 
		{
			Looper.emitEvent(Looper.EVENT_LOGIC_TICK);
			Looper.nextGameTick += skipTicks;
			loops++;
		}   
		if (loops)
		{
			Looper.emitEvent(Looper.EVENT_DRAW_TICK);

			if(Looper.markStop == true)
			{
				Looper.cancelLoop();
			}
		}
	};
})();
Looper.start = function()
{
	Looper.timer = setInterval(Looper.tick, 0);
}
Looper.stop = function()
{
	Looper.markStop = true;
}
Looper.cancelLoop = function()
{
	if(Looper.timer)
	{
		clearInterval(Looper.timer);
	}
	Looper.markStop = false;
}
Looper.setFps = function(fps)
{
	//convert frames per second into milliseconds to be used by timer
	Looper.loopTime = 1000/fps;
}