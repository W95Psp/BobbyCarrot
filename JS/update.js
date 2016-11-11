
function startClick(){
	p_init = [iEvents.pos.x,iEvents.pos.y];
}



function endClick(){
	if(!p_init)
		return 0;
	if(all.game.editorMode&&!all.game.editorMode_choose){
		all.game.editorMode_choose = true;
		iEvents.clickOrTouchDown = false;
	}else if(all.game.editorMode_choose&&selectorEdit2){
		choiceTex = selectorEdit2[1]+selectorEdit2[0]*5;
		all.game.editorMode_choose = false;
	}
	var diff = [p_init[0]-iEvents.pos.x, p_init[1]-iEvents.pos.y];
	if(Math.abs(diff[0]*3)-10>Math.abs(diff[1])){
		if(diff[0]>0)
			toChange = 0;
		else
			toChange = 1;
	}else if(Math.abs(diff[1]*3)-10>Math.abs(diff[0])){
		if(diff[1]>0)
			toChange = 2;
		else
			toChange = 3;
	}else if(Math.abs(diff[0])<10&&Math.abs(diff[1])<10){
		toChange = 4;
	}
}
var NEXTTIME_PAUSE = false;
all.game.changeAllMatchFor = function(a, b, recip){
	for(var i in all.game.map){
		for(var j in all.game.map[i]){
			if(all.game.map[j]){
				var num = all.game.map[j][i];
				if((num<0 && -num-1==a) || num==a){
					all.game.map[j][i] = -b-1;
				}else if(recip && ((num<0 && -num-1==b) || num==b)){
					all.game.map[j][i] = -a-1;
				}
			}
		}
	}
}
all.game.changeAllMatchForQuatre = function(a, b, c, d){
	for(var i in all.game.map){
		for(var j in all.game.map[i]){
			if(all.game.map[j]){
				var num = all.game.map[j][i];
				if(num<0)
					num = -num-1;
				if(num==a){
					all.game.map[j][i] = -b-1;
				}else if(num==b){
					all.game.map[j][i] = -c-1;
				}else if(num==c){
					all.game.map[j][i] = -d-1;
				}else if(num==d){
					all.game.map[j][i] = -a-1;
				}
			}
		}
	}
}
all.game.collisions = function(newPos, ancPos){
	if(!newPos[0]){
		return 0;
	}
	var nm = all.game.map[newPos[1]][newPos[0]];
	if(nm<0)
		nm = -nm-1;
	var am = all.game.map[ancPos[1]][ancPos[0]];
	if(am<0)
		am = -am-1;
	var nm_new = nm;
	var am_new = am;
	if(nm<=17){
		all.game.dir = 4;
	}else if(nm==19){
		nm_new = 20;
		all.game.nbCarrotes--;
	}else if(nm==24&&!(all.game.dir==2||all.game.dir==0)){
		all.game.dir = 4;
	}else if(nm==25&&!(all.game.dir==2||all.game.dir==1)){
		all.game.dir = 4;
	}else if(nm==26&&!(all.game.dir==3||all.game.dir==1)){
		all.game.dir = 4;
	}else if(nm==27&&!(all.game.dir==3||all.game.dir==0)){
		all.game.dir = 4;
	}else if(nm==28&&!(all.game.dir==0||all.game.dir==1)){
		all.game.dir = 4;
	}else if(nm==29&&!(all.game.dir==3||all.game.dir==2)){
		all.game.dir = 4;
	}else if(nm==31){
		imgs.screen = loadImg(htmlCanvas.toDataURL());
		sg();
		setTimeout("start_scene('loose');", 300);
	}else if (nm>=32&&nm<=37){
		if(nm%2==0){										//C'est une clef
			all.game.gKeys[(nm-32)/2]++;
			nm_new = 18;
		}else if(all.game.gKeys[((nm-1)-32)/2]>0){			//C'est un vérrou
			all.game.gKeys[((nm-1)-32)/2]--;
			nm_new = 18;
		}else{
			all.game.dir = 4;
		}
	}else if(nm>=40&&nm<=43){
		if(all.game.dir==nm-40){
			all.game.dir = nm-40;
			// accel = 1.5;
			anim_perso = false;
		}else{
			all.game.dir = 4;
		}
	}else if(nm>=44&&all.game.nbCarrotes==0){
		clearInterval(all.game.conteur_interval);
		imgs.screen = loadImg(htmlCanvas.toDataURL());
		sg();
		setTimeout("start_scene('win');", 300);
	}
	if(am>=24&&am<=27){
		if(am==24&&!(all.game.dir==3||all.game.dir==1)){
			all.game.dir = 4;
		}else if(am==25&&!(all.game.dir==3||all.game.dir==0)){
			all.game.dir = 4;
		}else if(am==26&&!(all.game.dir==2||all.game.dir==0)){
			all.game.dir = 4;
		}else if(am==27&&!(all.game.dir==2||all.game.dir==1)){
			all.game.dir = 4;
		}else{
			am_new = 24+((am-24+1)%4);
		}
	}else if(am==22){
		all.game.changeAllMatchFor(29, 28, true);
		all.game.changeAllMatchFor(22, 23, true);
		all.game.changeAllMatchForQuatre(24, 25, 26, 27);
	}else if(am>=28&&am<=29){
		if(am==28&&!(all.game.dir==1||all.game.dir==0)){
			all.game.dir = 4;
		}else if(am==29&&!(all.game.dir==3||all.game.dir==2)){
			all.game.dir = 4;
		}else{
			am_new = 28+((am-28+1)%2);
		}
	}else if(am==30){
		am_new = 31;
	}else if(am==38){
		all.game.changeAllMatchFor(40, 41, true);
		all.game.changeAllMatchFor(42, 43, true);
		all.game.changeAllMatchFor(38, 39, true);
	}else if(  (am>=40&&am<=43)  &&  !(nm>=40&&nm<=43)){
		accel = 1;
		anim_perso = true;
		NEXTTIME_PAUSE = true;
	}
	// alert("New : "+nm+" et Anc : "+am);
	if(nm_new!=nm)
		all.game.map[newPos[1]][newPos[0]] = -nm_new-1;
	if(am_new!=am)
		all.game.map[ancPos[1]][ancPos[0]] = -am_new-1;
}

function export_map(){
	document.body.innerHTML = JSON.stringify(all.game.map, null, 2);
}
var nc = [];
all.game.updateData = function(){
	if(PAUSE_MODE){
		if(!all.game.pauseAnimMode){
			all.game.pauseAnim+=0.03;
		}else{
			all.game.pauseAnim-=0.03;
		}
		if(all.game.pauseAnim>1||all.game.pauseAnim<0.2){
			all.game.pauseAnim = 0.2+Math.floor(all.game.pauseAnim)/5*4;
			all.game.pauseAnimMode = 1-all.game.pauseAnimMode;
		}
		if(iEvents.pos.x>8&&iEvents.pos.x<72&&iEvents.pos.y>60&&iEvents.pos.y<95&&iEvents.clickOrTouchDown){
			PAUSE_MODE = false;
			all.game.pauseAnim = 0.6;
			iEvents.clickOrTouchDown = false;
		}
		return 0;
	}else if(iEvents.pos.x>8&&iEvents.pos.x<72&&iEvents.pos.y>60&&iEvents.pos.y<95&&iEvents.clickOrTouchDown){
		PAUSE_MODE = true;
		iEvents.clickOrTouchDown = false;
	}
	
	
	if(all.game.editorMode_choose){
		
		if(iEvents.pos)
			selectorEdit2 = [Math.round((-20+iEvents.pos.x-30/2)/40), Math.round((-20+iEvents.pos.y-30/2)/40)];
		if(selectorEdit2[0]<0||selectorEdit2[0]>8   ||   selectorEdit2[1]<0||selectorEdit2[1]>4)
			selectorEdit2 = false;
	}else if(all.game.editorMode){
		if(choiceTex>0&&selectorEdit){
			all.game.map[selectorEdit[1]][selectorEdit[0]] = choiceTex;
			choiceTex = -1;
		}
		all.game.texChange+=0.6;
		if(iEvents.pos)
			selectorEdit = [Math.round((iEvents.pos.x-all.game.dimCase[0]/2)/all.game.dimCase[0]), Math.round((iEvents.pos.y-all.game.dimCase[1]/2)/all.game.dimCase[1])];
	}else{
		all.game.texChange+=0.6;
		if(all.game.dir==0)
			decX-=all.game.vitPerso*accel;
		if(all.game.dir==1)
			decX+=all.game.vitPerso*accel;
		if(all.game.dir==2)
			decY-=all.game.vitPerso*accel;
		if(all.game.dir==3)
			decY+=all.game.vitPerso*accel;
		
		if(Math.abs(decX)>=all.game.dimCase[0]   ||  Math.abs(decY)>=all.game.dimCase[1]){
			if(NEXTTIME_PAUSE){
				all.game.dir = 4;
				NEXTTIME_PAUSE = false;
			}
			if(all.game.pauseAfterWalk)
				all.game.dir = 4;
			accel = 1;
			anim_perso = true;
			all.game.pos[0]+=Math.ceil(decX/all.game.dimCase[0]);
			all.game.pos[1]+=Math.ceil(decY/all.game.dimCase[1]);
			nc = [all.game.pos[0],all.game.pos[1]];
			decX = 0;
			decY = 0;
			if(toChange>=0){
				all.game.nbDeplacements++;
				all.game.dir = toChange;
				toChange = -1;
			}
			if(all.game.dir==0)
				nc[0]--;
			if(all.game.dir==1)
				nc[0]++;
			if(all.game.dir==2)
				nc[1]--;
			if(all.game.dir==3)
				nc[1]++;
			all.game.collisions(nc, all.game.pos);
		}
		if(toChange>=0&&all.game.dir==4){
			all.game.nbDeplacements++;
			all.game.dir = toChange;
			toChange = -1;
			nc = [all.game.pos[0],all.game.pos[1]];
			
			if(all.game.dir==0)
				nc[0]--;
			if(all.game.dir==1)
				nc[0]++;
			if(all.game.dir==2)
				nc[1]--;
			if(all.game.dir==3)
				nc[1]++;
			
			all.game.collisions(nc, all.game.pos);
		}
	}
}