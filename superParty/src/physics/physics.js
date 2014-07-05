var Physics 			= {};
Physics.bodies 			= {};
Physics.bodies.lists 	= {allBodies:[]};

//-------------------------
//Events
//-------------------------
Physics.EVENT_ON_ENTER 	= "EVENT_ON_ENTER";//when a physics body enters a trigger
Physics.EVENT_ON_EXIT 	= "EVENT_ON_EXIT";//when a physics body exits a trigger
Physics.EVENT_COLLIDE 	= "EVENT_COLLIDE";//when 2 physics bodies collide

//-------------------------
//Enums
//-------------------------
var BodyTypes 			= new Enum('CIRCLE', 'BOX', 'POLYGON', 'POINT');

//-------------------------
//Setup
//-------------------------

//instantiate lists used to keep track of bodies
for(var i = 0; i < BodyTypes.size; i++)
{
	Physics.bodies.lists[i] = [];
}
Physics.bodies.destroyBody = function(body)
{
	var list = Physics.bodies.lists[body.type];
	removeFromList(list, body);
	removeFromList(Physics.bodies.lists.allBodies, body);
}
Physics.bodies.addBody = function(body)
{
	var list = Physics.bodies.lists[body.type];
	list.push(body);
	Physics.bodies.lists.allBodies.push(body);
}
Physics.bodies.config = 
	{
		collisionList:[],
		type:BodyTypes.POINT,
		sleeping:false,
		isTrigger:false,
		drag:1,
		density:1,
		owner:{},
		collisionGroup:'common',
		getWidth:function(){return 0;},
		getHeight:function(){return 0;},
		transform:
		{
			position:{x:0, y:0}, 
			velocity: {x:0, y:0}, 
			rotation: 0, 
			scale:1,
			applyForce:function(x, y)
			{
				this.velocity.x+=	x;
				this.velocity.y+=	y;
			},
			setVelocity:function(x, y)
			{
				this.velocity.x = x;
				this.velocity.y = y;
			},
			setPosition:function(x, y) 
			{
				this.position.x = x;
				this.position.y = y;
			}
		}
	};
Physics.bodies.circleConfig = $.extend( true, Physics.bodies.config,
	{
		type:BodyTypes.CIRCLE, 
		radius:1
	} );
Physics.bodies.boxConfig = $.extend( true, Physics.bodies.config, 
	{
		type:BodyTypes.BOX, 
		width:1, 
		height:1
	} );
Physics.bodies.polygonConfig = $.extend( true, Physics.bodies.config, 
	{
		type:BodyTypes.POLYGON, 
		vertices:[],
		getVertexCount:function(){return this.vertices.length;}
	} );
Physics.bodies.getPoint = function(config)
{
	var body = $.extend( true, Physics.bodies.config, config );
	this.addBody(body);
	return body;
}
Physics.bodies.getCircle = function(config)
{
	var body = $.extend( true, Physics.bodies.circleConfig, config );
	this.addBody(body);
	body.getWidth = function()
	{
		return this.scale*this.radius*2;
	}
	body.getHeight = function()
	{
		return this.scale*this.radius*2;
	}
}
Physics.bodies.getBox = function(config)
{
	var body = $.extend( true, Physics.bodies.boxConfig, config );
	this.addBody(body);
	body.getWidth = function()
	{
		return this.scale*this.width;
	}
	body.getHeight = function()
	{
		return this.scale*this.height;
	}
}
Physics.bodies.getPolygon = function(config)
{
	var body = $.extend( true, Physics.bodies.polygonConfig, config );
	this.addBody(body);
}