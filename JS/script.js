var imgs = {};

var decX;
var decY;
var decX2;
var decY2;
var selectorEdit;
var selectorEdit2;
var toChange;
var accel;
var choiceTex;
var anim_pers;
var p_init;

imgs.tileset = loadImg('textures/tileset.png');
imgs.back_menu = loadImg('back.png');
imgs.carrote = loadImg('textures/carrote.png');
imgs.playPause = loadImg('textures/playPause.png');

var PAUSE_MODE;

all.game.textures = new Array();
for(var i=0; i<=4; i++){
	for(var j=0; j<=7; j++){
		all.game.textures.push({pos: [j, i, 16, 16], anim_n:0, image: imgs.tileset});
	}
}
all.game.textures.push({pos: [0, 0, 16, 16], anim_n:4, image: loadImg('textures/tile_conveyor_left.png')});	//Esc gauche		40
all.game.textures.push({pos: [0, 0, 16, 16], anim_n:4, image: loadImg('textures/tile_conveyor_right.png')});	//Esc droit		41
all.game.textures.push({pos: [0, 0, 16, 16], anim_n:4, image: loadImg('textures/tile_conveyor_up.png')});	//Esc haut			42
all.game.textures.push({pos: [0, 0, 16, 16], anim_n:4, image: loadImg('textures/tile_conveyor_down.png')});	//Esc bas			43
all.game.textures.push({pos: [0, 0, 16, 16], anim_n:4, image: loadImg('textures/tile_finish.png')});	//Fin					44
all.game.textures.push({pos: [5, 5, 16, 16], anim_n:0, image: imgs.tileset});	//OeufVide			45
all.game.textures.push({pos: [6, 5, 16, 16], anim_n:0, image: imgs.tileset});	//Oeuf				46


imgs.perso = new Array(loadImg('bobby/left.png'), loadImg('bobby/right.png'), loadImg('bobby/up.png'), loadImg('bobby/down.png'), loadImg('bobby/idle.png'));
all.game.img_perso_cut = {anim_n: 8, pos: [18, 25]};


function playAudio(id) {
	if (window.HTMLAudioElement&&document.getElementById(id)) {
		document.getElementById(id).play();
	}
}
function pauseAudio(id) {
	if (window.HTMLAudioElement) {
		document.getElementById(id).pause();
	}
}

CURRENT_LEVEL = 0;

all.game.majMapMAJ = new Array();

all.game.majMap = function(){
	if(!all.game.drawTextures_preCalc)
		clear('#53a340');
	else
		ctx.drawImage(all.game.drawTextures_preCalc, 0, 0);
	
	for(var i in all.game.map){for(var j in all.game.map[i]){
		if(all.game.map[j]){
			if(all.game.map[j][i]<0){
				all.game.majMapMAJ.push([i, j]);
				var num = -all.game.map[j][i]-1;
				var t = all.game.textures[num];
				if(t.anim_n==0||(num==44&&all.game.nbCarrotes>0))
					ctx.drawImage(t.image,  (t.pos[0])*t.pos[2],  (t.pos[1])*t.pos[3], t.pos[2], t.pos[3], decX2+all.game.dimCase[0]*i+all.game.dep[0], decY2+all.game.dimCase[1]*j+all.game.dep[1], all.game.dimCase[0], all.game.dimCase[1]);
			}
		}
	}}
	if(!all.game.drawTextures_preCalc)
		all.game.drawTextures_preCalc = loadImg(htmlCanvas.toDataURL());
	else{
		all.game.drawTextures_preCalc_tmp = new Image();
		all.game.drawTextures_preCalc_tmp.onload = function(){
			all.game.drawTextures_preCalc = all.game.drawTextures_preCalc_tmp;
			w = 'not_null';
			while(w){
				var w = all.game.majMapMAJ.pop();
				if(w!='not_null'&&w&&all.game.map[w[0]])
					all.game.map[w[0]][w[1]] = -all.game.map[w[0]][w[1]]-1;
			}
		};
		all.game.drawTextures_preCalc_tmp.src = htmlCanvas.toDataURL();
	}
}
	
all.game.depWithKeys = function(e){
	if (window.event)
		e = window.event;
	var c = e.keyCode;
	// alert(c+" => "+(37-c)+" => "+([0, 3, 1, 2])[c-37]);
	if(c>=37&&c<=40)
		toChange=([0, 2, 1, 3])[c-37];
}

document.body.onkeydown = all.game.depWithKeys;


initGame(all, 'menu', 480, 320, 25);
start_scene('menu');
// start_scene('game');