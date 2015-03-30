sap.ui.controller("ui5_pure_businesspartner_app.view.ContactPerson_CRUD", {

	oAlertDialog: null,
	oBusyDialog: null,

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
	onAfterRendering: function() {
		var test = true;
	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf view.ContactPerson_CRUD
	 */
	onExit: function() {
		var test = true;
	},

	dateFromString: function(sDate) {
		// Try to create date directly, otherwise assume dd/mm/yyyy
		var oDate = new Date(sDate);
		return oDate === "Invalid Date" ? new Date(sDate.split("/").reverse()) : oDate;

	},

	initializeNewContactData: function(bindingContext) {
		//        debugger;

		// var bindingContext = this.getView().getBindingContext();
		var path = bindingContext.getPath();
		var object = bindingContext.getModel().getProperty(path);
		var currentPartner = bindingContext.getProperty("Partner");

		// var modelBP = this.getView().getModel();
		// 		var currentBP = modelBP.getData().Partner;

		//        var bp = this.getView().getModel("Partner");

		// 		this.getView().getModel("newContact").setData({
		// 			ContactPerson: {
		// 				Partner: currentBP
		// 			}
		// 		});
	},

	// <EntityType Name="ContactPerson" sap:content-version="1">
	//     <Key>
	//         <PropertyRef Name="Partner"/>
	//         <PropertyRef Name="PartnerCp"/>
	//     </Key>
	//     <Property Name="Partner" Type="Edm.String" Nullable="false" MaxLength="10" sap:label="GeschPartner" sap:updatable="false"/>
	//     <Property Name="PartnerCp" Type="Edm.String" Nullable="false" MaxLength="10" sap:label="GeschPartner" sap:updatable="false"/>
	//     <Property Name="Firstname" Type="Edm.String" Nullable="false" MaxLength="40" sap:label="Vorname" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Lastname" Type="Edm.String" Nullable="false" MaxLength="40" sap:label="Nachname" sap:sortable="false"/>
	//     <Property Name="City" Type="Edm.String" MaxLength="40" sap:label="Ort" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Langu" Type="Edm.String" MaxLength="2" sap:label="Sprache (ISO)" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Telephone" Type="Edm.String" MaxLength="30" sap:label="Telefon" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Mobile" Type="Edm.String" MaxLength="30" sap:label="Telefon" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Email" Type="Edm.String" MaxLength="241" sap:label="E-Mail-Adresse" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Facebook" Type="Edm.String" MaxLength="132" sap:label="URI" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="ContactDate" Type="Edm.DateTime" Precision="7" sap:label="Datum" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Category" Type="Edm.String" MaxLength="100" sap:label="Text" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Channel" Type="Edm.String" MaxLength="100" sap:label="Text" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <Property Name="Description" Type="Edm.String" MaxLength="100" sap:label="Text" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
	//     <NavigationProperty Name="BusinessPartner" Relationship="ZUI5_PURE_BUSINESS_PARTNER_SRV.zui5_bp_to_cp_association" FromRole="ToRole_zui5_bp_to_cp_association" ToRole="FromRole_zui5_bp_to_cp_association"/>
	// </EntityType>

	onInit: function() {
		// debugger;
		var view = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			// when detail navigation occurs, update the binding context
// 			debugger;
			if (oEvent.getParameter("name") === "ContactPerson_CRUD") {
				var context = new sap.ui.model.Context(view.getModel(), '/' + oEvent.getParameter("arguments").contextPath);
				view.setBindingContext(context);
				// Make sure the master is here
			}
		}, this);

		var bindingContext = this.getView().getBindingContext();
		if (bindingContext) {
			view.setModel(new sap.ui.model.json.JSONModel(), "newContact");
			this.initializeNewContactData(bindingContext);
		}
	},

	onBeforeRendering: function() {
		// 		this.getView().getModel("newContact").setData({
		// 			ContactPerson: {
		// 				Partner: "",
		// 			    PartnerCp: "",
		// 			    Firstname: "",
		// 			    Lastname: "",
		// 			    Telephone: "",
		// 			    Email: "",
		// 			    ContactDate: "" 
		// 			}
		// 		});
	},

	savePartner: function() {
		var mnewContact = this.getView().getModel("newContact").getData().ContactPerson;
		// 		var currentBP = this.getView().getModel("BusinessPartner").getData().Partner;
		// 		<Property Name="Partner" Type="Edm.String" Nullable="false" MaxLength="10" sap:label="GeschPartner" sap:updatable="false"/>
		//     <Property Name="PartnerCp" Type="Edm.String" Nullable="false" MaxLength="10" sap:label="GeschPartner" sap:updatable="false"/>
		//     <Property Name="Firstname" Type="Edm.String" Nullable="false" MaxLength="40" sap:label="Vorname" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="Lastname" Type="Edm.String" Nullable="false" MaxLength="40" sap:label="Nachname" sap:sortable="false"/>
		//     <Property Name="City" Type="Edm.String" MaxLength="40" sap:label="Ort" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="Langu" Type="Edm.String" MaxLength="2" sap:label="Sprache (ISO)" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="Telephone" Type="Edm.String" MaxLength="30" sap:label="Telefon" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="Mobile" Type="Edm.String" MaxLength="30" sap:label="Telefon" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="Email" Type="Edm.String" MaxLength="241" sap:label="E-Mail-Adresse" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="Facebook" Type="Edm.String" MaxLength="132" sap:label="URI" sap:creatable="false" sap:updatable="false" sap:sortable="false" sap:filterable="false"/>
		//     <Property Name="ContactDate"

		if (mnewContact) {
			// Basic payload data
			var mPayload = {
				Partner: mnewContact.Partner,
				// 			Partner: currentBP,
				PartnerCp: mnewContact.PartnerCp,
				Firstname: mnewContact.Firstname,
				Lastname: mnewContact.Lastname,
				Telephone: mnewContact.Telephone,
				Email: mnewContact.Email,
				ContactDate: this.dateFromString("2015/02/26") //test = new Date("2015/02/26")
				// 			ContactDate: this.dateFromString(mnewContact.ContactDate)
			};
		}

		// 		if (mnewContact.DiscontinuedDate) {
		// 			mPayload.DiscontinuedDate = this.dateFromString(mnewContact.DiscontinuedDate);
		// 		}
		// // Add supplier & category associations
		// 		["Supplier", "Category"].forEach(function(sRelation) {
		// 			var oSelect = this.getView().byId("idSelect" + sRelation);
		// 			var sPath = oSelect.getSelectedItem().getBindingContext().getPath();
		// 			mPayload[sRelation] = {
		// 				__metadata: {
		// 					uri: sPath
		// 				}
		// 			};
		// 		}, this);

		// Send OData Create request
		// 		var oModel = this.getView().getModel();
		// 		oModel.create("/Products", mPayload, {
		// 			success : jQuery.proxy(function(mResponse) {
		// 				this.initializenewContactData();
		// 				sap.ui.core.UIComponent.getRouterFor(this).navTo("product", {
		// 					from: "master",
		// 					product: "Products(" + mResponse.ID + ")",
		// 					tab: "supplier"
		// 				}, false);
		// 				jQuery.sap.require("sap.m.MessageToast");
		// 				// ID of newly inserted product is available in mResponse.ID
		// 				this.oBusyDialog.close();
		// 				sap.m.MessageToast.show("Product '" + mPayload.Name + "' added");
		// 			}, this),
		// 			error : jQuery.proxy(function() {
		// 				this.oBusyDialog.close();
		// 				this.showErrorAlert("Problem creating new product");
		// 			}, this)
		// 		});

		var success;

		if (mPayload) {
			this.getView().getModel().create('/ContactPersonSet', mPayload, null,
				function() {
					success = true;
					//alert("Kontaktperson erfolgreich gespeichert");
				}, function() {
					alert("Fehler beim Speichern der Kontaktperson");
				});
		}

		if (success) {
			this.navigateBack();
		}

	},

	onSave: function(oEvent) {
		this.savePartner();

		// 		// Show message if no product name has been entered
		// 		// Otherwise, get highest existing ID, and invoke create for new product
		// 		if (!this.getView().getModel("newContact").getProperty("/Detail/Name")) {
		// // 			if (!this.oAlertDialog) {
		// // 				this.oAlertDialog = sap.ui.xmlfragment("sap.ui.demo.tdg.view.NameRequiredDialog", this);
		// // 				this.getView().addDependent(this.oAlertDialog);
		// // 			}
		// // 			this.oAlertDialog.open();
		// 	} else {
		// 			if (!this.oBusyDialog) {
		// 				this.oBusyDialog = new sap.m.BusyDialog();
		// 			}
		// 			this.oBusyDialog.open();
		// 			this.getView().getModel().read("/Products", {
		// 				urlParameters : {
		// 					"$top" : 1,
		// 					"$orderby" : "ID desc",
		// 					"$select" : "ID"
		// 				},
		// 				async : false,
		// 				success : jQuery.proxy(function(oData) {
		// 					this.saveProduct(oData.results[0].ID + 1);
		// 				}, this),
		// 				error : jQuery.proxy(function() {
		// 					this.oBusyDialog.close();
		// 					this.showErrorAlert("Cannot determine next ID for new product");
		// 				}, this)
		// 			});

		// 		}
	},

	onCancel: function(oEvent) {
		// 	    var oListItem = oEvent.getSource();
		// 		sap.ui.core.UIComponent.getRouterFor(this).backWithoutHash(this.getView());
		this.navigateBack();
	},

	onDialogClose: function(oEvent) {
		oEvent.getSource().getParent().close();
	},

	navigateBack: function() {
		this.getView().getModel("newContact").setData({
			ContactPerson: {
				Partner: "",
				PartnerCp: "",
				Firstname: "",
				Lastname: "",
				Telephone: "",
				Email: "",
				ContactDate: ""
			}
		});

		window.history.go(-1);

		// 		var oListItem = oEvent.getSource(); //oEvent.getParameter("listItem") || oEvent.getSource();

		// 		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
		// // 		sap.ui.core.UIComponent.getRouterFor(this).navTo("Details",{from: "ContactPerson_CRUD", contextPath: oListItem.getBindingContext().getPath().substr(1)});
		//         sap.ui.core.UIComponent.getRouterFor(this).backWithoutHash(this.getView());
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