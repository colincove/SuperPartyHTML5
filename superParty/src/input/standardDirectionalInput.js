//-------------------------
//Events
//-------------------------
Input.EVENT_KEYRIGHT_DOWN 	= 'EVENT_KEYRIGHT_DOWN';
Input.EVENT_KEYRIGHT_UP 	= 'EVENT_KEYRIGHT_UP';
Input.EVENT_KEYLEFT_DOWN 	= 'EVENT_KEYLEFT_DOWN';
Input.EVENT_KEYLEFT_UP 		= 'EVENT_KEYLEFT_UP';
Input.EVENT_KEYUP_DOWN 		= 'EVENT_KEYUP_DOWN';
Input.EVENT_KEYUP_UP 		= 'EVENT_KEYUP_UP';
Input.EVENT_KEYDOWN_DOWN 	= 'EVENT_KEYDOWN_DOWN';
Input.EVENT_KEYDOWN_UP 		= 'EVENT_KEYDOWN_UP';



Input.configStandardDirectionInput = 
{
	wasd:false, 
	arrows:true
};

Input.getStandardDirectionInput = function(config)
{

	var obj = $.extend( false, Input.configStandardDirectionInput, config);

	Events.setup(obj);

	var keyInput = Input.getKeyInput();

	keyInput.addEventListener(Input.EVENT_KEY_DOWN, function(e)
	{
		checkAndEmit(e, InputDir.DOWN);
	});

	keyInput.addEventListener(Input.EVENT_KEY_UP, function(e)
	{
		checkAndEmit(e.keyCode, InputDir.UP);
	});

	Looper.addEventListener(Looper.EVENT_LOGIC_TICK, function(e)
	{
		
	});

	function checkAndEmit(e, dir)
	{
		dir = dir || InputDir.UP;

		if((obj.arrows && e.keyCode == 37)  || (obj.wasd && e.keyCode == 65))
		{
			obj.emitEvent(dir == InputDir.UP ? Input.EVENT_KEYLEFT_UP:Input.EVENT_KEYLEFT_DOWN, e);
		}
		else if((obj.arrows && e.keyCode == 39)  || (obj.wasd && e.keyCode == 68))
		{
			obj.emitEvent(dir == InputDir.UP ? Input.EVENT_KEYRIGHT_UP:Input.EVENT_KEYRIGHT_DOWN, e);
		}
		else if((obj.arrows && e.keyCode == 38)  || (obj.wasd && e.keyCode == 87))
		{
			obj.emitEvent(dir == InputDir.UP ? Input.EVENT_KEYUP_UP:Input.EVENT_KEYUP_DOWN, e);
		}
		else if((obj.arrows && e.keyCode == 40)  || (obj.wasd && e.keyCode == 83))
		{
			obj.emitEvent(dir == InputDir.UP ? Input.EVENT_KEYDOWN_UP:Input.EVENT_KEYDOWN_DOWN, e);
		}
	}

	return obj;
}