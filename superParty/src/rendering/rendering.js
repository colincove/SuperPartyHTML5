var Rendering 		= {};
Rendering.renderers 	= {};
Rendering.config = 
	{
		visible:true,
		layer:0,
		transform:
		{
			position:{x:0, y:0}, 
			velocity: {x:0, y:0}, 
			rotation: 0, 
			scale:1
		}
	};
Rendering.register = function(name, renderFactory)
{
	this.renderers[name] 			= renderer;
}
Rendering.getRenderer = function(name)
{	
	//return if there is no render factory for given name
	if(!Rendering.renderers[name]) return;
	
	var renderer = $.extend( true, Rendering.config, Rendering.renderers[name]());
	
	return renderer;
}