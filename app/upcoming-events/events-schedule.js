(function () {
    'use strict';

    angular
        .module('comedyStore')
        .service('eventsSchedule', EventsSchedule);

    EventsSchedule.$inject = ['$q', 'fakeEvents'];

    function EventsSchedule($q, fakeEvents) {
        this.getUpcoming = getUpcoming;

        function addDays(date, numberOfDaysToAdd) {
            date.setDate(date.getDate() + numberOfDaysToAdd);
            return date;
        }

        function getFakeEvents() {
            return angular.copy(fakeEvents);
        }

        function getUpcoming() {
            var upcomingEvents;
            // TODO: Get real events from somewhere
            upcomingEvents = getFakeEvents();

            _.forEach(upcomingEvents, function (upcomingEvent, index) {
                upcomingEvent.date = addDays(tonightAtRandomTime(), index);
            });

            return promiseOf(upcomingEvents);
        }

        function promiseOf(value) {
            return $q.when(value);
        }

        function randomlyChooseOne(items) {
            return _.sample(items);
        }

        function tonightAtRandomTime() {
            var hours,
                minutes,
                today;

            hours = randomlyChooseOne([19, 20, 21]);
            minutes = randomlyChooseOne([0, 15, 30, 45]);

            today = new Date();
            today.setHours(hours, minutes, 0);
            return today;
        }
    }
})();
