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
					initData : function() {
						
						oDataCompanies = { WorkItems: [
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
						                      ]};
						oModelCompanies = new sap.ui.model.json.JSONModel(oDataCompanies);
						
						
						oModelCountryStatistics = new sap.ui.model.json.JSONModel({
							businessData : [ {
								Country : "Canada",
								revenue : 410.87,
								profit : -141.25,
								population : 34789000
							}, {
								Country : "China",
								revenue : 338.29,
								profit : 133.82,
								population : 1339724852
							}, {
								Country : "France",
								revenue : 487.66,
								profit : 348.76,
								population : 65350000
							}, {
								Country : "Germany",
								revenue : 470.23,
								profit : 217.29,
								population : 81799600
							}, {
								Country : "India",
								revenue : 170.93,
								profit : 117.00,
								population : 1210193422
							}, {
								Country : "United States",
								revenue : 905.08,
								profit : 609.16,
								population : 313490000
							} ]
						});
					},
					
					handleOverviewTile : function() {
				// 		var oOverviewTileVBox = this.getView().byId("idOverviewTileVBox");
				// 		oOverviewTileVBox.setModel(oModelCompanies);
					},

					handleStackedColumnChart : function() {

						var oVizFrame = this.getView().byId("idVizFrameStackedColumn");
						var oPopOver = this.getView().byId("idPopOver");
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
					
				    onTileTap: function (evt) {
				        setTimeout(function () {
				            alert("Tile taped");
				        }, 300);
				    },

				    showContact: function (evt) {
				        setTimeout(function () {
				            alert("Contact tapped");
				        }, 300);
				    },

				    toggleVisible: function (evt) {
				        var i;
				        for (i = 0; i < oDataCompanies.WorkItems.length; i++) {
				            // this.getView().getModel().setProperty("/WorkItems/" + i + "/visible", evt.getParameter("state"));
				            oDataCompanies.WorkItems[i].visible = evt.getParameter("state");
				        }
				        var oOverviewTileVBox = this.getView().byId("idOverviewTileVBox");
				        oOverviewTileVBox.getModel().setData(oDataCompanies);
				    },
				    
				    createODataStatement: function (evt){
				    	var oEntry = {};
				    	oEntry.Company = "Added Company";
				    	oEntry.CreatedBy = " Yuto Murase";
				    	oEntry.Address = "Home";
				    	oEntry.Opportunities = "4.2 Mio Euro";
                        oEntry.revenuToDate =  "2.1 Mio Euro ";
                        oEntry.Rating = "Silver";
                        oEntry.LastContact = "May 5, 2013";
                        oEntry.NextContact = "October 12, 2013";
				    
				    	oModelCompanies.create('/WorkItems', oEntry, null, function(){ alert("Create successful"); }, function(){ alert("Create failed"); } );
				    	
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
				    }
});
