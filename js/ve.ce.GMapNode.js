ve.ce.GMapNode = function VeCeGMapNode( model, config ) {
	ve.ce.LeafNode.call( this, model, config );

	ve.ce.ProtectedNode.call( this );

	ve.ce.FocusableNode.call( this );

	this.$imgMap = $( '<img>' ).appendTo( this.$ );
	this.updateMapUrl();
};

ve.inheritClass( ve.ce.GMapNode, ve.ce.LeafNode );

ve.mixinClass( ve.ce.GMapNode, ve.ce.ProtectedNode );

ve.mixinClass( ve.ce.GMapNode, ve.ce.FocusableNode );

ve.ce.GMapNode.static.name = 'gmap';

ve.ce.GMapNode.static.tagName = 'div';

ve.ce.GMapNode.prototype.onAttributeChange = function () {
	this.updateMapUrl();
};

ve.ce.GMapNode.prototype.updateMapUrl = function() {
	var params = this.model.getAttribute( 'params' );
	this.$imgMap.attr(
		'src',
		this.getStaticMapUrl(
			params.lat,
			params.long,
			params.width,
			params.height,
			params.zoom
		)
	);
};

ve.ce.GMapNode.prototype.getStaticMapUrl = function( latitude, longitude, width, height, zoom ) {
	var params = [];
	params.push( 'markers=' + latitude + ',' + longitude );
	params.push( 'size=' + width + 'x' + height );
	params.push( 'zoom=' + zoom );
	params.push( 'maptype=roadmap' );
	params.push( 'sensor=false' );
	return 'http://maps.googleapis.com/maps/api/staticmap?' + params.join( '&' );
};

ve.ce.nodeFactory.register( ve.ce.GMapNode );
