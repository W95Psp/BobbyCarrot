<?php
$mep = false;
function gg($n){
	global $mep;
	$filename = "normal".$n.".blm";
	$handle = fopen($filename, "rb");
	$fsize = filesize($filename);
	$contents = fread($handle, $fsize);
	fclose($handle);
	$w=16;
	$c = -3;
	$nlines = 0;
	echo 'all.game.maps.push([[';
	for($i = 0; $i < $fsize; $i++)
	{ 
		$asciiCharacter = $contents[$i];
		$base10value = ord($asciiCharacter);
		$base2representation = base_convert($base10value, 10, 2);
		if($c>=0&&$nlines<16){
			if($mep)
				echo "<div style='width: 50px; display: inline-block; text-align: center;'>";
			echo $base10value;
			if($mep)
				echo '</div>';
			echo ',';
		}
		$c++;
		if($c==$w){
			if($nlines<15){
				echo '0],';
				if($mep)echo '<br/>';
				echo '[';
			}
			$c = 0;
			$nlines++;
		}
	}
	echo '0]]);';
	if($mep)echo '<br/><br/>';
}
gg('01');
gg('02');
gg('03');
gg('04');
gg('05');
gg('06');
gg('07');
gg('08');
gg('09');
for($i=10; $i<=30; $i++)
gg($i.'');
?>