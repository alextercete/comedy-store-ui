(function () {
    'use strict';

    angular
        .module('comedyStore')
        .directive('csUserLogin', userLogin);

    function userLogin() {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'user-login/user-login.html',
            controller: 'UserLoginViewModel',
            controllerAs: 'viewModel'
        };
    }
})();
