var SimpleSolver = {};
setupSimpleSolverMethods(SimpleSolver);
Physics.solver = SimpleSolver;

function setupSimpleSolverMethods(SimpleSolver)
{
	SimpleSolver.solve = function(body1, body2, type)
	{
		/*if ((type & BodyTypes.POINT) || (type & BodyTypes.CIRCLE)) 
		{
			this.pointToCircle(body1, body2);
		}
		else*/ if (body1.type==BodyTypes.CIRCLE &&  body2.type==BodyTypes.CIRCLE) 
		{
			this.circleToCircle(body1, body2);
		}
		/*else if ((type & BodyTypes.POINT) || (type & BodyTypes.BOX)) 
		{
			this.pointToBox(body1, body2);
		}*/
		else if (body1.type==BodyTypes.BOX &&  body2.type==BodyTypes.BOX) 
		{
			this.boxToBox(body1, body2);
		}
		else if ((type & BodyTypes.CIRCLE) || (type & BodyTypes.BOX)) 
		{
			this.circleToBox(body1, body2);
		}
	}
	SimpleSolver.pointToCircle = function (p, c)
	{
		//TODO
	}
	SimpleSolver.circleToCircle = function (c1, c2)
	{ 
		//resolving position
		var dx 			= c2.transform.position.x - c1.transform.position.x;
		var dy 			= c2.transform.position.y - c1.transform.position.y;
		
		var a 			= Math.atan2(dy, dx);
		var d 			= Math.sqrt(dx*dx+dy*dy);
		var cos 		= Math.cos(a);
		var sin 		= Math.sin(a);
		
		var vd 			= (c1.radius+c2.radius) - d;
		
		var totalMass 	= c1.mass+c2.mass;
		
		var c1vd 		= vd*(c2.mass/totalMass);
		var c2vd 		= vd - c1vd;
		
		c1.transform.setPosition(c1.transform.position.x-cos*c1vd, c1.transform.position.y-sin*c1vd); 
		c2.transform.setPosition(c2.transform.position.x+cos*c2vd, c2.transform.position.y+sin*c2vd);
		
		//c1.transform.setVelocity(c1.transform.velocity.x*-1, c1.transform.velocity.y*-1);
		//c2.transform.setVelocity(c2.transform.velocity.x*-1, c2.transform.velocity.y*-1);
		
		
		
		//resolving velocity
		var c1_val_d = Math.sqrt(c1.transform.velocity.x*c1.transform.velocity.x+c1.transform.velocity.y*c1.transform.velocity.y);
		var c2_val_d = Math.sqrt(c2.transform.velocity.x*c2.transform.velocity.x+c2.transform.velocity.y*c2.transform.velocity.y);
		
		c1.transform.setVelocity(cos*(c1_val_d*c1.damp),sin*(c1_val_d*c1.damp));
		c2.transform.setVelocity(cos*(c2_val_d*c2.damp),sin*(c2_val_d*c2.damp));
	}
	SimpleSolver.pointToBox = function (p, b)
	{
		//TODO
	}
	SimpleSolver.boxToBox = function (b1, b2)
	{

		var collisionBorder 	= {
			left:Math.min(b1.transform.position.x, b2.transform.position.x),
			right:Math.max(b1.transform.position.x+b1.getWidth(), b2.transform.position.x+b2.getWidth()), 
			top:Math.min(b1.transform.position.y, b2.transform.position.y), 
			bottom:Math.max(b1.transform.position.y+b1.getHeight(), b2.transform.position.y+b2.getHeight())};

		var intersection = {
			width:b1.getWidth()+b2.getWidth()-(collisionBorder.right-collisionBorder.left),
			height:b1.getHeight()+b2.getHeight()-(collisionBorder.bottom-collisionBorder.top)
		}


		if(intersection.height>intersection.width)
		{
			var invert = b1.getCenter().x>b2.getCenter().x ? -1:1;

			b1.transform.move(invert*-intersection.width/2, 0);
			b2.transform.move(invert*intersection.width/2, 0);
		}
		else
		{
			var invert = b1.getCenter().y>b2.getCenter().y ? -1:1;

			b1.transform.move(0, invert*-intersection.height/2);
			b2.transform.move(0,invert*intersection.height/2);

		}
		



	}
	SimpleSolver.circleToBox = function (c, b)
	{
		this.boxToBox(c, b);
		//TODO
	}
}