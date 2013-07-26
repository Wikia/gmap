/**
 * ContentEditable GMap node.
 *
 * @class
 * @extends ve.ce.LeafNode
 *
 * @constructor
 * @param {ve.dm.GMapNode} model Model to observe
 * @param {Object} [config] Config options
 */
ve.ce.GMapNode = function VeCeGMapNode( model, config ) {
	// Parent constructor
	ve.ce.LeafNode.call( this, model, config );

	// Mixin constructors
	ve.ce.ProtectedNode.call( this );
	ve.ce.FocusableNode.call( this );

	// Setup
	this.$image = $( '<img>' ).appendTo( this.$ );
	this.setImageURL();
};

/* Inheritance */

ve.inheritClass( ve.ce.GMapNode, ve.ce.LeafNode );

ve.mixinClass( ve.ce.GMapNode, ve.ce.ProtectedNode );

ve.mixinClass( ve.ce.GMapNode, ve.ce.FocusableNode );

/* Static Properties */

ve.ce.GMapNode.static.name = 'gmap';

ve.ce.GMapNode.static.tagName = 'div';

/* Methods */

/**
 * Handle attribute change events.
 *
 * @method
 * @param {string} key Attribute key
 * @param {string} from Old value
 * @param {string} to New value
 */
ve.ce.GMapNode.prototype.onAttributeChange = function () {
	this.setImageURL();
};

ve.ce.GMapNode.prototype.setImageURL = function() {
	var params = this.model.getAttribute( 'params' );
	this.$image
		.attr(
			'src',
			this.generateImageURL( params.lat, params.long, params.width, params.height, params.zoom )
		)
		.height( params.height )
		.width( params.width );
};

ve.ce.GMapNode.prototype.generateImageURL = function( latitude, longitude, width, height, zoom ) {
	var params = [];
	params.push( 'markers=' + latitude + ',' + longitude );
	params.push( 'size=' + width + 'x' + height );
	params.push( 'zoom=' + zoom );
	params.push( 'maptype=roadmap' );
	params.push( 'sensor=false' );
	return 'http://maps.googleapis.com/maps/api/staticmap?' + params.join( '&' );
};

/* Registration */

ve.ce.nodeFactory.register( ve.ce.GMapNode );
