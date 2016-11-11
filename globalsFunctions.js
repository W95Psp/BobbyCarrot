var htmlCanvas;
var ctx;
var drawFunction;
var updateFunction;
var interval_updateData;
var interval_updateGraph;
var data_fpsGraph;
var data_fpsData;

iEvents = {};
var game_Stoped = true;
var nbTgame_Stoped = 0;

function sg(){
	clearInterval(interval_updateData);
	clearInterval(interval_updateGraph);
	game_Stoped = true;
}

function completeByXZero(number, nbZero){
	while((number+'').length<nbZero){
		number='0'+number;
	}
	return number;
}

function file(fichier)
     {
     if(window.XMLHttpRequest) // FIREFOX
          xhr_object = new XMLHttpRequest(); 
     else if(window.ActiveXObject) // IE
          xhr_object = new ActiveXObject("Microsoft.XMLHTTP"); 
     else 
          return(false); 
     xhr_object.open("GET", fichier, false); 
     xhr_object.send(null); 
     if(xhr_object.readyState == 4) return(xhr_object.responseText);
     else return(false);
     }

function rand(max){
	return Math.floor(Math.random()*(max+1));
}
function car2pol(c){
	im = c[1];
	re = c[0];
	var norme = Math.sqrt(re*re+im*im);
	var cos_eq = re/norme;
	var sin_eq = im/norme;
	var valueAngle = Math.acos(cos_eq);
	var valueAngleSin = Math.asin(sin_eq);
	count = 10;
	notGood = true;
	if(Math.cos(valueAngle)==Math.sin(valueAngle)){
		notGood = false;
	}else{
		valueAngle = valueAngleSin;
	}
	var chSign = 1;
	if(re<0){
		if(valueAngle<0)
			chSign = -1;
		valueAngle = Math.PI - Math.abs(valueAngle);
	}
	return [norme, valueAngle*chSign, cos_eq, sin_eq];
}
function pol2car(c){
	t = c[1];
	r = c[0];
	return [Math.round(Math.cos(t)*r*100)/100, Math.round(Math.sin(t)*r*100)/100];
}

var scenes;





function loadBinFile(file, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if(typeof VBArray == 'function'){
			var bytes = VBArray(xhr.responseBody).toArray();
		}else{
			var str = xhr.responseText;
			var ch, st, sh, bytes = [];
			for (var i = 0; i < str.length; i++){
			ch = str.charCodeAt(i);
			st = [];
			do {
				sh = (ch & 0xFFFF > 0x7F00) ? 16 : 8;
				st.unshift(ch & 0xFF);
				ch = ch >> sh;
			} while (ch);
			bytes = bytes.concat(st);
			}
		}
		console.log('/???asdasdsad', callback)
		callback(bytes);
	}
	};
	xhr.open("GET", file, true);
	xhr.send(null);
}





function initGame(scn, first, w, h, fpsGraph, fpsData, idHtmlCanvas){
	if(!fpsGraph)
		fpsGraph = 40;
	if(!fpsData)
		fpsData = fpsGraph;
	if(!idHtmlCanvas)
		idHtmlCanvas = 'htmlCanvas';
		
		
	var obj = document.getElementById(idHtmlCanvas);
	
	obj.ontouchmove = moveEventFunction;
	obj.onmousemove = moveEventFunction;
	obj.addEventListener('touchstart', function(event) {
		if(game_Stoped){
			nbTgame_Stoped++;
			if(nbTgame_Stoped>1)
				location.reload();
		}
		iEvents.touch = true;	
		iEvents.clickOrTouchDown = true;
		moveEventFunction(event);
		if(startClick)
			startClick();
	}, false);obj.addEventListener('touchend', function(event) {
		iEvents.touch = false;	
		iEvents.clickOrTouchDown = false;
		moveEventFunction(event);
		if(endClick)
			endClick();
	}, false);

	
	scenes = scn;
	data_fpsGraph = fpsGraph;
	data_fpsData = fpsData;
	htmlCanvas = document.getElementById(idHtmlCanvas);
	htmlCanvas.style.width = w+'px';
	htmlCanvas.style.height = h+'px';
	htmlCanvas.width = w;
	htmlCanvas.height = h;
	ctx = htmlCanvas.getContext('2d');
	// scenes.push([updateGraphFunction, updateDataFunction]);
	// setTimeout('start_scene("'+first+'")', 60);
	nbLoadedImage++;
}

function start_scene(n){
	if(scenes[n].onstart_before&&!scenes[n].onstart_before_loaded){
		scenes[n].onstart_before_loaded = true;
		scenes[n].onstart_before();
	}
	if(nbLoadedImage>=nbHaveToLoadImage){
		scenes[n].onstart_before_loaded = false;
		if(!game_Stoped){
			sg();
		}
		game_Stoped = false;
		if(scenes[n].onstart)
			scenes[n].onstart();
		interval_updateGraph = setInterval(scenes[n].draw, Math.round(1000/data_fpsGraph));
		interval_updateData = setInterval(scenes[n].updateData, Math.round(1000/data_fpsData));
	}else{
		setTimeout('start_scene("'+n+'")', 70);
	}
}


function moveEventFunction(e) {
    if (e.touches) {
        for (var i = 1; i <= e.touches.length; i++) {
            var p = getCoords(e.touches[i - 1]);
            iEvents.pos = p;
        }
    }
    else {
        var p = getCoords(e);
        iEvents.pos = p;
    }

    return false;
}

function getCoords(e) {
    if (e.offsetX) {
        return { x: e.offsetX, y: e.offsetY };
    }
    else if (e.layerX) {
        return { x: e.layerX, y: e.layerY };
    }
    else {
        return { x: e.pageX - htmlCanvas.offsetLeft, y: e.pageY - htmlCanvas.offsetTop };
    }
}






function eqLine(a, b){
	var vect = [b[0]-a[0], b[1]-a[1]];
	var pente = vect[1]/vect[0];
	var posOrigine = -pente*a[0] + a[1];
	return {a: pente, b: posOrigine, xMin: a[0], xMax: b[0]};
}
function deter(da, db){
	return (da.b-db.b)/(db.a-da.a);
}
function intersectIntervals(ints){
	var i = 'all';
	for(var j in ints){
		var o = [ints[j][0], ints[j][1]];
		if(o[0]>ints[j][1]){
			var k = o[0];
			o[0] = o[1];
			o[1] = k;
		}
		if(i=='all')
			i = ints[j];
		else if(i==[]){
			
		}else{
			if(o[0]>i[1]  ||  o[1]<i[0]){
				i = [];
			}else{
				if(o[1]<i[1]){
					i[1] = o[1];
				}
				if(o[0]>i[0]){
					i[0] = o[0];
				}
			}
		}
	}
	return i;
}
function calcPoint(d, x){
	return d.a*x+d.b;
}
function collision_with_droite(supOrInf, d1, d2){
	var interval = intersectIntervals([[d1.xMin, d1.xMax], [d2.xMin, d2.xMax]]);
	if(interval.length<2){
		// alert("("+d1.xMin+", "+d1.xMax+") ET ("+d2.xMin+', '+d2.xMax+')');
		return false;
	}
	var y_a1 = calcPoint(d1, interval[0]);
	var y_b1 = calcPoint(d1, interval[1]);
	var y_a2 = calcPoint(d2, interval[0]);
	var y_b2 = calcPoint(d2, interval[1]);
	var isSupA = y_a1>y_a2;
	var isSupB = y_b1>y_b2;
	if(supOrInf=='inf'){
		isSupA = !isSupA;
		isSupB = !isSupB;
	}
	if(isSupA||isSupB){
		return true;
	}
	return false;
}

function collision_inter_droites(lot, d){
	var gauche = [lot[0], lot[1]];
	var droite = [lot[2], lot[3]];
	var collGauche = collision_with_droite('sup', gauche[1], d)  &&   collision_with_droite('inf', gauche[0], d);
	var collDroite = collision_with_droite('sup', droite[1], d)  &&   collision_with_droite('inf', droite[0], d);
	if(collGauche||collDroite){
		return true;
	}
	return false;
}







function clear(c){
	if(!c)
		ctx.fillStyle='white';
	else
		ctx.fillStyle=c;
	ctx.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
}

var nbHaveToLoadImage = 1;
var nbLoadedImage = 0;

function loadImg(src){
	nbHaveToLoadImage++;
	var imageObj = new Image();
	imageObj.crossOrigin = 'Anonymous';
	imageObj.onload = function() {
		nbLoadedImage++;
	};
	imageObj.src = src;
	return imageObj;
}