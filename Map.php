<?php

// Hooks
$wgHooks['ParserFirstCallInit'][] = 'wfMapParserInit';

// <map> hook
function wfMapParserInit( Parser $parser ) {
	global $wgOut;

	$wgOut->addScriptFile( 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBbl1MHJN2K67TjrFPWjnxlZTgYTcO7EQM&sensor=false', '' );

	$parser->setHook( 'map', 'wfMapRender' );

	return true;
}

// Render Map
function wfMapRender( $input, array $args, Parser $parser, PPFrame $frame ) {
	$mapId = 'map-'. Math.rand();

	// HTML Output
	$html = '<div id="'. $mapId .'"></div>';

	// Google Maps init script
	$html .= "<script>function initialize() { var mapOptions = { center: new google.maps.LatLng(". $args['lat'] .", ". $args['long'] ."), zoom: ". $args['zoom'].", mapTypeId: google.maps.MapTypeId.ROADMAP }; var map = new google.maps.Map(document.getElementById('". $mapId ."'), mapOptions); $('#". $mapId ."').height('". $args['height'] ."').width('". $args['width'] ."');} window.addEventListener('load', initialize, false);</script>";

	return $html;
}
