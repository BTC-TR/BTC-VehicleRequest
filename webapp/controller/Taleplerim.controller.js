sap.ui.define([
	"com/btc/arachavuztalep/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/btc/arachavuztalep/model/formatter",
	'sap/m/MessageToast',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/m/SplitContainer'
], function(BaseController, Controller, JSONModel, formatter, MessageToast, Filter, FilterOperator) {
	"use strict";
	var OnayForm = {};
	var km = [];
	var kmModel = new JSONModel(km);
	var src;
	var _this;

	var OnayModel = new JSONModel(OnayForm);
	return BaseController.extend("com.btc.arachavuztalep.controller.Taleplerim", {
		formatter: formatter,
		onInit: function() {
			this._loadInfo();
			var oRouter = this.getRouter();
			oRouter.getRoute("Taleplerim").attachMatched(this._onRouteMatched, this);

			this.checkFirstUpdateFinished = true;
		},

		onAfterRendering: function() {
			_this = this;
			//this._applyInitialSetToTable();
		},

		_onRouteMatched: function(oEvent) {
			/*
			
			//this._applyInitialSetToTable();
			 var oView = this.getView();
			 var oModel = oView.getModel();
			 var mParams = {};
			 mParams.filters = new Filter("UygulamaTipi", FilterOperator.EQ, "T");
			 mParams.success = function(oData, oResponce){
			 	TaleplerimModel.setData(oData.results);
			 	oView.setModel(TaleplerimModel, "TaleplerimModel");
			 };
			 mParams.error = function(oError){
				
			 };
			 oModel.read("/AracTalepSet",mParams);
			*/
		},

		/*_applyInitialSetToTable: function() { 			//Bu fonksiyon kullan�lm�yor. 
			var oView = this.getView();
			var oModel = oView.getModel();
			var mParameters = {};
			var bTalep = [];
			var oBusyDialog = new sap.m.BusyDialog();

			mParameters.success = function(oData, oResponce) {
				OnayModel.setData(oData);
				oView.setModel(OnayModel, "OnayModel");
				oBusyDialog.close();
			};

			mParameters.error = function(oError) {
				oBusyDialog.close();
			};

			var sPath = "/AracTalepSet(TalepNo='0000000001',SicilNo='12345678')";
			oModel.read(sPath, mParameters);
		},*/

		onBack: function(oEvent) {
			history.go(-1);
		},

		onBackDetailToMaster: function(oEvent) {
			this.getView().byId("SplitContDemo1").toMaster(this.createId("master22"));
		},

		_loadInfo: function() {
			var data = {
				aracTipi: [{
					text: 'Otomobil',
					key: 'Otomobil'
				}, {
					text: 'Minib�s',
					key: 'Minib�s'
				}],
				aracDurum: [{
					key: 'Uygun',
					text: 'Uygun'
				}, {
					key: 'G�revde',
					text: 'G�revde'
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

		onUpdateFinishedList: function(oEvent) {
			
			var that = this;
			if (this.checkFirstUpdateFinished) {
				var aItems = oEvent.getSource().getItems();
				if (aItems.length > 0) {
					var oData = aItems[0].getBindingContext().getObject();
					delete oData.__metadata;
					OnayModel.setData(oData);

					this.setModel(OnayModel, "OnayModel");

				}
				that.checkFirstUpdateFinished = false;
			}

		},

		onListItemPress: function(oEvent) {
			
			var oView = this.getView();
			var oModel = oView.getModel();

			// this.byId("SplitContDemo1").hideMaster();
			if (sap.ui.Device.system.phone === true) {
				//	this.hideMaster();
				//this.byId("SplitContDemo1").to("idDetailPage1");
				// this.byId("SplitContDemo1").hideMaster();

				// this.getSplitContObj().toDetail(this.createId("idDetailPage1")); // this.createId("idDetailPage1")
				this.getView().byId("SplitContDemo1").toDetail(this.createId("idDetailPage1"));
			}
			this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
			//this.getSplitContObj().to(this.createId("idDetailPage1"));
		},

		_showDetail: function(oItem) {

			var that = this;
			var oView = this.getView();
			var oModel = oView.getModel();
			var oModelOnay = oView.getModel("OnayModel");
			//oModel.refresh(true);
			//oModelOnay.refresh(true);
			var mParameters = {};
			var aTalep = [];
			var oBusyDialog = new sap.m.BusyDialog();
			this.path = oItem.getBindingContext().getPath();
			that.object = oItem.getBindingContext().getObject();

			// var sPath = oItem.getBindingContext().getPath();

			/*this.getOwnerComponent().getModel().read(sPath, {
				success: function(data) {
					//aTalep.push(oData);
					OnayModel.setData(oData);

					oView.setModel(OnayModel, "OnayModel");

					oBusyDialog.close();
					if (sap.ui.Device.system.phone === true) {
						//this.byId("SplitContDemo1").toDetail("idDetailPage1","flip", oData, null);
						// oView.byId("SplitContDemo1").toDetail("idDetailPage1","flip", oData, null);
						// oView.byId("SplitContDemo1").hideMaster();
					}
				},
				error: function(response) {
					oBusyDialog.close();
				}
			});*/

			mParameters.success = function(oData, oResponce) {
				//aTalep.push(oData);
				that.getView().byId("idHBoxPhotos").getBinding("items").refresh();
				OnayModel.setData(oData);

				oView.setModel(OnayModel, "OnayModel");
				/*oView.getModel("OnayModel").refresh();*/
				var modelOnay = oView.getModel("OnayModel");
				var model	  = oView.getModel();
				//modelOnay.refresh(true);
				//model.refresh(true);

				oBusyDialog.close();
				if (sap.ui.Device.system.phone === true) {
					//this.byId("SplitContDemo1").toDetail("idDetailPage1","flip", oData, null);
					// oView.byId("SplitContDemo1").toDetail("idDetailPage1","flip", oData, null);
					// oView.byId("SplitContDemo1").hideMaster();
				}

				if (that.object.IlkKm && that.object.IlkKm !== "00000") { //�NCELEEEEE !!!
					kmModel.setData({
						SonKm: that.object.IlkKm
					});
					oView.setModel(kmModel, "kmModel");
				} else {
					that._kmGetir(oItem);
				}
				that.byId("idDetailPage1").bindElement(that.path);
				//modelOnay.refresh(true);
				//model.refresh(true);

			};

			mParameters.error = function(oError) {
				oBusyDialog.close();
			};

			var sPath = oItem.getBindingContext().getPath();
			oModel.read(sPath, mParameters);
			
			
			//oModel.refresh(true);  kapat�ld�
			//oModelOnay.refresh(true); kapat�ld��
			/*if (this.object.IlkKm && this.object.IlkKm !== "00000") { //�NCELEEEEE !!!
				kmModel.setData({
					SonKm: this.object.IlkKm
				});
				oView.setModel(kmModel, "kmModel");
			} else {
				this._kmGetir(oItem);
			}
			this.byId("idDetailPage1").bindElement(this.path);*/
			//this.byId("SplitContDemo1").toDetail("idDetailPage1","flip", null, null);
		},

		_kmGetir: function(oEvent) {
			
			var _this = this;
			var oView = this.getView();
			var oModel = this.getView().getModel();
			var oTalep = oEvent.getBindingContext().getObject();
			var mParams = {};
			mParams.method = "GET";
			mParams.urlParameters = {
				Plaka: oTalep.AracPlaka
			};
			mParams.success = function(oData) {
				kmModel.setData(oData);
				oView.setModel(kmModel, "kmModel");
			};
			mParams.error = function(oError) {

			};
			oModel.callFunction("/GetKm", mParams);
		},

		teslimButtonPressed: function(oEvent) {
			

			
			
			var oView = this.getView();
			var oModel = oView.getModel();
			var onayModel = oView.getModel("OnayModel");
			var oContext = this.object;
			delete oContext.__metadata;
			//var sonkmenabled = this.byId("sonKmId").getEnabled();
			var mParameters = {};
			var oOnayModel = oView.getModel("OnayModel").getData();
			var kmModelData = oView.getModel("kmModel").getData();
			mParameters.success = function(odata, oResponce) {
				
				//location.reload();
				sap.ui.core.BusyIndicator.hide();
				//oModel.refresh(true, true);
				oView.getModel("OnayModel").setProperty("/AracTeslim","Edildi");
				oModel.updateBindings(true);
				//oView.setModel(onayModel, "OnayModel");
				
				//_this.getView().byId("idHBoxPhotos").getBinding("items").refresh(true);
				//onayModel.updateBindings(true);
				//onayModel.refresh(true);
				MessageToast.show("Ara� teslim edildi...");
			};
			mParameters.error = function(oError) {
				sap.ui.core.BusyIndicator.hide();
				MessageToast.show(oError);
			};
			/*if (oOnayModel.OnayMudur !== "O") {
				MessageToast.show("Talep Onaylanmadan Kilometre giri�i yapamazs�n�z!");
			} else if (oOnayModel.IlkKm === "00000" || oOnayModel.IlkKm === "") {
				MessageToast.show("�lk Kilometre bilgisini girmelisiniz.");
			}  */
			if (oOnayModel.SonKm === "" || oOnayModel.SonKm === "00000") {
				MessageToast.show("�ade Km bilgisini girmelisiniz.");
			}
			if (oOnayModel.SonKm <= kmModelData.SonKm) {
				MessageToast.show("Son kilometre ilk kilometreden b�y�k olmal�.");

			} else {
				var photos = this.getView().byId("idHBoxPhotos").getBinding("items").aKeys.length;
				if(photos !== 0){
					this.byId("sonKmId").setEnabled(false);
					this.byId("notId").setEnabled(false);
					this.byId("ilkKmId").setEnabled(false);

					oContext.IlkKm = kmModelData.SonKm;
					oContext.SonKm = oOnayModel.SonKm;
					oContext.PersonelNotu = oOnayModel.PersonelNotu;
					oContext.AracTeslim = 'Edildi';
					var sPath = this.path;
					oModel.update(sPath, oContext, mParameters);
					sap.ui.core.BusyIndicator.show();
				}
				else{
					MessageToast.show("Foto�raf y�klemeden arac� teslim edemezsiniz!");
				}
				
			}
		},

		reddetPressedv2: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var onayModel = oView.getModel("OnayModel");
			var oContext = this.object;
			delete oContext.__metadata;
			var mParameters = {};
			var oOnayModel = oView.getModel("OnayModel").getData();
			var d = this.byId("cbADurum").getValue();
			var t = this.byId("cbADurum2").getValue();
			var p = this.byId("cbADurum3").getValue();

			if (d == "") {
				MessageToast.show("Onaylama ekran�n� doldurmal�s�n�z");
			} else if (d == "Uygun") {
				MessageToast.show("Durumu 'Uygun' se�ip reddemezsiniz. G�revde se�melisiniz.");
			} else if (t || p) {
				MessageToast.show("Ara� Tipi ve Plaka atamas� yap�p reddemezsiniz.");
			} else {

				mParameters.success = function(oData, oResponce) {
					oOnayModel.OnayDurum = "R";
					oView.updateBindings(true);
					onayModel.updateBindings(true);
					onayModel.refresh(true);
					MessageToast.show("Ba�ar�l�");
				};
				mParameters.error = function(oError) {
					MessageToast.show(oError);
				};
				oContext.OnayDurum = "R";
				oContext.Durum = oOnayModel.Durum;
				var sPath = this.path;
				oModel.update(sPath, oContext, mParameters);
			}
		},

		kaydetPressedv2: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var onayModel = oView.getModel("OnayModel");
			var oContext = this.object;
			delete oContext.__metadata;
			var mParameters = {};
			var oOnayModel = oView.getModel("OnayModel").getData();
			var d = this.byId("cbADurum").getValue();
			var t = this.byId("cbADurum2").getValue();
			var p = this.byId("cbADurum3").getValue();

			if (d == "" || t == "" || p == "") {
				MessageToast.show("Onaylama ekran�n� doldurmal�s�n�z");
			} else if (d == "G�revde") {
				MessageToast.show("Durumu 'G�revde' se�ip onaylayamazs�n�z. Uygun se�melisiniz.");
			} else {
				mParameters.success = function(oResponce) {
					oOnayModel.OnayDurum = "O";
					oModel.updateBindings(true);
					onayModel.updateBindings(true);
					onayModel.refresh(true);
					MessageToast.show("Ba�ar�l�");
				};
				mParameters.error = function(oError) {
					MessageToast.show(oError);
				};
				oContext.OnayDurum = "O";
				oContext.Durum = oOnayModel.Durum;
				oContext.AracTipi = oOnayModel.AracTipi;
				oContext.AracPlaka = oOnayModel.AracPlaka;
				var sPath = this.path;
				oModel.update(sPath, oContext, mParameters);
			}
		},

		talepIptalPressed: function(oEvent) {
			var _this = this;
			sap.m.MessageBox.show(
				"Emin misiniz?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Talep �ptal",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							_this.talepIptal();
						} else {
							return;
						}
					}
				}
			);

		},

		talepIptal: function() {

			
			var oView = this.getView();
			var oModel = oView.getModel();
			//var onayModel = oView.getModel("OnayModel");
			var oContext = this.object;
			delete oContext.__metadata;
			var mParameters = {};
			mParameters.success = function(oResponce) {
				/*oOnayModel.OnayDurum = "O";
				oModel.updateBindings(true);
				onayModel.updateBindings(true);
				onayModel.refresh(true);*/
				MessageToast.show("Talebiniz iptal edilmi�tir");
			};
			mParameters.error = function(oError) {
				MessageToast.show(oError);
			};
			oContext.TalepIptal = "X";
			var sPath = this.path;
			oModel.update(sPath, oContext, mParameters);

		},

		onCancelPressed: function(oEvent) {
			this._talepiptaldialog.close();
		},

		onSearch: function(oEvt) {
			var aFilter = [];
			var sQuery = oEvt.getParameters().query;
			var oList = this.getView().byId("list22");
			var oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("TalepNo", FilterOperator.EQ, sQuery));
			}
			oBinding.filter(aFilter);
		},
		handleUploadPress: function(oEvent) {
			
			var mView = this.getView();
			var oFileUploader = this.byId("fileUploader");
			/*
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];

			oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "Content-Type",
				value: file.type
			}));

			oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "slug",
				value: oFileUploader.getValue()
			}));
			*/
			oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "X-CSRF-Token",
				value: mView.getModel().getHeaders()["x-csrf-token"]
			}));

			oFileUploader.upload();
		},

		imagePressed: function(oEvent) {
			
			src = oEvent.getSource().getSrc();

			if (!this._imagedialog) {
				this._imagedialog = sap.ui.xmlfragment("com.btc.arachavuztalep.fragments.ImageShow", this);
			}
			this._imagedialog.open();

			// this.getView.byId("imageDialog").setSrc(src);
			sap.ui.getCore().byId("imageDialog").setSrc(src);

		},

		onImageKapat: function(oEvent) {
			this._imagedialog.close();
		},

		onUploadStart: function(oEvent) {
			if (!this._busyDialog) {
				this._busyDialog = new sap.m.BusyDialog();
			}
			this._busyDialog.open();
		},
		onUploadComplete: function(oEvent) {
			 
			this._busyDialog.close();
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				sap.m.MessageToast.show("Y�kleme i�lemi tamamland�");
			}
			var oFileUploader = this.byId("fileUploader");
			oFileUploader.removeAllHeaderParameters();

			
			this.getView().byId("idHBoxPhotos").getBinding("items").refresh(true);
			//
			//Resmi y�kledikten sonra refresh etmek i�in 
			//	var oImage = this.byId("idBankImage");
			//	oImage.setSrc("/sap/opu/odata/sap/ZSK_BANKALAR_SRV/BankaPhotoSet('" + seciliBankaID + "')/$value" + "?" + new Date().getTime());
		},
		onUploadAborted: function(oEvent) {
			this._busyDialog.close();
			sap.m.MessageToast.show("Y�kleme ��lemi Aborted");
		},

		onPressedImageDelete: function(oEvent) {
			
			var sDocId = oEvent.getSource().getBindingContext().getObject().Docid;
			var sPath = oEvent.getSource().getBindingContext().getPath();

			var oDataModel = this.getModel();
			oDataModel.remove(sPath, {
				success: function(oData, oResponse) {
					sap.m.MessageToast.show("Foto�raf silindi.");
				},

				error: function(oError) {
					sap.m.MessageToast.show("Silme i�lemi s�ras�nda hata olu�tu.");
				}
			});

		}

	});

});