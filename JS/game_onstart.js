all.game.onstart_before = function(){
	loadBinFile("Lvls/normal17.blm", function(vv){
		all.game.treatBinLvl(vv);

		all.game.onstartREAL();
	});
}

all.game.onstart = function(){
	// all.game.pauseAnim = 0.6;
	// all.game.pauseAnimMode = 0;
	// PAUSE_MODE = false;
	
	// playAudio('audio_4');
	// if (localStorage) {
	// 	if(localStorage['currentLevel'])
	// 		CURRENT_LEVEL = localStorage['currentLevel'];
	// }
	// pauseAudio('audio_1');
	// if(all.game.map){
	// 	all.game.map = new Array();
	// 	for(var i in all.game.maps[CURRENT_LEVEL]){
	// 		var o = new Array();
	// 		for(var j in all.game.maps[CURRENT_LEVEL][i]){
	// 			o.push(-Math.abs((all.game.maps[CURRENT_LEVEL][i][j])+1));
	// 		}
	// 		all.game.map.push(o);
	// 	}
	// }
	
	
	// all.game.vitPerso = 2;
	// all.game.dir = 4;
	// p_init=null;
	// setTimeout('p_init=null;all.game.dir = 4;decX=0;decY=0;', 200);
	
	// all.game.dep = [0, 0];
	// all.game.dimCase = [20,20];

	// decX = 0;
	// decY = 0;
	// decX2 = 80;
	// decY2 = 0;
	
	// all.game.texChange = 0;
	
	// all.game.gKeys = [0, 0, 0];

	// selectorEdit = [5, 5];
	// selectorEdit2 = [0, 0];
	// all.game.editorMode = false;
	// all.game.editorMode_choose = false;
	
	// toChange = -1;
	// accel = 1;
	// choiceTex = -1;
	// anim_perso = true;
	// p_init = [0, 0];
	// all.game.pauseAfterWalk = true;

	// all.game.showLevelNumber = 50;
	
	
	// all.game.nbCarrotes = 0;

	// for(var iww in all.game.map){
	// 	for(var jww in all.game.map[iww]){
	// 		if(all.game.map[iww][jww]==-(21)-1){
	// 			all.game.pos = new Array(parseInt(jww), parseInt(iww));
	// 		}
	// 		if(all.game.map[iww][jww]==-(19)-1){
	// 			all.game.nbCarrotes++;
	// 		}
	// 	}
	// }
	
	// all.game.majMap();
	
	// all.game.conteur = 0;
	// all.game.conteur_disp = "00:00";
	// all.game.nbDeplacements = 0;
	// if(all.game.conteur_interval)
	// 	clearInterval(all.game.conteur_interval);
	// all.game.conteur_interval = setInterval(function(){
	// 	if(!PAUSE_MODE){
	// 		all.game.conteur++;
	// 		all.game.conteur_disp = completeByXZero(Math.floor(all.game.conteur/60),2) + ":" + completeByXZero(all.game.conteur%60,2);
	// 	}
	// },1000);
}


all.game.onstartREAL = function(){
	all.game.pauseAnim = 0.6;
	all.game.pauseAnimMode = 0;
	PAUSE_MODE = false;
	
	playAudio('audio_4');
	if (localStorage) {
		if(localStorage['currentLevel'])
			CURRENT_LEVEL = localStorage['currentLevel'];
	}
	pauseAudio('audio_1');
	if(all.game.map){
		all.game.map = new Array();
		for(var i in all.game.maps[CURRENT_LEVEL]){
			var o = new Array();
			for(var j in all.game.maps[CURRENT_LEVEL][i]){
				o.push(-Math.abs((all.game.maps[CURRENT_LEVEL][i][j])+1));
			}
			all.game.map.push(o);
		}
	}
	
	
	all.game.vitPerso = 2;
	all.game.dir = 4;
	p_init=null;
	setTimeout('p_init=null;all.game.dir = 4;decX=0;decY=0;', 200);
	
	all.game.dep = [0, 0];
	all.game.dimCase = [20,20];

	decX = 0;
	decY = 0;
	decX2 = 80;
	decY2 = 0;
	
	all.game.texChange = 0;
	
	all.game.gKeys = [0, 0, 0];

	selectorEdit = [5, 5];
	selectorEdit2 = [0, 0];
	all.game.editorMode = false;
	all.game.editorMode_choose = false;
	
	toChange = -1;
	accel = 1;
	choiceTex = -1;
	anim_perso = true;
	p_init = [0, 0];
	all.game.pauseAfterWalk = true;

	all.game.showLevelNumber = 50;
	
	
	all.game.nbCarrotes = 0;

	for(var iww in all.game.map){
		for(var jww in all.game.map[iww]){
			if(all.game.map[iww][jww]==-(21)-1){
				all.game.pos = new Array(parseInt(jww), parseInt(iww));
			}
			if(all.game.map[iww][jww]==-(19)-1){
				all.game.nbCarrotes++;
			}
		}
	}
	
	all.game.majMap();
	
	all.game.conteur = 0;
	all.game.conteur_disp = "00:00";
	all.game.nbDeplacements = 0;
	if(all.game.conteur_interval)
		clearInterval(all.game.conteur_interval);
	all.game.conteur_interval = setInterval(function(){
		if(!PAUSE_MODE){
			all.game.conteur++;
			all.game.conteur_disp = completeByXZero(Math.floor(all.game.conteur/60),2) + ":" + completeByXZero(all.game.conteur%60,2);
		}
	},1000);
}
