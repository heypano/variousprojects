/*jslint browser: true*/
/*global angular, console*/
// BDD vs TDD




//Wrap all javascript in closure - good habit
(function () {
    "use strict";
    // Define the module (application component) here, then in HTML set the directive (html annotation that trigger js behavior) ng-app (runs when it loads) <html ng-app="store">. Directives define behavior and are used to run or reference javascript code and modules define dependencies
    var app = angular.module('store', [ ]),
        gems;

    //Expression are how we insert dynamic values into HTML e.g. {{ "a"+"b" }} in html
    
    //Controllers help us get data into our store (define behavior). Attach controller to html in a div using ng-controller directive 
    // e.g. <div ng-controller="StoreController as store"> and then access data like {{store.product.name}}
    
    app.controller('StoreController', function () {
        // Don't use "this", look into $scope
        this.products = gems; // You can access by array index using sort.products[0].name or whatever 
        // Or you can iterate with the directive ng-repeat e.g. ng-repeat="product in store.products"
    });
    app.controller('PanelController', function () {
        this.tab = 1;
        this.selectTab = function (setTab) {
            this.tab = setTab;
        };
        this.isSelected = function (checkTab) {
            return this.tab === checkTab;
        };
    });
    // Use ng-init directive to initialize -- or don't cause it should go iside the controller ^^^
    // Use the ng-class directive to add classes e.g. ng-class="{ active:tab === 1 }"
    gems = [
        {
            name: 'Dodecahedron',
            price: 2.95,
            description: '. . .',
            canPurchase: true, //ng-show directive helps determine whether something should be visible or not e.g. ng-show="store.product.can-purchase"
            soldOut: false, //ng-hide directive does the same thing
            images: [
                {
                    full: 'cats.jpg', // Cannot use this in img src because the expression gets evaluated after the browser tries to load it, instead, use ng-src
                    thumb: 'cats_thumb.png'
                },
                {
                    full: 'andromeda.png',
                    thumb: 'andromeda_thumb.png'
                }
            ]
        },         {
            name: 'Hidden',
            price: 2,   //you can use a filter that will determine the decimal points. Filters are piped so e.g. {{product.price | currency}} in the html
            description: '. . .',
            canPurchase: true, //ng-show directive helps determine whether something should be visible or not e.g. ng-show="store.product.can-purchase"
            soldOut: true, //ng-hide directive does the same thing
            images: [
                {
                    full: 'cats.jpg',
                    thumb: 'cats_thumb.png'
                },
                {
                    full: 'andromeda.png',
                    thumb: 'andromeda_thumb.png'
                }
            ]
        },
        {
            name: 'Pentagonal Gem',
            price: 5.95,
            description: '. . .',
            canPurchase: false, //ng-show directive helps determine whether something should be visible or not e.g. ng-show="store.product.can-purchase"
            images: [
                {
                    full: 'cats.jpg',
                    thumb: 'cats_thumb.png'
                },
                {
                    full: 'andromeda.png',
                    thumb: 'andromeda_thumb.png'
                }
            ]
        }
    ];
    
}());
