(function () {
    'use strict';

    angular
        .module('comedyStore')
        .directive('csUpcomingEvents', upcomingEvents);

    function upcomingEvents() {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'upcoming-events/upcoming-events.html',
            controller: 'UpcomingEventsViewModel',
            controllerAs: 'viewModel',
            link: function (scope, element, attributes, viewModel) {
                viewModel.initialise();
            }
        };
    }
})();
