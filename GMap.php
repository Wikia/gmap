<?php
/**
 * GMap extension
 */

// Define ResourceLoader module
$wgResourceModules['ext.gmap'] = array(
	'scripts' => array(
		'js/ve.dm.GMapNode.js',
		'js/ve.ce.GMapNode.js',
		'js/ve.ui.GMapEditButtonTool.js',
		'js/ve.ui.GMapEditDialog.js'
	),
	'dependencies' => array( 'ext.visualEditor.core' ),
	'localBasePath' => dirname( __FILE__ ),
	'remoteExtPath' => 'gmap'
);

// Add defined module to VisualEditor as a plugin
// (It's important to include/require GMap.php after VisualEditor.php in LocalSettings.php)
$wgVisualEditorPluginModules[] = 'ext.gmap';

// Hooks
$wgHooks['ParserFirstCallInit'][] = 'wfMapParserInit';

// Setup "gmap" parser hook
function wfMapParserInit( Parser $parser ) {
	$parser->setHook( 'gmap', 'wfMapRender' );
	return true;
}

// Render map
function wfMapRender( $input, array $args, Parser $parser, PPFrame $frame ) {
	$params = array();
	$params['markers'] = $args['lat'] . ',' . $args['long'];
	$params['size'] = $args['width'] . 'x' . $args['height'];
	$params['zoom'] = $args['zoom'];
	$params['maptype'] = 'roadmap';
	$params['sensor'] = 'false';
	return '<div style="float: right; margin: 0 0 1em 1em;"><img src="http://maps.googleapis.com/maps/api/staticmap?' . wfArrayToCgi( $params ) . '"/></div>';
}
