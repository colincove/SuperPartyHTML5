var Collisions = {};

Collisions.doCollisions = function(e)
{
	var bodyList = Physics.bodies.lists.allBodies;
	for(var i = 0;i<bodyList.length;i++)
	{
		var body1 = bodyList[i];
		for(var j = i+1; j<bodyList.length;j++)
		{
			var body2 = bodyList[j];
			
			var collision;
			
			if(body2.type == body1.type)
			{
				switch(body1.type)
				{
					case BodyTypes.POINT:
						break;
					case BodyTypes.CIRCLE:
						collision = Collisions.collideCircleToCircle(body1, body2);
						break;
					case BodyTypes.BOX:
						collision = Collisions.collideBoxToBox(body1, body2);
						break;
					case BodyTypes.POLYGON:
						break;
				}
			}
			else
			{
				//TODO: find out the types of bodies they are and call the appropriate functions
			}
			//TODO: notify the physics simulation that a collision has occurred. 
			//TODO: manage the list of bodies to keep track of entering and exiting bodies from triggers. 
			
		}		
	}
}

Collisions.collideCircleToCircle = function(c1, c2)
{
	var d = Math.sqrt(Math.pow(c2.transform.position.x-c1.transform.position.x, 2)+Math.pow(c2.transform.position.y-c1.transform.position.y, 2));
	if(d<c1.radius+c2.radius)return true;
	return false;
}
//http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
Collisions.collideCircleToBox = function(c, b)
{
	var circleDistance = {};
    circleDistance.x = Math.abs(c.transform.position.x - b.transform.position.x);
    circleDistance.y = Math.abs(c.transform.position.y - b.transform.position.y);

    if (circleDistance.x > (b.getWidth()/2 + c.radius)) { return false; }
    if (circleDistance.y > (b.getHeight()/2 + c.radius)) { return false; }

    if (circleDistance.x <= (b.getWidth()/2)) { return true; } 
    if (circleDistance.y <= (b.getHeight()/2)) { return true; }

    var cornerDistance_sq = Math.pow(circleDistance.x - rect.width/2, 2) +
                         Math.pow(circleDistance.y - rect.height/2, 2);

    return (cornerDistance_sq <= Math.pow(c.radius, 2));
}
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Collisions.collideBoxToBox = function(b1, b2)
{
	var rect1 = {x: b1.transform.position.x, y: b1.transform.position.y, width: b1.getWidth(), height: b1.getHeight()};
	var rect2 = {x: b2.transform.position.x, y: b2.transform.position.y, width: b2.getWidth(), height: b2.getHeight()};
	
	if (rect1.x < rect2.x + rect2.width &&
	   rect1.x + rect1.width > rect2.x &&
	   rect1.y < rect2.y + rect2.height &&
	   rect1.height + rect1.y > rect2.y) 
	   {
		return true;
	}
	return false;
}

Looper.addEventListener(Looper.EVENT_LOGIC_TICK, Collisions.doCollisions);


