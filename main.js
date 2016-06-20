var myApp = angular.module('movieFinder', ['ionic']);
myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'movieList.html',
      controller: 'movieList'
    })
    .state('view', {
      url: '/movieInfo/:imdbID',
      templateUrl: 'movieInfo.html',
      controller: 'movieView'
    });
  $urlRouterProvider.otherwise("/");
});
myApp.controller('movieList', function($scope,$http){
    $scope.model = {
      searchbox : "",
      searchList:[],
      totalPages :0,
      currentPage:1,
      totalResults:0
    };
    $scope.findMovies = function(){
      console.log($scope);
      console.log(" movie to search "+$scope.model.searchbox);
      $scope.model.currentPage = 1;
      $scope.model.totalPages =0;
      $scope.model.totalResults = 0;
      findMoviesOnOmdb($scope.model.searchbox);
    }
  $scope.nextPage = function(){
    $scope.model.currentPage = $scope.model.currentPage + 1;
    if($scope.model.currentPage > $scope.model.totalPages){
      $scope.model.currentPage = $scope.model.totalPages;
    }
    findMoviesOnOmdb($scope.model.searchbox);
  }
  $scope.previousPage = function(){
    $scope.model.currentPage = $scope.model.currentPage - 1;
    if($scope.model.currentPage == 0){
      $scope.model.currentPage = 1;
    }
    findMoviesOnOmdb($scope.model.searchbox);
  }
    var findMoviesOnOmdb = function(searchQuery){
      $http.get("http://www.omdbapi.com/?s=" + searchQuery + "&page="+$scope.model.currentPage)
        .then(function(response){
          console.log(response);
          $scope.model.searchList = response.data.Search;
          $scope.model.totalResults = response.data.totalResults;
          $scope.model.totalPages = parseInt($scope.model.totalResults /10);
          console.log($scope.model.searchList)
        })
    }
  });
myApp.controller('movieView', function($scope,$http,$stateParams){
  var imdbID = $stateParams.imdbID;
  $scope.viewModel;
  $http.get("http://www.omdbapi.com/?i=" + imdbID )
    .then(function(response){
      $scope.viewModel = response.data;
    })
});

