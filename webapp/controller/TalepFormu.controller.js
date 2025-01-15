sap.ui.define([
	"com/btc/arachavuztalep/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (BaseController, History, JSONModel, Filter, FilterOperator) {
	"use strict";
	var yeniTalepModel, kisiModel, pypModel;

	return BaseController.extend("com.btc.arachavuztalep.controller.TalepFormu", { //test
		onInit: function () {
			yeniTalepModel = new JSONModel(this._getEmptyData());
			/*yeniTalepModel.CikisSaat.setHours(12,0,0);
			yeniTalepModel.DonusSaat.setHours(12,0,0);*/
			kisiModel = new JSONModel();
			pypModel = new JSONModel();
			var oView = this.getView();
			oView.setModel(yeniTalepModel, "yeniTalepModel");
			var oRouter = this.getRouter();
			oRouter.getRoute("TalepFormu").attachMatched(this._onRouteMatched, this);
		},
		onAfterRendering: function () {

			var oView = this.getView();
			oView.setModel(yeniTalepModel, "yeniTalepModel");
			var oModel = oView.getModel();
			var mParameters = {};

			mParameters.success = function (oData) {

				kisiModel.setData(oData);
				oView.setModel(kisiModel, "kisiModel");
			};

			mParameters.error = function (oError) { };

			oModel.callFunction("/GetKisiBilgi", mParameters);

		},
		_onRouteMatched: function (oEvent) {
			this._applyInitialSetToTalepForm();
			this.setModel(new JSONModel({
				MusteriVisibility: false
			}), "musteriVisibilityModel");
		},

		_applyInitialSetToTalepForm: function () {
			yeniTalepModel = new JSONModel(this._getEmptyData());
			var oView = this.getView();
			oView.setModel(yeniTalepModel, "yeniTalepModel");
			this.byId("idsicilno").setValueState(sap.ui.core.ValueState.None);
		},

		_getEmptyData: function () {

			return {
				TalepNo: "",
				SicilNo: "",
				AdSoyad: "",
				TelefonNo: "",
				Departman: "",
				ProjeAdi: "",
				ProjeYoneticisi: "",
				CikisTarih: new Date(),
				CikisSaat: new Date(),
				DonusTarih: new Date(),
				DonusSaat: new Date(),
				SeyahatYeri: "",
				PotansiyelMusteri: ""
			};
		},
		onBack: function () {
			history.go(-1);
		},

		onSearchPyp: function (oEvent) {

			var oModel = this.getView().getModel();
			var mParameter = {};
			mParameter.success = function (oData) {

				pypModel.setData(oData.results);
				//oView.setModel(kisiModel, "kisiModel");
			};

			mParameter.error = function (oError) { };

			oModel.callFunction("/GetPyp", mParameter);
			if (!this._pypselectdialog) {
				this._pypselectdialog = sap.ui.xmlfragment("com.btc.arachavuztalep.fragments.PypSelectDialog", this);
				this._pypselectdialog.setModel(pypModel, "pypModel");
			}
			this._pypselectdialog.open();

		},

		handleClose: function (oEvent) {

			var pyp, py, py_sicil;
			var aContexts = oEvent.getParameter("selectedContexts"),
				musteriVisibilityModel = this.getModel("musteriVisibilityModel");

			aContexts.map(function (oContext) {
				pyp = oContext.getObject().ProjeAdi;
				py = oContext.getObject().ProjeYoneticisi;
				py_sicil = oContext.getObject().PySicil;

			});

			this.byId("idpyp").setValue(pyp);
			this.byId("idpy").setValue(py);
			this.byId("idpysicil").setValue(py_sicil);

			var sPath = this.getModel().createKey("/PresalesKontrolSet", {
				IvPyp: pyp
			});

			this.getModel().read(sPath, {
				success: function (oData) {
					oData.EvFlag ? musteriVisibilityModel.setProperty("/MusteriVisibility", true) : musteriVisibilityModel.setProperty("/MusteriVisibility", false);
				},
				error: function (oError) { }
			})
		},

		handleSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("ProjeAdi", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleChange: function () {
			//	PT00H00M00S
			var cikissaat_temp = this.byId("TP1").getDateValue();
			var donussaat_temp = this.byId("TP2").getDateValue();
			if (cikissaat_temp) {
				var cikissaat = "PT" + cikissaat_temp.getHours() + "H" + cikissaat_temp.getMinutes() + "M00S";
				yeniTalepModel.setProperty("/CikisSaat", cikissaat);
			}
			if (donussaat_temp) {
				var donussaat = "PT" + donussaat_temp.getHours() + "H" + donussaat_temp.getMinutes() + "M00S";
				yeniTalepModel.setProperty("/DonusSaat", donussaat);
			}
		},

		onTalebiTamamlaPressed: function () {

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var _this = this;
			var oParams = {};
			var oController = this;
			var oView = this.getView();
			var oModel = oView.getModel();
			var oData = this.getModel("yeniTalepModel").getData(),
				musteriVisibilityModel = this.getModel("musteriVisibilityModel").getData()
			oData.SicilNo = kisiModel.oData.Sicilno;
			var adsoyad = kisiModel.oData.Ad + " " + kisiModel.oData.Soyad;
			oData.AdSoyad = adsoyad;
			oData.Departman = kisiModel.oData.Bolum;
			if (oData.SeyahatYeri === "") {
				sap.m.MessageBox.warning(
					"Seyahat yeri boş olamaz.", {
					actions: [sap.m.MessageBox.Action.CLOSE],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (sAction) {

					}
				});
				return;
			}
			oData.CikisTarih = new Date(oData.CikisTarih.setHours(12, 0, 0, 0));
			oData.DonusTarih = new Date(oData.DonusTarih.setHours(12, 0, 0, 0));


			if (musteriVisibilityModel.MusteriVisibility && !oData.PotansiyelMusteri) {
				return sap.m.MessageBox.error("Presales projesi seçildiğinde potansiyel müşteri alanı boş bırakılamaz.");
			}


			this.handleChange();
			if (oData.ProjeAdi && oData.CikisTarih && oData.CikisSaat && oData.DonusTarih && oData.DonusSaat) {
				if (oData.CikisTarih > oData.DonusTarih) {
					sap.m.MessageToast.show("Tarihi kontrol ediniz...");
				} else {

					oParams.success = function (oData2, oResponse2) {
						var talepno = oData2.TalepNo;

						sap.m.MessageToast.show('Talep Oluşturuldu. Talep Numaranız:' + talepno, {

							duration: 2000
						});

						setTimeout(function () {
							_this.onBack();
						}, 2000);

						//var oVieww = oView;
						//oVieww.getModel("yeniTalepModel").setData(oController._getEmptyData());

					};

					oParams.error = function (oError2) {
						sap.m.MessageToast.show("Başarısız!!!");
					};

					var sPath = "/AracTalepSet";
					oModel.create(sPath, oData, oParams);
				}
			} else {
				sap.m.MessageToast.show('Zorunlu alanları doldurunuz');
			}
		}
	});
});