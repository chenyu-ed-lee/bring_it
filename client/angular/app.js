var myApp = angular.module("myApp",['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './../partials/index.html'
    })
    .when('/new', {
      templateUrl: './../partials/new.html'
    })
    .when('/events', {
      templateUrl: './../partials/events.html'
    })
    .when('/:id/show', {
      templateUrl: './../partials/show.html'
    })
    .when('/:id/edit', {
      templateUrl: './../partials/edit.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});