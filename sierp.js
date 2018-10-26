var canv 	= document.getElementById('canvas'),
	ctx 	= canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;
ctx.lineWidth = 2;

var x0 = 700, y0 = 350;
ctx.beginPath();
ctx.moveTo(x0, y0);

var xc = x0, yc = y0;
var ca = 0;

function SierpRight(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpRight(depth, step);
		ca = ca - (Math.Pi/4);
		ctx.lineTo(xc + step * Math.cos(ca), yc - step * Math.cos(ca));
		xc = xc + step * Math.cos(ca);
		yc = yc - step * Math.cos(ca);

		SierpDown(depth, step);
		ctx.lineTo(xc + 2 * step, yc);
		xc = xc + step * 2;

		SierpUp(depth, step);
		ca = ca + (Math.Pi/4);	
		ctx.lineTo(xc + step * Math.cos(ca), yc + step * Math.cos(ca));
		xc = xc + step * Math.cos(ca);
		yc = yc + step * Math.cos(ca);

		SierpRight(depth, step);		
	}
}

function SierpDown(depth, step){
	if (depth > 0){
		depth--;

		SierpDown(depth, step);
		ca = ca - (Math.Pi*3/4);
		ctx.lineTo(xc - step * Math.cos(ca), yc - step * Math.cos(ca));
		xc = xc - step * Math.cos(ca);
		yc = yc - step * Math.cos(ca);

		SierpLeft(depth, step);
		ctx.lineTo(xc, yc - 2 * step);
		yc = yc - step * 2;

		SierpRight(depth, step);
		ca = ca - (Math.Pi/4);	
		ctx.lineTo(xc + step * Math.cos(ca), yc - step * Math.cos(ca));
		xc = xc + step * Math.cos(ca);
		yc = yc - step * Math.cos(ca);

		SierpDown(depth, step);		
	}
}

function SierpUp(depth, step){
	if (depth > 0){
		depth--;

		SierpUp(depth, step);
		ca = ca + (Math.Pi/4);
		ctx.lineTo(xc + step * Math.cos(ca), yc + step * Math.cos(ca));
		xc = xc + step * Math.cos(ca);
		yc = yc + step * Math.cos(ca);

		SierpRight(depth, step);
		ctx.lineTo(yc + 2 * step, yc);
		yc = xc + step * 2;

		SierpLeft(depth, step);
		ca = ca + (Math.Pi*3/4);	
		ctx.lineTo(xc - step * Math.cos(ca), yc + step * Math.cos(ca));
		xc = xc - step * Math.cos(ca);
		yc = yc + step * Math.cos(ca);

		SierpUp(depth, step);		
	}
}

function SierpLeft(depth, step){
	if (depth > 0){
		depth--;

		SierpLeft(depth, step);
		ca = ca + (Math.Pi*3/4);	
		ctx.lineTo(xc - step * Math.cos(ca), yc + step * Math.cos(ca));
		xc = xc - step * Math.cos(ca);
		yc = yc + step * Math.cos(ca);

		SierpUp(depth, step);
		ctx.lineTo(xc - 2 * step, yc);
		xc = xc - step * 2;

		SierpDown(depth, step);
		ca = ca + (Math.Pi*5/4);	
		ctx.lineTo(xc - step * Math.cos(ca), yc - step * Math.cos(ca));
		xc = xc - step * Math.cos(ca);
		yc = yc - step * Math.cos(ca);

		SierpLeft(depth, step);		
	}
}

SierpRight(3, 20);

ctx.closePath();
