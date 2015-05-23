(function () {
    'use strict';

    angular
        .module('comedyStore')
        .controller('UserLoginViewModel', UserLoginViewModel);

    UserLoginViewModel.$inject = ['UserSession', 'user'];

    function UserLoginViewModel(UserSession, user) {
        var viewModel;

        viewModel = this;
        viewModel.getUserEmail = getUserEmail;
        viewModel.isUserLoggedIn = isUserLoggedIn;
        viewModel.logIn = logIn;
        viewModel.logOut = logOut;
        viewModel.userEmail = null;

        function getUserEmail() {
            return user.getEmail();
        }

        function isUserLoggedIn() {
            return user.isLoggedIn();
        }

        function logIn() {
            // TODO: Validate the email format
            UserSession.create(viewModel.userEmail);
        }

        function logOut() {
            UserSession.destroy();
        }
    }
})();
