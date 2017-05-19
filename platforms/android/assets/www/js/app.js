// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','homeController'])

  .run(function ($ionicPlatform,$state) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $state.go("home");
    });

    

  }).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.views.swipeBackEnabled(false); //Desabilita swipe para voltar (nativo no iOS)  
    //$ionicConfigProvider.scrolling.jsScrolling(false);

    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'homeController',
        cache: false
      })

      // $urlRouterProvider.otherwise('/home');

  }).directive('onReadFile', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
        var fn = $parse(attrs.onReadFile);

        element.on('change', function (onChangeEvent) {
          var reader = new FileReader();

          reader.onload = function (onLoadEvent) {
            scope.$apply(function () {
              fn(scope, { $fileContent: onLoadEvent.target.result });
            });
          };

          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        });
      }
    };
  });
