(function () {
    'use strict';

    angular
        .module('comedyStore')
        .directive('csUserLogin', userLogin);

    function userLogin() {
        return {
            scope: {},
            restrict: 'E',
            template: '<p>This is the user login!</p>',
            controller: 'UserLoginViewModel',
            controllerAs: 'viewModel'
        };
    }
})();
