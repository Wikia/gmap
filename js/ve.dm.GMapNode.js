ve.dm.GMapNode = function VeDmGMapNode( length, element ) {
	ve.dm.LeafNode.call( this, 0, element );
};

ve.inheritClass( ve.dm.GMapNode, ve.dm.LeafNode );

ve.dm.GMapNode.static.name = 'gmap';

ve.dm.GMapNode.static.isContent = true;

ve.dm.GMapNode.static.matchRdfaTypes = [ 'mw:Extension/gmap' ];

ve.dm.GMapNode.static.enableAboutGrouping = true; // It's necessary because of the bug in Parsoid

ve.dm.GMapNode.static.toDataElement = function ( domElements ) {
	var dataElement,
		mwDataJSON = domElements[0].getAttribute( 'data-mw' ),
		mwData = mwDataJSON ? JSON.parse( mwDataJSON ) : {};

	dataElement = {
		'type': 'gmap',
		'attributes': {
			'mw': mwData,
			'originalMw': mwDataJSON,
			'params': mwData.attrs
		}
	};

	return dataElement;
};

ve.dm.GMapNode.static.toDomElements = function ( dataElement, doc ) {
	return [ doc.createElement( 'div' ) ];
};

ve.dm.modelRegistry.register( ve.dm.GMapNode );
