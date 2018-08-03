(function () {
    //IIFE
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .filter('titleCase', TitleCaseFilter)
        .filter('capitalize', CapitalizeFilter)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItems);

    function TitleCaseFilter() {
        return function (input) {
            input = input || '';
            return input.replace(/\w\S*/g, function (text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        };
    }

    function CapitalizeFilter() {
        return function (input, scope) {
            if (input != null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
    }

    function foundItems() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                items: '<',
                title: '@title',
                isFinding: '@isFinding',
                onRemove: '&'
            },
            controller: NarrowItDownDirectiveController,
            controllerAs: 'list',
            bindToController: true,
            link: NarrowItDownDirectiveLink
        };
        return ddo;
    }

    function NarrowItDownDirectiveController() {
        var list = this;

    }


    function NarrowItDownDirectiveLink(scope,element,attrs, controller)
    {
        scope.$watch('list.isFinding', function (newValue, oldValue) {
        
            if (newValue=="true") {
                console.log("showing the loader");
                displaymenuList(element);
            }
            else {
                console.log("hiding the loader");
                hidemenuList(element);
            }
        });
    }

    function displaymenuList(element)
    {
        var loaderElement = element.find("div.loader");
        console.log(loaderElement);
        loaderElement.slideDown("slow");
    }

    function hidemenuList(element)
    {
        var loaderElement = element.find("div.loader");
        console.log(loaderElement);
        loaderElement.slideUp("slow");

    }

    NarrowItDownController.$inject = ['MenuSearchService', '$scope'];

    function NarrowItDownController(MenuSearchService, $scope) {
        var narrodown = this;
        narrodown.itemtofind = "";
        narrodown.items = [];
        narrodown.title = "";
        narrodown.isFinding=false;
        narrodown.narrowmeDown = function () {

            narrodown.isFinding=true;
            if (narrodown.itemtofind == "") {
                narrodown.title = "Nothing Found!!";
                narrodown.isFinding=false;
                narrodown.items = [];
                return;
            } else {
                narrodown.title="Finding...";
                narrodown.items=[];
                MenuSearchService.getMatchedMenuItems(this.itemtofind)
                    .then(function (foundItems) {
                        if (foundItems !== undefined) {
                            //console.log("getMatchedMenuItems Found items ", foundItems.length);
                            if (foundItems.length == 0) {
                                narrodown.title = "Nothing Found!!";
                            } else {
                                narrodown.items = foundItems;
                                narrodown.title = "Here is the found list (" + narrodown.items.length + ")";
                            }
                        } else {
                            narrodown.items = [];
                            narrodown.title = "getMatchedMenuItems Here is the found list (" + narrodown.items.length + ")";
                        }
                        narrodown.isFinding=false;

                    })
                    .catch(function (error) {

                        narrodown.title = "Here is the found list (0)";
                        console.log("error is ", error)
                        narrodown.isFinding=false;

                    });
            }
        }
        narrodown.removeItem = function (itemIndex) {
            this.items.splice(itemIndex, 1);
            this.title = "Here is the found list (" + this.items.length + ")";

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
                        var theData = response.data;

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