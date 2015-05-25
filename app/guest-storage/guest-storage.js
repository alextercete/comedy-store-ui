(function () {
    'use strict';

    angular
        .module('comedyStore')
        .service('guestStorage', GuestStorage);

    GuestStorage.$inject = ['GuestSession', 'browserStorage'];

    function GuestStorage (GuestSession, browserStorage) {
        this.addSeenJoke = addSeenJoke;
        this.getSeenJokes = getSeenJokes;

        function addSeenJoke(id) {
            var guest,
                sessionId;

            guest = getGuest();
            sessionId = getSessionId();

            if (!guest || guest.sessionId !== sessionId) {
                guest = newGuest(sessionId);
            }

            guest.seenJokes.push(id);
            putGuest(guest);
        }

        function getGuest() {
            return browserStorage.get('guest');
        }

        function getSeenJokes() {
            var guest,
                sessionId;

            guest = getGuest();
            sessionId = getSessionId();

            if (guest && guest.sessionId === sessionId) {
                return guest.seenJokes;
            }
            return [];
        }

        function getSessionId() {
            var session;
            session = GuestSession.get();
            return session.id;
        }

        function newGuest(sessionId) {
            return {
                sessionId: sessionId,
                seenJokes: []
            };
        }

        function putGuest(guest) {
            browserStorage.put('guest', guest);
        }
    }
})();
