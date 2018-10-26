// Set Canvas
var canv 	= document.getElementById('canvas'),
	ctx 	= canv.getContext('2d');

// Set context
canv.width = window.innerWidth;
canv.height = window.innerHeight;
ctx.strokeStyle = 'black';

// Set background
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

// Set points
var x0 = 50, y0 = 700;

ctx.beginPath();
ctx.moveTo(x0, y0);

var x_cur = x0, y_cur = y0;
var cur_angle = 0;
cur_angle = cur_angle + (Math.PI/4);

function SierpRight(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpRight(depth, step);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpDown(depth, step);
		ctx.lineTo(x_cur + 2 * step, y_cur);
		ctx.stroke();
		x_cur = x_cur + step * 2;
		y_cur = y_cur;

		SierpUp(depth, step);	
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpRight(depth, step);		
	}
}

function SierpDown(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpDown(depth, step);
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpLeft(depth, step);
		ctx.lineTo(x_cur, y_cur - 2 * step);
		ctx.stroke();
		x_cur = x_cur;
		y_cur = y_cur - step * 2;

		SierpRight(depth, step);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpDown(depth, step);		
	}
}

function SierpUp(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpUp(depth, step);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpRight(depth, step);
		ctx.lineTo(x_cur, y_cur + step * 2);
		ctx.stroke();
		y_cur = y_cur + step * 2;

		SierpLeft(depth, step);	
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpUp(depth, step);		
	}
}

function SierpLeft(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpLeft(depth, step);	
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpUp(depth, step);
		ctx.lineTo(x_cur - 2 * step, y_cur);
		ctx.stroke();
		x_cur = x_cur - step * 2;

		SierpDown(depth, step);
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpLeft(depth, step);		
	}
}

function Sierpinski(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpRight(depth, step);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpDown(depth, step);
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpLeft(depth, step);
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpUp(depth, step);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		ctx.stroke();
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

	}
}

Sierpinski(4, 20);

ctx.closePath();
