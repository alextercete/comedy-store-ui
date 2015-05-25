(function () {
    'use strict';

    angular
        .module('comedyStore')
        .service('visitorStorage', VisitorStorage);

    VisitorStorage.$inject = ['guestStorage', 'user', 'userStorage'];

    function VisitorStorage(guestStorage, user, userStorage) {
        this.addSeenJoke = addSeenJoke;
        this.getSeenJokes = getSeenJokes;

        function addSeenJoke(id) {
            var delegate = getDelegate();
            delegate.addSeenJoke(id);
        }

        function getDelegate() {
            return user.isLoggedIn() ? userStorage : guestStorage;
        }

        function getSeenJokes() {
            var delegate = getDelegate();
            return delegate.getSeenJokes();
        }
    }
})();
