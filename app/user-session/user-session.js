(function () {
    'use strict';

    angular
        .module('comedyStore')
        .factory('UserSession', UserSession);

    UserSession.$inject = ['$cookieStore'];

    function UserSession($cookieStore) {
        var key;
        key = 'user_session_id';

        return {
            create: create,
            destroy: destroy,
            get: get
        };

        function create(email) {
            // TODO: Set an expiration date
            $cookieStore.put(key, email);
        }

        function destroy() {
            $cookieStore.remove(key);
        }

        function get() {
            var id;
            id = $cookieStore.get(key);

            if (id) {
                return {
                    id: id
                };
            }

            return null;
        }
    }
})();
