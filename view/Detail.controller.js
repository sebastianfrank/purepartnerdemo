sap.ui.core.mvc.Controller.extend("ui5_pure_businesspartner_app.view.Detail", {

	onInit: function() {
		this.initData();

		var view = this.getView();
		// 		debugger;

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			//  debugger;
			// when detail navigation occurs, update the binding context
			if (oEvent.getParameter("name") === "Detail") {
				var context = new sap.ui.model.Context(view.getModel(), '/' + oEvent.getParameter("arguments").contextPath);
				view.setBindingContext(context);
				// Make sure the master is here
			}
		}, this);

		// 		this.handleStackedColumnChart();

		// 		this.handleOverviewTile();

		//      sap.ui.localResources("");

		//  this.initStackedColumn();

	},

	onBeforeRendering: function() {

	},

	onAfterRendering: function() {
		this.initContactTable();
	},

	openActionSheet: function() {

		if (!this._oActionSheet) {
			this._oActionSheet = new sap.m.ActionSheet({
				buttons: new sap.ushell.ui.footerbar.AddBookmarkButton()
			});
			this._oActionSheet.setShowCancelButton(true);
			this._oActionSheet.setPlacement(sap.m.PlacementType.Top);
		}

		this._oActionSheet.openBy(this.getView().byId("actionButton"));
	},

	onExit: function() {
		if (this._oActionSheet) {
			this._oActionSheet.destroy();
			this._oActionSheet = null;
		}
	},

	handleNavButtonPress: function(oEvent) {
		var history = sap.ui.core.routing.History.getInstance();
		var url = sap.ui.core.UIComponent.getRouterFor(this).getURL("master", {});
		var direction = history.getDirection(url);
		debugger;
		if ("Backwards" === direction) {
			window.history.go(-1);
		} else {
			var replace = true; // otherwise we go backwards with a forward history
			this.navTo(route, data, replace);
		}
	},

	initData: function() {

		// 		oDataCompanies = {
		// 			WorkItems: -> file Companies.json
		// 		};
		// 		oModelCompanies = new sap.ui.model.json.JSONModel(oDataCompanies);

		// 		oModelCountryStatistics = new sap.ui.model.json.JSONModel({
		// 			businessData: -> file CountryStatistics
		// 		});
	},

	onTileTap: function(evt) {
		setTimeout(function() {
			alert("Tile taped");
		}, 300);
	},

	showContact: function(evt) {
		setTimeout(function() {
			alert("Contact tapped");
		}, 300);
	},

	onAddContact: function(evt) {
		setTimeout(function() {
			alert("Kontakt hinzufügen angeklickt");
		}, 300);
	},

	pressFacetOverview: function(evt) {
		sap.m.MessageToast.show("The facet overview is pressed.");
	},

	/*	initStackedColumn: function(oEvent) {

		var oVizFrame = this.getView().byId("idVizFrameStackedColumn");
		var oPopOver = this.getView().byId("idPopOver");
		// 		var oModel = new sap.ui.model.json.JSONModel("test-resources/sap/viz/demokit/dataset/bookstore_fiori/ByYearCity_sum.json");
		var oModel = new sap.ui.model.json.JSONModel("pure_resources/Lohnsumme_Agentur_Jahr.json");
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({

			dimensions: [{
				name: "Jahr",
				value: "{Jahr}"
            }, {
				name: 'Betriebsteil',
				value: '{Betriebsteil}'
            }],
			measures: [
				{
					name: 'Lohnsumme',
					value: '{Lohnsumme}'
                }
            ],
			data: {
				path: "/Betriebsteil"
			}
		});

		oVizFrame.setDataset(oDataset);
		oVizFrame.setModel(oModel);

		var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "primaryValues",
				'type': "Measure",
				'values': ["Lohnsumme"]
			}),
			feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "axisLabels",
				'type': "Dimension",
				'values': ["Jahr"]
			}),
			feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "regionColor",
				'type': "Dimension",
				'values': ["Betriebsteil"]
			});

		oVizFrame.setVizProperties({
			valueAxis: {
				label: {
					formatString: 'u'
				}
			},
			legend: {
				//   position: { top: true },

				title: {
					visible: false
				}
			},
			title: {
				visible: true,
				text: 'Lohnsummen pro Betriebsteil und Jahr'
			}
		});

		oVizFrame.addFeed(feedPrimaryValues);
		oVizFrame.addFeed(feedAxisLabels);
		oVizFrame.addFeed(feedColor);
		oPopOver.connect(oVizFrame.getVizUid());
	},*/

	initContactTable: function(oEvent) {

		//         var view = this.getView();
		// 		var list = view.byId("list_details");
		// 		var page = view.byId("detailsPage");
		// 		var bp_binding_context = page.getBindingContext();
		// 		if ( bp_binding_context ) {
		// 		    bp_binding_context.getPath().substr(1); //BusinessPartnerSet('3000')
		// 		    var cp_binding_context = bp_binding_context + '/' + 'ContactPersonSet';
		// 		    list.bindElement(cp_binding_context);
		// 		}
	},

	handleSelect_Contact: function(oEvent) {
		// 		var oListItem = oEvent.getParameter("listItem") || oEvent.getSource();

		// 		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
		// 		sap.ui.core.UIComponent.getRouterFor(this).navTo("ContactPerson_CRUD",{from: "Details", contextPath: oListItem.getBindingContext().getPath().substr(1)});
	},

	handleCreateCP: function(oEvent) {
		var oListItem = oEvent.getSource(); //oEvent.getParameter("listItem") || oEvent.getSource();

		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
// 		debugger;
		sap.ui.core.UIComponent.getRouterFor(this).navTo("ContactPerson_CRUD", {
			from: "Details",
			contextPath: oListItem.getBindingContext().getPath().substr(1)
		});
	}

});