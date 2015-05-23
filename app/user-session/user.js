(function () {
    'use strict';

    angular
        .module('comedyStore')
        .service('user', User);

    User.$inject = ['UserSession'];

    function User(UserSession) {
        this.getEmail = getEmail;
        this.isLoggedIn = isLoggedIn;

        function getEmail() {
            var userSession;
            userSession = getUserSession();
            return userSession.id;
        }

        function getUserSession() {
            return UserSession.get();
        }

        function isLoggedIn() {
            var userSession;
            userSession = getUserSession();
            return userSession !== null;
        }
    }
})();
