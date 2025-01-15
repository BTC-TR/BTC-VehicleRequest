sap.ui.define(["sap/ui/core/format/DateFormat"], function(DateFormat) {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},
		teslimBtn: function(oMudur) {

			if (oMudur == 'O') {
				return true;
			} else {
				return false;
			}
		},

		photoDeleteIcon: function(teslim) {

			if (teslim === "Edildi") {
				return false;
			} else {
				return true;
			}
		},

		kmFormatter: function(km) {

			if (km == 0) {
				return "";
			} else {

				var kmf = parseInt(km);
				return kmf;
			}

		},

		RedFormat: function(prm) {
			if (prm == 'R') {
				return true;
			} else {
				return false;
			}
		},

		kmEnabledFormat: function(kmE) {

			if (kmE !== '00000') {
				return false;
			} else {
				return true;
			}

		},

		teslimBtn2: function(oMudur, oTeslim) {

			if (oMudur == 'O' && oTeslim == '') {
				return true;
			} else {
				return false;
			}
		},

		iptalBtn: function(oIptal, teslim) {

			if (oIptal === 'R' || teslim == 'Edildi') {
				return false;
			} else {
				return true;
			}
		},
		SrcDurum: function(sDurum) {
			if (sDurum == 'X') {
				return 'Var';
			} else {
				return 'Yok';
			}

		},
		plakaFormatter: function(pVisible) {
			if (pVisible === "O") {
				return true;
			} else if (pVisible === "R") {
				return false;
			} else {
				return false;
			}
		},
		kaydetbuttonVisible: function(bVisible) {
			if (bVisible === "O") {
				return false;
			}
			if (bVisible === "R") {
				return false;
			}
		},
		teslimFormatter: function(onay, km) {
			if (onay === "O") {
				if (km === "00000") {
					return true;
				} else {
					return false;
				}

			}
			return false;

		},
		kaydetFormat: function(kydt) {

			if (kydt != "00000") {
				return true;
			}
			return false;
		},

		reddetbuttonVisible: function(rVisible) {
			if (rVisible === "O") {
				return false;
			}
			if (rVisible === "R") {
				return false;
			}
		},
		iadeFormatter: function(onay, km) {
			if (onay == "O") {
				if (km === "" || km === "00000") {
					return true;
				}
			}
			return false;
		},

		talepNoFormat: function(fTalepNo) {
			var talepFormat = parseInt(fTalepNo);
			return "Talep No: " + talepFormat;
			//return parseInt(fTalepNo);
		},

		sirketOnayDurum: function(oDurum) {

			if (oDurum === "O") {
				return 'Şirket: Onaylandı';
			} else if (oDurum === "R") {
				return 'Şirket: Reddedildi';
			} else {
				return 'Şirket: Beklemede';
			}

		},

		pyOnayDurum: function(oDurum) {

			if (oDurum === "O") {
				return 'PY: Onaylandi';
			} else if (oDurum === "R") {
				return 'PY: Reddedildi';
			} else {
				return 'PY: Beklemede';
			}

		},

		IconFormat: function(fDurum) {
			if (fDurum === "O") {
				return 'sap-icon://accept';
			} else if (fDurum === "R") {
				return 'sap-icon://decline';
			} else {
				return 'sap-icon://pending';
			}

		},

		IconCFormat: function(cDurum) {
			if (cDurum === "O") {
				return '#01DF01';
			} else if (cDurum === "R") {
				return '#DF0101';
			} else {
				return '#0080FF';
			}
		},
		saatFormatter: function(oValue) {

			if (oValue != null) {
				var ms = oValue.ms;

				var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
					pattern: "HH:mm:ss"
				});
				var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
				return timeFormat.format(new Date(ms + TZOffsetMs));
			} else {
				return "00:00:00";
			}

		},
		formatDateddmmyyyy: function(oDate) {

			var oLocale = {};
			oLocale.pattern = "dd.MM.yyyy";
			if (oDate === null || oDate === "" || typeof oDate === "undefined") {
				return "";
			} else {
				if (typeof oDate !== "object") {
					if (oDate.toString().length == 10) {
						return oDate;
					} else {
						var formatDate = DateFormat.getDateInstance(oLocale).format(oDate);
						return formatDate;
					}
				} else {
					var formatDate = DateFormat.getDateInstance(oLocale).format(oDate);
					return formatDate;
				}
			}
		}

	};

});