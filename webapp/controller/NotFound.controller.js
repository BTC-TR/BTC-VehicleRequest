sap.ui.define([
		"com/btc/arachavuztalep/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.btc.arachavuztalep.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);