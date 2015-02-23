sap.ui.core.mvc.Controller.extend("ui5_pure_businesspartner_app.view.Master", {
	
	handleSearch: function() {
		// add filter for search
		var filters = [];
		var searchString = this.getView().byId("searchField").getValue();
		if (searchString && searchString.length > 0) {
			filters = [ new sap.ui.model.Filter("Partner", sap.ui.model.FilterOperator.Contains, searchString) ];
		}
		
		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},
	
	handleSelect: function(oEvent) {
		var oListItem = oEvent.getParameter("listItem") || oEvent.getSource();
		
		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
		sap.ui.core.UIComponent.getRouterFor(this).navTo("Detail",{from: "master", contextPath: oListItem.getBindingContext().getPath().substr(1)});
	},
	
	onInit: function() {

	},
	
	onExit: function() {
		
	},
	
	// onAfterRendering comment
	onAfterRendering: function() {
		
	},
	
	// onBeforeRendering comment
	onBeforeRendering: function() {
		this.handleKundeIndexStatus();
	},
	
	handleKundeIndexStatus: function( ){
		var statusIcon = this.getView().byId("kundenIndexStatusObject");
		
		statusIcon.bindProperty("state", "CustSat", function(bValue) {
			return bValue >= "090" ? "Success" : "Error";
		}); 
		
		statusIcon.bindProperty("icon", "CustSat", function(bValue) {
// 			return bValue >= "090" ? "sap-icon://customer" : "sap-icon://alert";
            return "sap-icon://customer";
		}); 
		
	}, 
	
    handleCreateBP : function (evt) {
        jQuery.sap.require("sap.m.MessageToast");
        sap.m.MessageToast.show("create toolbar button pressed");
    },
  
    handleDeleteBP : function(oEvent) {
        jQuery.sap.require("sap.m.MessageToast");
        sap.m.MessageToast.show("delete toolbar button pressed");
    }
});	