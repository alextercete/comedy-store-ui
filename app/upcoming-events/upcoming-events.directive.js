(function () {
    'use strict';

    angular
        .module('comedyStore')
        .directive('csUpcomingEvents', upcomingEvents);

    function upcomingEvents() {
        return {
            scope: {},
            restrict: 'E',
            template: '<p>These are the upcoming events!</p>',
            controller: 'UpcomingEventsViewModel',
            controllerAs: 'viewModel'
        };
    }
})();
