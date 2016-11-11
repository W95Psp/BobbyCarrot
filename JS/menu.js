
all.menu = {};
all.menu.sc = 20;
all.menu.scInc = 0.03;
all.menu.dec = 0;
all.menu.dectext = 230;
all.menu.dectextInc = 10;
all.menu.s = 0;
all.menu.dectextEcarte = 1.2;
all.menu.te = 0;
var sInt = 0;
all.menu.items = new Array("Charger la partie", "Nouvelle partie", "Top 10 scores", "Meilleurs temps", "A propos");

all.menu.onstart = function(){
	playAudio('audio_1');
}

all.menu.draw = function(){
	clear('#c1e0ff');
	ctx.save();
	
	if(all.menu.sc<=1){
		ctx.scale(all.menu.sc, all.menu.sc);
		if(all.menu.sc>0.65){
			all.menu.scInc+=0.01;
			all.menu.dec+=4;
		}else if(all.menu.scInc>0.01){
			all.menu.dec+=2;
			all.menu.scInc*=0.3;
		}else{
			all.menu.scInc = 0;
		}
		all.menu.sc-=all.menu.scInc;
	}else{
		all.menu.sc--;
	}
	ctx.drawImage(imgs.back_menu, 60-all.menu.dec, 20);
	ctx.restore();
	if(all.menu.scInc==0){
		ctx.fillStyle = '#444444';
		ctx.font = '40px arial';
		ctx.textAlign = 'start';
		ctx.fillText("Menu", 300+all.menu.dectext, 60);
		ctx.font = '18px arial';
		ctx.textAlign = 'center';
		
		for(var i in all.menu.items){
			sInt += 0.01;
			if(sInt>0.6)
				sInt = 0.6;
			ctx.strokeStyle='rgba(0, 0, 0, '+sInt+')';
			var py = i*20+90+all.menu.te*(i+1);
			if(all.menu.s==i){
				ctx.strokeText(all.menu.items[i], 350+all.menu.dectext, py, 200);
			}
			ctx.fillText(all.menu.items[i], 350+all.menu.dectext, py, 200);
			var pg = 2;
			if(iEvents.pos && (iEvents.pos.y>py-(16+pg))	&&	(iEvents.pos.y<py+(4+pg))){
				if(all.menu.s!=i){
					sInt = 0;
					all.menu.s = i;
				}else{
					if(sInt>=0.5&&iEvents.clickOrTouchDown){
						sg();
						if(i==0){
							setTimeout("start_scene('game');", 200);
						}else if(i==1){
							if(confirm("Voulez-vous démarrer une nouvelle partie ? Vous perdrez alors votre avancement précédent.")){
								CURRENT_LEVEL = 0;
								if (localStorage) {
									localStorage['currentLevel'] = CURRENT_LEVEL;
								}
								setTimeout("start_scene('game');", 200);
							}
						}
					}
				}
			}
		}
		if(all.menu.dectextInc>0.01){
			all.menu.dectext-=all.menu.dectextInc;
			if(all.menu.dectext>30.001){
				all.menu.dectextInc+=0.25;
			}else{
				all.menu.dectextInc*=0.6;
			}
		}
		if(all.menu.dectextInc<3&&all.menu.dectextEcarte>0.01){
			all.menu.dectextEcarte*=0.5;
			all.menu.te+=all.menu.dectextEcarte;
		}
	}
}
all.menu.updateData = function(){
	
}