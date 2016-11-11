all.game.DrawEditorModeChoose = function(){
	var count = 0;
	for(var i=0; i<10; i++){
		for(var j=0; j<5; j++){
			var t = all.game.textures[count];
			if(t)
				ctx.drawImage(t.image,  t.pos[0]*t.pos[2],  (t.pos[1])*t.pos[3], t.pos[2], t.pos[3], 40*i+20, 40*j+20, 30, 30);
			count++;
		}
	}
	if(selectorEdit2){
		ctx.beginPath();
		ctx.rect(40*selectorEdit2[0]+20, 40*selectorEdit2[1]+20, 30, 30);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
		ctx.fill();
		ctx.closePath();
	}
	return 1;
}



// fucntion dr(){
	// for(var i in all.game.map){
			// for(var j in all.game.map[i]){
				// if(all.game.map[j]){
					// var t = all.game.textures[all.game.map[j][i]];
					// if(t.anim_n==0||(all.game.map[j][i]==44&&all.game.nbCarrotes>0))
						// var n = 0;
					// else
						// var n = Math.floor(all.game.texChange)%t.anim_n;
					// ctx.drawImage(t.image,  (t.pos[0]+n)*t.pos[2],  (t.pos[1])*t.pos[3], t.pos[2], t.pos[3], decX2+all.game.dimCase[0]*i+all.game.dep[0], decY2+all.game.dimCase[1]*j+all.game.dep[1], all.game.dimCase[0], all.game.dimCase[1]);
				// }
			// }
		// }
// }







all.game.drawTextures = function(){
	var shouldReload = 0;
	ctx.drawImage(all.game.drawTextures_preCalc, 0, 0);
	for(var i in all.game.map){
		for(var j in all.game.map[i]){
			if(all.game.map[j]){
				var num = all.game.map[j][i];
				var ok = false;
				if(all.game.map[j][i]<0){
					shouldReload++;
					num = -num-1;
					ok = true;
				}
			
				var t = all.game.textures[num];
				if(t.anim_n==0||(num==44&&all.game.nbCarrotes>0))
					var n = 0;
				else{
					var n = Math.floor(all.game.texChange)%t.anim_n;
					ok = true;
				}
				// if(ok)
				ctx.drawImage(t.image,  (t.pos[0]+n)*t.pos[2],  (t.pos[1])*t.pos[3], t.pos[2], t.pos[3], decX2+all.game.dimCase[0]*i+all.game.dep[0], decY2+all.game.dimCase[1]*j+all.game.dep[1], all.game.dimCase[0], all.game.dimCase[1]);
			}
		}
	}
	if(shouldReload>30){
		setTimeout('all.game.majMap()', 1);
		shouldReload = false;
	}
}

all.game.draw = function(){
	if(all.game.editorMode_choose)
		return all.game.DrawEditorModeChoose();
	
	all.game.drawTextures();
	
	
	if(all.game.editorMode){
		ctx.beginPath();
		ctx.rect(all.game.dimCase[0]*selectorEdit[0]+all.game.dep[0], all.game.dimCase[1]*selectorEdit[1]+all.game.dep[1], all.game.dimCase[0], all.game.dimCase[1]);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
		ctx.fill();
		ctx.closePath();
	}else{
		if(anim_perso){
			if(all.game.dir==4)
				var n = Math.floor(all.game.texChange)%3;
			else
				var n = Math.floor(all.game.texChange)%all.game.img_perso_cut.anim_n;
		}else{
			var n = 0;
		}
		ctx.drawImage(imgs.perso[all.game.dir], all.game.img_perso_cut.pos[0]*n, 0, all.game.img_perso_cut.pos[0], all.game.img_perso_cut.pos[1], decX2+decX+all.game.pos[0]*all.game.dimCase[0]+all.game.dep[0], decY2+decY+all.game.pos[1]*all.game.dimCase[1]+all.game.dep[1], all.game.dimCase[0], all.game.dimCase[1]);
	}
	
	if(all.game.showLevelNumber>0){
		ctx.textAlign = 'center';
		if(all.game.showLevelNumber>10){
			var alphavalue = 1;
		}else{
			var alphavalue = all.game.showLevelNumber/10;
		}
		ctx.font = '30px qsdfqsd';
		ctx.fillStyle = 'rgba(0, 0, 0, '+alphavalue+')';
		ctx.strokeStyle = 'rgba(255, 255, 255, '+(alphavalue/2)+')';
		ctx.lineWidth = 10;
		ctx.strokeText("Niveau "+CURRENT_LEVEL, 240, 150);
		ctx.strokeStyle = 'rgba(255, 255, 255, '+alphavalue+')';
		ctx.lineWidth = 5;
		ctx.strokeText("Niveau "+CURRENT_LEVEL, 240, 150);
		ctx.fillText("Niveau "+CURRENT_LEVEL, 240, 150);
		all.game.showLevelNumber--;
		
		ctx.font = '14px Arial';
		ctx.textAlign = 'end';
	}
	ctx.fillStyle='white';
	ctx.fillText(all.game.nbCarrotes, 31, 21);
	ctx.fillText(all.game.conteur_disp, 44, 41);
	ctx.drawImage(imgs.carrote, 34, 8);
	ctx.drawImage(imgs.playPause, 8, 60);
	
	ctx.fillStyle = 'rgba(83, 163, 64, '+(1-all.game.pauseAnim)+')';
	ctx.fillRect(8, 60, 64, 35);
}

