
all.loose = {};

all.loose.onstart = function(){
	
}

all.loose.effectRotate = 0;
all.loose.effectScale = 1;
all.loose.effectFade = 0;
all.loose.effectFade2 = 1;
all.loose.pv = 0.005;

all.loose.draw = function(){
	clear('black');
	if(all.loose.effectFade2<=0.6){
		ctx.fillStyle = 'white';
		ctx.font = 'bold 70px Copperplate';
		ctx.textAlign = "center";
		ctx.save();
		ctx.translate(120, 100);
		ctx.rotate(-0.6);
		ctx.fillText('Perdu !', 0, 0);
		ctx.restore();
	}else{
		clear('rgba(83, 163, 64, '+all.loose.effectFade2+')');
		ctx.save();
		ctx.translate(240, 160);
		ctx.scale(all.loose.effectScale, all.loose.effectScale);
		ctx.rotate(all.loose.effectRotate);
		ctx.drawImage(imgs.screen, -240, -160);
		ctx.restore();
		if(all.loose.effectFade<0.5)
			all.loose.effectFade+=0.05;
		else
			all.loose.effectFade = 0.5;
		
		if(all.loose.effectScale>0.01)
			all.loose.effectScale-=all.loose.pv;
		else
			all.loose.effectScale = 0;
		if(all.loose.effectScale<0.2&&all.loose.effectFade2>-1){
			all.loose.effectFade2 -= 0.05;
		}

		ctx.fillStyle='rgba(0, 0, 0, '+all.loose.effectFade+')';
		ctx.fillRect(0, 0, 480, 320);
		
		all.loose.effectRotate = (all.loose.effectRotate+all.loose.pv*6)%(Math.PI*2);
		all.loose.pv+=0.001;
	}
}
all.loose.updateData = function(){
	
}