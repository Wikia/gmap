/**
 * DataModel GMap Node.
 *
 * @class
 * @extends ve.dm.LeafNode
 *
 * @constructor
 * @param {number} [length] Length of content data in document
 * @param {Object} [element] Reference to element in linear model
 */
ve.dm.GMapNode = function VeDmGMapNode( length, element ) {
	// Parent constructor
	ve.dm.LeafNode.call( this, 0, element );
};

/* Inheritance */

ve.inheritClass( ve.dm.GMapNode, ve.dm.LeafNode );

/* Static Properties */

ve.dm.GMapNode.static.name = 'gmap';

ve.dm.GMapNode.static.isContent = false;

ve.dm.GMapNode.static.matchRdfaTypes = [ 'mw:Extension/gmap' ];

ve.dm.GMapNode.static.enableAboutGrouping = true; // It's necessary because of the bug in Parsoid

ve.dm.GMapNode.static.toDataElement = function ( domElements ) {
	var dataElement,
		mwDataJSON = domElements[0].getAttribute( 'data-mw' ),
		mwData = mwDataJSON ? JSON.parse( mwDataJSON ) : {};

	dataElement = {
		'type': 'gmap',
		'attributes': {
			'attrs': mwData.attrs,
			'mw': mwData,
			'originalMw': mwDataJSON
		}
	};

	return dataElement;
};

ve.dm.GMapNode.static.toDomElements = function ( dataElement, doc ) {
	var attributes = dataElement.attributes,
		el = doc.createElement( 'div' );

	if ( ve.compare( attributes.attrs, attributes.mw.attrs ) ) {
		el.setAttribute( 'data-mw', attributes.originalMw );
	} else {
		attributes.mw.attrs = attributes.attrs;
		el.setAttribute( 'data-mw', JSON.stringify( attributes.mw ) );
	}

	return [ el ];
};

/* Registration */

ve.dm.modelRegistry.register( ve.dm.GMapNode );
