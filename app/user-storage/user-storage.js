(function () {
    'use strict';

    angular
        .module('comedyStore')
        .service('userStorage', UserStorage);

    UserStorage.$inject = ['browserStorage', 'user'];

    function UserStorage(browserStorage, user) {
        this.addSeenJoke = addSeenJoke;
        this.getSeenJokes = getSeenJokes;

        function addSeenJoke(id) {
            var userEmail,
                users;

            userEmail = getUserEmail();
            users = getUsers() || {};

            if (!users[userEmail]) {
                users[userEmail] = newUser();
            }

            users[userEmail].seenJokes.push(id);
            putUsers(users);
        }

        function getSeenJokes() {
            var userEmail,
                users;

            userEmail = getUserEmail();
            users = getUsers();

            if (users && users[userEmail]) {
                return users[userEmail].seenJokes;
            }
            return [];
        }

        function getUserEmail() {
            return user.getEmail();
        }

        function getUsers() {
            return browserStorage.get('users');
        }

        function newUser() {
            return {
                seenJokes : []
            };
        }

        function putUsers(users) {
            return browserStorage.put('users', users);
        }
    }
})();
