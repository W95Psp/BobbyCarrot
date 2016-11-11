
all.win = {};
all.win.wait = 10;

all.win.onstart = function(){
	if (localStorage) {
		if(!localStorage['stats'])
			localStorage['stats'] = new Array();
		
		if(!localStorage['stats']){
			localStorage['stats'] = JSON.stringify({});
		}
		var statsLvls = JSON.parse(localStorage['stats']);
		if(!statsLvls[CURRENT_LEVEL])
			statsLvls[CURRENT_LEVEL] = {stats: new Array()};
		
		statsLvls[CURRENT_LEVEL].completed = true;
		statsLvls[CURRENT_LEVEL].stats.push({time: all.game.conteur, deps: all.game.nbDeplacements});
		
		localStorage['stats'] = JSON.stringify(statsLvls);
	}
	CURRENT_LEVEL++;
	if (localStorage) {
		localStorage['currentLevel'] = CURRENT_LEVEL;
	}
}

all.win.draw = function(){
	ctx.drawImage(imgs.screen, 0, 0);
	ctx.fillText('WIN', 100, 100);
	if(all.win.wait>0){
		all.win.wait--;
	}else{
		start_scene('game');
	}
}
all.win.updateData = function(){
	
}