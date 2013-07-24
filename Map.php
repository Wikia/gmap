<?php

// Hooks
$wgHooks['ParserFirstCallInit'][] = 'wfMapParserInit';

function wfMapParserInit( Parser $parser ) {
	$parser->setHook( 'map', 'wfMapRender' );
	return true;
}

function wfMapRender( $input, array $args, Parser $parser, PPFrame $frame ) {
	$params = array();
	$params['markers'] = $args['lat'] . ',' . $args['long'];
	$params['size'] = $args['width'] . 'x' . $args['height'];
	$params['zoom'] = $args['zoom'];
	$params['maptype'] = 'roadmap';
	$params['sensor'] = 'false';
	return '<img src="http://maps.googleapis.com/maps/api/staticmap?' . wfArrayToCgi( $params ) . '"/>';
}
