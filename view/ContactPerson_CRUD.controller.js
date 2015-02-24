sap.ui.controller("ui5_pure_businesspartner_app.view.ContactPerson_CRUD", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.ContactPerson_CRUD
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.ContactPerson_CRUD
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.ContactPerson_CRUD
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.ContactPerson_CRUD
*/
//	onExit: function() {
//
//	}

	dateFromString : function(sDate) {
		// Try to create date directly, otherwise assume dd/mm/yyyy
		var oDate = new Date(sDate);
		return oDate === "Invalid Date" ? new Date(sDate.split("/").reverse()) : oDate;

	},

initializeNewProductData : function() {
		this.getView().getModel("newProduct").setData({
			Detail: {
				DiscontinuedFlag: false
			}
		});
	},

onInit : function() {
		this.getView().setModel(new sap.ui.model.json.JSONModel(), "newProduct");
		this.initializeNewProductData();
	},
	
saveProduct : function(nID) {
		var mNewProduct = this.getView().getModel("newProduct").getData().Detail;
		// Basic payload data
		var mPayload = {
			ID: nID,
			Name: mNewProduct.Name,
			Description: mNewProduct.Description,
			ReleaseDate: this.dateFromString(mNewProduct.ReleaseDate),
			Price: mNewProduct.Price.toString(),
			Rating: mNewProduct.Rating
		};

		if (mNewProduct.DiscontinuedDate) {
			mPayload.DiscontinuedDate = this.dateFromString(mNewProduct.DiscontinuedDate);
		}
// Add supplier & category associations
		["Supplier", "Category"].forEach(function(sRelation) {
			var oSelect = this.getView().byId("idSelect" + sRelation);
			var sPath = oSelect.getSelectedItem().getBindingContext().getPath();
			mPayload[sRelation] = {
				__metadata: {
					uri: sPath
				}
			};
		}, this);
		
	// Send OData Create request
		var oModel = this.getView().getModel();
		oModel.create("/Products", mPayload, {
			success : jQuery.proxy(function(mResponse) {
				this.initializeNewProductData();
				sap.ui.core.UIComponent.getRouterFor(this).navTo("product", {
					from: "master",
					product: "Products(" + mResponse.ID + ")",
					tab: "supplier"
				}, false);
				jQuery.sap.require("sap.m.MessageToast");
				// ID of newly inserted product is available in mResponse.ID
				this.oBusyDialog.close();
				sap.m.MessageToast.show("Product '" + mPayload.Name + "' added");
			}, this),
			error : jQuery.proxy(function() {
				this.oBusyDialog.close();
				this.showErrorAlert("Problem creating new product");
			}, this)
		});

	},
	

	onSave : function() {
		// Show message if no product name has been entered
		// Otherwise, get highest existing ID, and invoke create for new product
		if (!this.getView().getModel("newProduct").getProperty("/Detail/Name")) {
			if (!this.oAlertDialog) {
				this.oAlertDialog = sap.ui.xmlfragment("sap.ui.demo.tdg.view.NameRequiredDialog", this);
				this.getView().addDependent(this.oAlertDialog);
			}
			this.oAlertDialog.open();
	} else {
			if (!this.oBusyDialog) {
				this.oBusyDialog = new sap.m.BusyDialog();
			}
			this.oBusyDialog.open();
			this.getView().getModel().read("/Products", {
				urlParameters : {
					"$top" : 1,
					"$orderby" : "ID desc",
					"$select" : "ID"
				},
				async : false,
				success : jQuery.proxy(function(oData) {
					this.saveProduct(oData.results[0].ID + 1);
				}, this),
				error : jQuery.proxy(function() {
					this.oBusyDialog.close();
					this.showErrorAlert("Cannot determine next ID for new product");
				}, this)
			});

		}
	},
	
	onCancel : function() {
		sap.ui.core.UIComponent.getRouterFor(this).backWithoutHash(this.getView());
	},
	
    onDialogClose : function(oEvent) {
		oEvent.getSource().getParent().close();
	}
});
	
	

// 	onInit: function() {
// 		var view = this.getView();

// 		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
// 			// when detail navigation occurs, update the binding context
// 			if (oEvent.getParameter("name") === "ContactPerson_CRUD") {
// 				var context = new sap.ui.model.Context(view.getModel(), '/' + oEvent.getParameter("arguments").contextPath);
// 				view.setBindingContext(context);
// 				// Make sure the master is here
// 			}
// 		}, this);

// 	},

// 	handleNavButtonPress: function(oEvent) {
// 		var history = sap.ui.core.routing.History.getInstance();
// 		var url = sap.ui.core.UIComponent.getRouterFor(this).getURL("master", {});
// 		var direction = history.getDirection(url);
// 		if ("Backwards" === direction) {
// 			window.history.go(-1);
// 		} else {
// 			var replace = true; // otherwise we go backwards with a forward history
// 			this.navTo(route, data, replace);
// 		}
// 	}

// });