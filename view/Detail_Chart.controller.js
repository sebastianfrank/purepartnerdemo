sap.ui.controller("ui5_pure_businesspartner_app.view.Detail_Chart", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Detail_Chart
*/
	onInit: function() {
	   // debugger;
        this.initStackedColumn();
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Detail_Chart
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Detail_Chart
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Detail_Chart
*/
//	onExit: function() {
//
//	}

	initStackedColumn: function(oEvent) {

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
	}

});