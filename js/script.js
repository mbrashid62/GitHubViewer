/**
 * Created by billrashid on 1/5/15.
 */
// Code goes here

(function(){
    var app = angular.module("githubViewer", []);
    var MainController = function($scope, $http)
    {
        var onUserComplete = function(response)
        {
            $scope.user = response.data;

            //Get repositotry information
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function(response)
        {
            $scope.repos = response.data;
        }

        var onError = function(reason)
        {
            $scope.error = "Could not fetch data";
        };


        $scope.search = function(username)
        {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        //initialzing values inside scope
        $scope.username = "odetocode";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";



    };


    app.controller("MainController", ["$scope", "$http", MainController]);

}());
