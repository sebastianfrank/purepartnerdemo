sap.ui.core.mvc.Controller.extend("ui5_pure_businesspartner_app.view.Detail", {

	onInit: function() {
		this.initData();

		var view = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			// when detail navigation occurs, update the binding context
			if (oEvent.getParameter("name") === "Detail") {
				var context = new sap.ui.model.Context(view.getModel(), '/' + oEvent.getParameter("arguments").contextPath);
				view.setBindingContext(context);
				// Make sure the master is here
			}
		}, this);

		this.handleStackedColumnChart();

		this.handleOverviewTile();

		this.initStackedColumn();
		
		
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
		if ("Backwards" === direction) {
			window.history.go(-1);
		} else {
			var replace = true; // otherwise we go backwards with a forward history
			this.navTo(route, data, replace);
		}
	},

	//					W5l
	initData: function() {

		oDataCompanies = {
			WorkItems: [
 //{
 //	"Company": "A",
 //	"CreatedBy": "D",
 //	"Address": "8",
 //	"Opportunities": "5",
 //	"revenuToDate": "2",
 //	"Rating": "S",
 //	"LastContact": "M",
 //	"NextContact": "3",
 //	"contactActive": true
 //	},

				{
					"Company": "Advanced Metals International Ltd",
					"CreatedBy": "Debra E. Smith",
					"Address": "5322 Otter Ln Middleberge FL 32068",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013",
					"contactActive": true
						                          },
				{
					"Company": "AEI Cables",
					"CreatedBy": "Donald Binkley",
					"Address": "PO Box 1230 Georgetown Grand Cayman CAYMAN ISLANDS - UK",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "November 25, 2013",
					"contactActive": false
						                          },
				{
					"Company": "ATA Grinding Processes Ltd",
					"CreatedBy": "Debra E. Smith",
					"Address": "5322 Otter Ln Middleberge FL 32068",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "November 21, 2013",
					"NextContact": "December 25, 2013",
					"contactActive": true
						                          },
				{
					"Company": "Advanced Liquid Metals International Ltd, planes",
					"CreatedBy": "Clyde Preston Hall",
					"Address": "PO Box 1220 Georgetown Super Grand Tour Cayman CAYMAN ISLANDS - United Kingdom",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013"
						                          },
				{
					"Company": "British International Industries Ltd, toys and planes ",
					"CreatedBy": "Theresa Maïerhofer",
					"Address": "111 Example Lane Doncaster, South Yorkshire England DN59D2 ",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013"
						                          },
				{
					"Company": "Baric (Consultants) Ltd",
					"CreatedBy": "Thomas Faber",
					"Address": "4321 MAPLE ST OAKTON MD 12345-6789",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013"
						                          },
				{
					"Company": "Cranfield Defence and Security",
					"CreatedBy": "Sheena Patricia Camille - Camille Prats",
					"Address": "74 Green St Tunapuna TRINIDAD AND TOBAGO",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013",
						                          },
				{
					"Company": "Dale Lifting and Handling Ltd",
					"CreatedBy": " Cheng Li",
					"Address": "7 301 Houjie Middle of JiangNan Rd Guang Zhou GuangDong 510240 CHINA P R C",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013"
						                          },
				{
					"Company": "Eastern Petroleum Supplies Ltd",
					"CreatedBy": "Anna Gianelli",
					"Address": " PO Box 9239 Dhahran 31311 SAUDI ARABIA ",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013"
						                          },
				{
					"Company": "Farnborough Aircraft Interiors Ltd ",
					"CreatedBy": " Yuto Murase",
					"Address": " 42 1 Motohakone Hakonemaci Ashigarashimo Gun Kanagawa 250 05 JAPAN ",
					"Opportunities": "5.1 Mio Euro",
					"revenuToDate": "2.1 Mio Euro ",
					"Rating": "Silver",
					"LastContact": "May 5, 2013",
					"NextContact": "October 12, 2013"
						                          },
						                      ]
		};
		oModelCompanies = new sap.ui.model.json.JSONModel(oDataCompanies);

		oModelCountryStatistics = new sap.ui.model.json.JSONModel({
			businessData: [{
				Country: "Canada",
				revenue: 410.87,
				profit: -141.25,
				population: 34789000
							}, {
				Country: "China",
				revenue: 338.29,
				profit: 133.82,
				population: 1339724852
							}, {
				Country: "France",
				revenue: 487.66,
				profit: 348.76,
				population: 65350000
							}, {
				Country: "Germany",
				revenue: 470.23,
				profit: 217.29,
				population: 81799600
							}, {
				Country: "India",
				revenue: 170.93,
				profit: 117.00,
				population: 1210193422
							}, {
				Country: "United States",
				revenue: 905.08,
				profit: 609.16,
				population: 313490000
							}]
		});
	},

	handleOverviewTile: function() {
		// 		var oOverviewTileVBox = this.getView().byId("idOverviewTileVBox");
		// 		oOverviewTileVBox.setModel(oModelCompanies);
	},

	handleStackedColumnChart: function() {

// 		var oVizFrame = this.getView().byId("idVizFrameStackedColumn");
// 		var oPopOver = this.getView().byId("idPopOver");
		// 		var oModelProducts = new sap.ui.model.json.JSONModel("./resources/products.json");
		// 		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
		// 			dimensions : [ {
		// 				name : 'ProductId',
		// 				value : "{ProductId}"
		// 			} ],
		// 			measures : [ {
		// 				name : 'Price',
		// 				value : '{Price}'
		// 			}, {
		// 				name : 'Quantity',
		// 				value : '{Quantity}'
		// 			}, {
		// 				name : "WeightMeasure",
		// 				value : "{WeightMeasure}"
		// 			} ],
		// 			data : {
		// 				path : "/ProductCollection"
		// 			}
		// 		});

		// 		oVizFrame.setDataset(oDataset);
		// 		oVizFrame.setModel(oModelProducts);

		// 		var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem(
		// 				{
		// 					'uid' : "primaryValues",
		// 					'type' : "Measure",
		// 					'values' : [ "Price", "Quantity",
		// 							"WeightMeasure" ]
		// 				});
		// 		var feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem(
		// 				{
		// 					'uid' : "axisLabels",
		// 					'type' : "Dimension",
		// 					'values' : [ "ProductId" ]
		// 				});

		// 		oVizFrame.setVizProperties({
		// 			legend : {
		// 				title : {
		// 					visible : false
		// 				}
		// 			},

		// 			title : {
		// 				visible : true,
		// 				text : 'Produktdetailinformationen je Partner'
		// 			}
		// 		});

		// 		oVizFrame.addFeed(feedPrimaryValues);
		// 		oVizFrame.addFeed(feedAxisLabels);
		// 		oPopOver.connect(oVizFrame.getVizUid());

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

	toggleVisible: function(evt) {
		var i;
		for (i = 0; i < oDataCompanies.WorkItems.length; i++) {
			// this.getView().getModel().setProperty("/WorkItems/" + i + "/visible", evt.getParameter("state"));
			oDataCompanies.WorkItems[i].visible = evt.getParameter("state");
		}
		var oOverviewTileVBox = this.getView().byId("idOverviewTileVBox");
		oOverviewTileVBox.getModel().setData(oDataCompanies);
	},

	createODataStatement: function(evt) {
// 		var oEntry = {};
// 		oEntry.Company = "Added Company";
// 		oEntry.CreatedBy = " Yuto Murase";
// 		oEntry.Address = "Home";
// 		oEntry.Opportunities = "4.2 Mio Euro";
// 		oEntry.revenuToDate = "2.1 Mio Euro ";
// 		oEntry.Rating = "Silver";
// 		oEntry.LastContact = "May 5, 2013";
// 		oEntry.NextContact = "October 12, 2013";

// 		oModelCompanies.create('/WorkItems', oEntry, null, function() {
// 			alert("Create successful");
// 		}, function() {
// 			alert("Create failed");
// 		});
		
		
		// -----
		
		var oEntry = {};
		oEntry.Partner = "3000";
		oEntry.PartnerCp = "3333";
		oEntry.Firstname = "Yuto";
		oEntry.Lastname = "Moro";
		oEntry.ContactDate = "20150101";
		
		this.getView().getModel().create('/ContactPersonSet', oEntry, null, function() {
			alert("Create ContactPerson successful");
		}, function() {
			alert("Create ContactPerson failed");
		});
		

		//				    	{
		//                            "Company": "Farnborough Aircraft Interiors Ltd ",
		//                            "CreatedBy": " Yuto Murase",
		//                            "Address": " 42 1 Motohakone Hakonemaci Ashigarashimo Gun Kanagawa 250 05 JAPAN ",
		//                            "Opportunities": "5.1 Mio Euro",
		//                            "revenuToDate": "2.1 Mio Euro ",
		//                            "Rating": "Silver",
		//                            "LastContact": "May 5, 2013",
		//                            "NextContact": "October 12, 2013"
		//                        },
	},

	pressFacetOverview: function(evt) {
		sap.m.MessageToast.show("The facet overview is pressed.");
	},

	// //Code: Employee Quick Overview

	// onEmployeeOverviewPress:function (e) {
	//         var fCallbackNavPara = function( oQvView ) {
	//             //callback function for providing external navigation parameters
	//             var oNavConfig = {};
	//             oNavConfig.target = {};
	//             oNavConfig.target.semanticObject = "Quickoverview";
	//             oNavConfig.target.action = "Target5";
	//             oNavConfig.params = { Employee : "277" };
	//             return oNavConfig;
	//         };

	//         var fCallbackNavParaComp = function( oQvView ) {
	//             //callback function for providing external navigation parameters
	//             var oNavConfig = {};
	//             oNavConfig.target = {};
	//             oNavConfig.target.semanticObject = "Quickoverview";
	//             oNavConfig.target.action = "Target5";
	//             oNavConfig.params = { Company : "4577" };
	//             return oNavConfig;
	//         };

	// //var sImgPath = jQuery.sap.getModulePath("sap/sil/ref09") + "/img/guy.png";
	// //var sImgPathC = jQuery.sap.getModulePath("sap/sil/ref09") + "/img/accenture.png";
	//         var sImgPath = "data:image/png;base64,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";
	//         var sImgPathC = "data:image/png;base64,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";

	//         // employee data - use exact attribute names
	//         var oEmpConfig = {
	//             title : "Employee",
	//             name : "Frank Schulze",
	//             imgurl : sImgPath,
	//             department : "Corporate Functions",
	//             contactmobile : "01718484845",
	//             contactphone : "06222 854568484",
	//             contactemail : "Frank.S@company.com",
	//             contactemailsubj : "for you",
	//             companyname : "Accenture",
	//             companyaddress : "Some very long Street Number 123 , VeryLong Long Long Town, United States of America",
	//             //optional: if the following callback function is provided a Cross App navigation link from the 'card header'
	//             //will be provided - application configures the target in the callback
	//             beforeExtNav : fCallbackNavPara,

	//             //optional: if the following attributes are provided - a link to company card is available
	//             companycard : {
	//                 title : "Account",
	//                 imgurl : sImgPathC,
	//                 companyphone : "4536654564",
	//                 maincontactname : "Frank Schulze",
	//                 maincontactmobile : "01718484845",
	//                 maincontactphone : "06222 854568484",
	//                 maincontactemail : "Frank.S@company.com",
	//                 maincontactemailsubj : "for you maincontact",
	//                 //optional: if the following callback function is provided a Cross App navigation link from the 'card header'
	//                 //will be provided - application configures the target in the callback
	//                 beforeExtNav : fCallbackNavParaComp
	//             }
	//         };

	//         // get control that triggers the BusinessCard
	//         var oControl = this.byId("theButton");

	//         // call 'Business Card' reuse component
	//         var oEmployeeLaunch = new sap.ca.ui.quickoverview.EmployeeLaunch(oEmpConfig);
	//         oEmployeeLaunch.openBy(oControl);
	//     }
	// Employee Overview End

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
	},
	
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
	}

});