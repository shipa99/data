var canv 	= document.getElementById('canvas'),
	ctx 	= canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;
ctx.lineWidth = 2;

var x0 = 700, y0 = 350;
ctx.beginPath();
ctx.moveTo(x0, y0);

var x_cur = x0, y_cur = y0;
var cur_angle = 0;

function SierpRight(depth, step){
	if (depth > 0){
		depth = depth - 1;

		SierpRight(depth, step);
		cur_angle = cur_angle - (Math.Pi/4);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpDown(depth, step);
		ctx.lineTo(x_cur + 2 * step, y_cur);
		x_cur = x_cur + step * 2;

		SierpUp(depth, step);
		cur_angle = cur_angle + (Math.Pi/4);	
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpRight(depth, step);		
	}
}

function SierpDown(depth, step){
	if (depth > 0){
		depth--;

		SierpDown(depth, step);
		cur_angle = cur_angle - (Math.Pi*3/4);
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpLeft(depth, step);
		ctx.lineTo(x_cur, y_cur - 2 * step);
		y_cur = y_cur - step * 2;

		SierpRight(depth, step);
		cur_angle = cur_angle - (Math.Pi/4);	
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpDown(depth, step);		
	}
}

function SierpUp(depth, step){
	if (depth > 0){
		depth--;

		SierpUp(depth, step);
		cur_angle = cur_angle + (Math.Pi/4);
		ctx.lineTo(x_cur + step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		x_cur = x_cur + step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpRight(depth, step);
		ctx.lineTo(y_cur + 2 * step, y_cur);
		y_cur = x_cur + step * 2;

		SierpLeft(depth, step);
		cur_angle = cur_angle + (Math.Pi*3/4);	
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpUp(depth, step);		
	}
}

function SierpLeft(depth, step){
	if (depth > 0){
		depth--;

		SierpLeft(depth, step);
		cur_angle = cur_angle + (Math.Pi*3/4);	
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur + step * Math.cos(cur_angle));
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur + step * Math.cos(cur_angle);

		SierpUp(depth, step);
		ctx.lineTo(x_cur - 2 * step, y_cur);
		x_cur = x_cur - step * 2;

		SierpDown(depth, step);
		cur_angle = cur_angle + (Math.Pi*5/4);	
		ctx.lineTo(x_cur - step * Math.cos(cur_angle), y_cur - step * Math.cos(cur_angle));
		x_cur = x_cur - step * Math.cos(cur_angle);
		y_cur = y_cur - step * Math.cos(cur_angle);

		SierpLeft(depth, step);		
	}
}

SierpRight(3, 20);

ctx.closePath();
