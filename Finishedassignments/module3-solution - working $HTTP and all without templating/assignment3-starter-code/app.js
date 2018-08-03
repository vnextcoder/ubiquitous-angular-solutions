(function () {
    //IIFE
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItems);


    function foundItems() {
        var ddo = {
          templateUrl: 'mytmp.html',
          scope: {
            items: '<',
            myTitle: '@title',
            onRemove: '&'
          },
          controller: NarrowItDownDirectiveController,
          controllerAs: 'list',
          bindToController: true
        };
        return ddo;
      }

    function NarrowItDownDirectiveController(){
        var list = this;

        
    }

    // }

    NarrowItDownController.$inject = ['MenuSearchService','$scope'];
    function NarrowItDownController(MenuSearchService,$scope) {
        var narrodown = this;
        narrodown.itemtofind = "";
        narrodown.items = [];
        narrodown.title="Here is the found list (0000)";
        narrodown.lastRemoved="";
        narrodown.narrowmeDown = function () {
            MenuSearchService.getMatchedMenuItems(this.itemtofind)
                .then(function (foundItems) {
                    if (foundItems!== undefined)
                    {
                        console.log ("getMatchedMenuItems Found items ", foundItems.length);
                        narrodown.items = foundItems;
                        narrodown.title="Here is the found list (" + narrodown.items.length +")";
                    }
                    else
                    {
                        narrodown.items =[];
                        narrodown.title="getMatchedMenuItems Here is the found list (" + narrodown.items.length +")";
                    }
                    
                })
                .catch(function (error) {

                    narrodown.title="Here is the found list (0)";
                    console.log("error is ", error)
                });
        }
        narrodown.removeItem = function (itemIndex) {
            console.log("'this' is: ", this);
            console.log('itemIndex was',itemIndex );
            narrodown.lastRemoved = "Last item removed was " + narrodown.items[itemIndex].name;
            //shoppingList.removeItem(itemIndex);
            narrodown.items.splice(itemIndex,1);
            //this.title = origTitle + " (" + list.items.length + " items )";
            narrodown.title="Here is the found list (" + narrodown.items.length +")";
          };


    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchstring) {
            return $http({
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            })
                .then(
                    function (response) {

                        var foundItems = [];
                        var theData=response.data;

                        if (theData.menu_items !== undefined) {
                            
                            for (var i = 0; i < theData.menu_items.length; i++) {
                                if (theData.menu_items[i].description.indexOf(searchstring) >= 0) {
                                    //console.log("i is ", i, " description is ",theData.menu_items[i].description );
                                    foundItems.push(theData.menu_items[i]);
                                }
                            }
                        }
                        console.log("foundItems in end of service method", foundItems.length);

                        return foundItems;
                    }
                );
        }
    }

})();