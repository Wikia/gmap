/**
 * Dialog for editing GMap objects.
 *
 * @class
 * @extends ve.ui.MWDialog
 *
 * @constructor
 * @param {ve.ui.Surface} surface
 * @param {Object} [config] Config options
 */
ve.ui.GMapEditDialog = function VeUiGMapEditDialog( surface, config ) {
	// Parent constructor
	ve.ui.Dialog.call( this, surface, config );

	// Properties
	this.gmapNode = null;
};

/* Inheritance */

ve.inheritClass( ve.ui.GMapEditDialog, ve.ui.Dialog );

/* Static Properties */

ve.ui.GMapEditDialog.static.icon = 'map';

ve.ui.GMapEditDialog.static.titleMessage = 'visualeditor-dialog-gmap-title';

/* Methods */

/**
 * Handle dialog initialization.
 * IMPORTANT: Called only once per given dialog
 *
 * @method
 */
ve.ui.GMapEditDialog.prototype.initialize = function () {
	// Parent method
	ve.ui.Dialog.prototype.initialize.call( this );

	// Latitude (label & input)
	this.latInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.latLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.latInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-latitude' )
	} );

	// Longitude (label & input)
	this.longInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.longLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.longInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-longitude' )
	} );

	// Width (label & input)
	this.widthInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.widthLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.widthInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-width' )
	} );

	// Height (label & input)
	this.heightInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.heightLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.heightInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-height' )
	} );

	// Zoom (label & input)
	this.zoomInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.zoomLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.zoomInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-zoom' )
	} );

	// Apply button
	this.applyButton = new ve.ui.ButtonWidget( {
		'$$': this.frame.$$,
		'label': ve.msg( 'visualeditor-dialog-action-apply' ),
		'flags': [ 'primary' ]
	} );

	// Events
	this.applyButton.connect( this, { 'click': [ 'close', 'apply' ] } );

	this.$body.append(
		this.latLabel.$,
		this.latInput.$,
		this.longLabel.$,
		this.longInput.$,
		this.zoomLabel.$,
		this.zoomInput.$,
		this.widthLabel.$,
		this.widthInput.$,
		this.heightLabel.$,
		this.heightInput.$
	);
	this.$foot.append( this.applyButton.$ );
};

/**
 * Handle open events.
 *
 * @method
 */
ve.ui.GMapEditDialog.prototype.onOpen = function () {
	var attrs;

	// Parent method
	ve.ui.Dialog.prototype.onOpen.call( this );

	this.gmapNode = this.surface.getView().getFocusedNode().getModel();

	attrs = this.gmapNode.getAttribute( 'attrs' );

	this.latInput.setValue( attrs.lat );
	this.longInput.setValue( attrs.long );
	this.widthInput.setValue( attrs.width );
	this.heightInput.setValue( attrs.height );
	this.zoomInput.setValue( attrs.zoom );
};

/**
 * Handle close events.
 *
 * @method
 */
ve.ui.GMapEditDialog.prototype.onClose = function ( action ) {
	var attrs,
		surfaceModel = this.surface.getModel(),
		documentModel = surfaceModel.getDocument();

	// Parent method
	ve.ui.Dialog.prototype.onClose.call( this );

	if ( action === 'apply' ) {
		attrs = {
			'lat': this.latInput.getValue(),
			'long': this.longInput.getValue(),
			'width': this.widthInput.getValue(),
			'height': this.heightInput.getValue(),
			'zoom': this.zoomInput.getValue()
		}
		surfaceModel.change(
			ve.dm.Transaction.newFromAttributeChanges(
				documentModel, this.gmapNode.getOffset(), { 'attrs': attrs }
			)
		);
	}
};

/* Registration */

ve.ui.dialogFactory.register( 'gmapEdit', ve.ui.GMapEditDialog );
