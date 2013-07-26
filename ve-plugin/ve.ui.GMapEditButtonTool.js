/**
 * GMat button tool.
 *
 * @class
 * @extends ve.ui.DialogButtonTool
 * @constructor
 * @param {ve.ui.Toolbar} toolbar
 * @param {Object} [config] Config options
 */
 ve.ui.GMapEditButtonTool = function VeUiGMapEditButtonTool( toolbar, config ) {
	// Parent constructor
	ve.ui.DialogButtonTool.call( this, toolbar, config );
};

/* Inheritance */

ve.inheritClass( ve.ui.GMapEditButtonTool, ve.ui.DialogButtonTool );

/* Static Properties */

ve.ui.GMapEditButtonTool.static.name = 'gmapEdit';

ve.ui.GMapEditButtonTool.static.icon = 'map';

ve.ui.GMapEditButtonTool.static.dialog = 'gmapEdit';

ve.ui.GMapEditButtonTool.static.modelClasses = [ ve.dm.GMapNode ];

/* Registration */

ve.ui.toolFactory.register( 'gmapEdit', ve.ui.GMapEditButtonTool );
