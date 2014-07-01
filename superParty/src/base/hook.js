var Events 			= {};
Events.setup = function(obj)
{
	obj.addEventListener 	= Hook.addEventListener;
	obj.emitEvent 			= Hook.emitEvent;
}
Events.addEventListener = function(func, evt)
{
	if(this[evt] == null)
	{
		this[evt] = [];
	}

	this[evt].push(func);
}
Events.emitEvent 	= function(evt, data)
{
	if(this[evt] == null)
	{
		this[evt] = [];
	}

	data.target = this;

	var func;
	for (var i in this[evt])
	{
		this[evt][i](data);
	}
}