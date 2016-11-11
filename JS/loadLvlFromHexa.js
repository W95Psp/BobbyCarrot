var GLOBAL_MAP_BINLOAD;
all.game.treatBinLvl = function(all){
	var first = new Array();
	var second = new Array();
	var count = 4;
	// var debug = '';
	console.log(all[4]);
	while(all.length>count){
		second.push(all[count]);
		// debug += '<span style="width: 60px; display: inline-block; text-align: center;">'+all[count]+'</span>';
		if(second.length>15){
			// debug += '<br/>';
			first.push(second.slice(0));
			second = new Array();
		}
		count++;
	}
	if(second.length>0){
		// debug += '<br/>';
		first.push(second.slice(0));
		second = new Array();
	}
	
	window.all.game.map = first;
}