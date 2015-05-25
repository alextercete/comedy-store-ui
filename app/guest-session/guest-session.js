(function () {
    'use strict';

    angular
        .module('comedyStore')
        .factory('GuestSession', GuestSession);

    GuestSession.$inject = ['$cookieStore'];

    function GuestSession($cookieStore) {
        var key;
        key = 'guest_session_id';

        return {
            get: get
        };

        function get() {
            var id;
            id = $cookieStore.get(key);

            if (!id) {
                id = newUniqueId();
                $cookieStore.put(key, id);
            }

            return {
                id: id
            };
        }

        // From: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        function newUniqueId() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
        }
    }
})();
