ve.ui.GMapEditButtonTool = function VeUiGMapEditButtonTool( toolbar, config ) {
	ve.ui.DialogButtonTool.call( this, toolbar, config );
};

ve.inheritClass( ve.ui.GMapEditButtonTool, ve.ui.DialogButtonTool );

ve.ui.GMapEditButtonTool.static.name = 'gmapEdit';

ve.ui.GMapEditButtonTool.static.icon = 'picture'; // TODO: Create map icon

ve.ui.GMapEditButtonTool.static.dialog = 'gmapEdit';

ve.ui.GMapEditButtonTool.static.modelClasses = [ ve.dm.GMapNode ];

/* Registration */

ve.ui.toolFactory.register( 'gmapEdit', ve.ui.GMapEditButtonTool );
