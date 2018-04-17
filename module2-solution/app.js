(function (){

'use strict';

angular.module('ShoppingList',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService)
{
    var tobuy=this;

    tobuy.items=ShoppingListCheckOffService.gettobuyItems();
    tobuy.errorMessage=function(){
        if (tobuy.items.length==0)
        {
            return "Everything is bought!";
        }
        else
        {
            return "";
        }

    };
    tobuy.Bought=function(itemindex){
        ShoppingListCheckOffService.buyitem(itemindex);
    }

}

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService)
{
    var alreadybought=this;
    
    alreadybought.items=ShoppingListCheckOffService.getboughtItems();

    alreadybought.errorMessage = function(){
        if (alreadybought.items.length==0)
        {
            return "Nothing bought yet."
        }
        else
            return "";
    };

    
}



function ShoppingListCheckOffService () {
    var service = this;

    var itemstobuy=[
        {name:"Bowls", quantity:10},
        {name:"Serving Bowls", quantity:5},
        {name:"Spoons", quantity:10},
        {name:"Plates", quantity:10},
        {name:"Cereal bowls", quantity:10}
    ];
    var itemsbought=[];
    service.buyitem=function(itemindex){
       // alert(itemindex)
        if (itemindex!==undefined && itemstobuy.length>0 && (itemindex>-1   && itemindex<  itemstobuy.length))
        {
            itemsbought.push(itemstobuy[itemindex]);
            itemstobuy.splice(itemindex,1);
        }
        else
        {
            throw new Error('the itemindex is not defined or all items bought');
        }
    }

    service.gettobuyItems=function(){
        return itemstobuy;

    }

    
    service.getboughtItems=function(){
        return itemsbought;

    }

}


})();