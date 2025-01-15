sap.ui.define([
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/btc/arachavuztalep/model/formatter",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"com/btc/arachavuztalep/controller/BaseController"

], function(jQuery, MessageToast, Fragment, Controller, JSONModel, formatter, Filter, FilterOperator, BaseController) {
	"use strict";
	var TalepForm = {};
	var TalepModel = new JSONModel(TalepForm);
	
	return BaseController.extend("com.btc.arachavuztalep.controller.TalepOnay", {
		formatter: formatter,
		onInit: function() {
			this._loadInfo();
			this.byId("table1").setVisible(true);
			this.byId("table1").setVisibleRowCount(1);
			var oRouter = this.getRouter();
			oRouter.getRoute("TalepOnay").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function(oEvent) {
			this._applyInitialSetToTable();
		},
		
		onAfterRendering: function() { 
			this._applyInitialSetToTable();
		},
		
		_applyInitialSetToTable: function() {
			var oView = this.getView();
			var oModel = oView.getModel();
			var mParameters = {};
			var bTalep = [];
			var oBusyDialog = new sap.m.BusyDialog();
			
			mParameters.success = function(oData, oResponce) {
				bTalep.push(oData);
				TalepModel.setData(bTalep);
				oView.setModel(TalepModel, "TalepModel");
				oBusyDialog.close();
			};
			mParameters.error = function(oError) {
				oBusyDialog.close();
			};
			var sPath = "/AracTalepSet(TalepNo='0000000001',SicilNo='12345678')";
			oModel.read(sPath, mParameters);
			this.byId("table1").setVisibleRowCount(1);//
		},
		
		_loadInfo: function() {
			var data = {
				aracTipi: [{
					text: 'Otomobil',
					key: 'Otomobil'
				}, {
					text: 'Minibüs',
					key: 'Minibüs'
				}],
				aracDurum: [{
					key: 'Uygun',
					text: 'Uygun'
				}, {
					key: 'Görevde',
					text: 'Görevde'
				}],
				srcBelgesi: [{
					text: 'Var'
				}, {
					text: 'Yok'
				}],
				aracPlaka: [{
					key: '34 AER 34',
					text: '34 AER 34'
				}, {
					text: '34 AER 16',
					key: '34 AER 16'
				}, {
					text: '34 AER 10',
					key: '34 AER 10'
				}]
			};
			var oAppModel = new JSONModel(data);
			this.getView().setModel(oAppModel, "oAppModel");
		},

		onSearch: function(oEvt) {
			var aFilter = [];
			var sQuery = oEvt.getParameters().query;
			var oList = this.getView().byId("listTalep");
			var oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("TalepNo", FilterOperator.EQ, sQuery));
			}
			oBinding.filter(aFilter);
		},

		reddetPressed: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var talepModel = oView.getModel("TalepModel");
			var oContext = oEvent.getSource().getBindingContext("TalepModel").getObject();
			delete oContext.__metadata;
			var mParameters = {};
			var oTalepModel = oView.getModel("TalepModel").getData();

			mParameters.success = function(oResponce) {
				oTalepModel.OnayDurum = "R";
				talepModel.updateBindings(true);
				MessageToast.show("Baþarýlý");
			};
			mParameters.error = function(oError) {
				MessageToast.show(oError);
			};
			oContext.OnayDurum = "R";

			var sPath = "/AracTalepSet(TalepNo='" + oContext.TalepNo + "',SicilNo='" + oContext.SicilNo + "')";
			oModel.update(sPath, oContext, mParameters);
		},

		kaydetPressed: function(oEvent) {
			
			var oView = this.getView();
			var oModel = oView.getModel();
			var talepModel = oView.getModel("TalepModel");
			var oContext = oEvent.getSource().getBindingContext("TalepModel").getObject();
			delete oContext.__metadata;
			var mParameters = {};
			var oTalepModel = oView.getModel("TalepModel").getData();
			mParameters.success = function(oResponce) {
				oTalepModel.OnayDurum = "O";
				talepModel.updateBindings(true);
				MessageToast.show("Baþarýlý");
			};
			mParameters.error = function(oError) {
				MessageToast.show(oError);
			};
			oContext.OnayDurum = "O";
			var sPath = "/AracTalepSet(TalepNo='" + oContext.TalepNo + "',SicilNo='" + oContext.SicilNo + "')";
			oModel.update(sPath, oContext, mParameters);

		},

		onTumTaleplerPressed: function() {

			var oView = this.getView();
			var oModel = oView.getModel();
			this.byId("table1").setVisible(true);
			this.byId("table1").setVisibleRowCount(10);

			var mParameters = {};

			var oBusyDialog = new sap.m.BusyDialog();
			mParameters.success = function(oData, oResponce) {
				TalepModel.setData(oData.results);
				oView.setModel(TalepModel, "TalepModel");
				oBusyDialog.close();
			};
			
			mParameters.error = function(oError) {
				oBusyDialog.close();
			};
			var sPath = "/AracTalepSet";
			oModel.read(sPath, mParameters);
		},

		onListItemPress: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			this.byId("table1").setVisible(true);
			this.byId("table1").setVisibleRowCount(1);
			this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		},

		_showDetail: function(oItem) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var mParameters = {};
			var aTalep = [];
			var oBusyDialog = new sap.m.BusyDialog();
			
			mParameters.success = function(oData, oResponce) {
				aTalep.push(oData);
				TalepModel.setData(aTalep);
				oView.setModel(TalepModel, "TalepModel");
				oBusyDialog.close();
			};
			
			mParameters.error = function(oError) {
				oBusyDialog.close();
			};
			var sPath = oItem.getBindingContext().getPath();
			oModel.read(sPath, mParameters);
		},

		onBack: function() {
			history.go(-1);
		}
	});
});