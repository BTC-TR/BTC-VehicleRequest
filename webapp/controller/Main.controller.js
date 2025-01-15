sap.ui.define([
		"com/btc/arachavuztalep/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"com/btc/arachavuztalep/model/formatter",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/core/routing/History"
	], function (BaseController, JSONModel, formatter, Filter, FilterOperator, History) {
		"use strict";

		return BaseController.extend("com.btc.arachavuztalep.controller.Main", {
			formatter: formatter,

			onInit : function () {
			
			},
			onTalepFormu: function(){
				this.getRouter().navTo("TalepFormu");
				//this.to("TalepFormu","flip");
			},
			
			onTalepOnay: function(){
				this.getRouter().navTo("TalepOnay",{
					Talepno : "0000000001"
				});
			},
			onTaleplerim: function(){
				this.getRouter().navTo("Taleplerim");
			},
			
			onFotografYukle: function(){
				this.getRouter().navTo("FotografYukle");
			}
		});
	}
);