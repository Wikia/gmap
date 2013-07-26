ve.ui.GMapEditDialog = function VeUiGMapEditDialog( surface, config ) {
	ve.ui.Dialog.call( this, surface, config );

	this.gmapNode = null;
};

ve.inheritClass( ve.ui.GMapEditDialog, ve.ui.Dialog );

ve.ui.GMapEditDialog.static.icon = 'picture';

ve.ui.GMapEditDialog.prototype.initialize = function () {
	ve.ui.Dialog.prototype.initialize.call( this );

	// Latitude
	this.latInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.latLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.latInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-latitude' )
	} );

	// Longitude
	this.longInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.longLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.longInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-longitude' )
	} );

	// Width
	this.widthInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.widthLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.widthInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-width' )
	} );

	// Height
	this.heightInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.heightLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.heightInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-height' )
	} );

	// Zoom
	this.zoomInput = new ve.ui.TextInputWidget( { '$$': this.frame.$$ } );
	this.zoomLabel = new ve.ui.InputLabelWidget( {
		'$$': this.frame.$$,
		'input': this.zoomInput,
		'label': ve.msg( 'visualeditor-dialog-gmap-zoom' )
	} );

	// Apply
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

ve.ui.GMapEditDialog.prototype.onOpen = function () {
	var params;

	ve.ui.Dialog.prototype.onOpen.call( this );

	this.gmapNode = this.surface.getView().getFocusedNode().getModel();

	params = this.gmapNode.getAttribute( 'params' );

	this.latInput.setValue( params.lat );
	this.longInput.setValue( params.long );
	this.zoomInput.setValue( params.zoom );
	this.widthInput.setValue( params.width );
	this.heightInput.setValue( params.height );
};

ve.ui.GMapEditDialog.prototype.onClose = function ( action ) {
	var params = {},
		surfaceModel = this.surface.getModel(),
		documentModel = surfaceModel.getDocument();

	ve.ui.Dialog.prototype.onClose.call( this );

	if ( action === 'apply' ) {
		params.lat = this.latInput.getValue();
		params.long = this.longInput.getValue();
		params.zoom = this.zoomInput.getValue();
		params.width = this.widthInput.getValue();
		params.height = this.heightInput.getValue();
		surfaceModel.change(
			ve.dm.Transaction.newFromAttributeChanges(
				documentModel, this.gmapNode.getOffset(), { 'params': params }
			)
		);
	}
};

/* Registration */

ve.ui.dialogFactory.register( 'gmapEdit', ve.ui.GMapEditDialog );
