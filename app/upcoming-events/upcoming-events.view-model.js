(function () {
    'use strict';

    angular
        .module('comedyStore')
        .controller('UpcomingEventsViewModel', UpcomingEventsViewModel);

    UpcomingEventsViewModel.$inject = ['$filter', 'eventsSchedule'];

    function UpcomingEventsViewModel($filter, eventsSchedule) {
        var viewModel;

        viewModel = this;
        viewModel.getFormattedArtistNamesFor = getFormattedArtistNamesFor;
        viewModel.getFormattedDayAndMonthFor = getFormattedDayAndMonthFor;
        viewModel.getFormattedDayOfWeekAndTimeFor = getFormattedDayOfWeekAndTimeFor;
        viewModel.getFormattedPriceFor = getFormattedPriceFor;
        viewModel.getUpcomingEvents = getUpcomingEvents;
        viewModel.initialise = initialise;

        function formatCurrency(amount) {
            var poundSign;
            poundSign = '\u00A3';
            return $filter('currency')(amount, poundSign, 0);
        }

        function formatDate(date, format) {
            return $filter('date')(date, format);
        }

        function getFormattedArtistNamesFor(upcomingEvent) {
            var lastArtist,
                otherArtists,
                parts;

            lastArtist = _.last(upcomingEvent.artists);
            otherArtists = _.initial(upcomingEvent.artists);
            parts = [];

            if (otherArtists.length) {
                parts.push(otherArtists.join(', '));
            }

            parts.push(lastArtist);

            return parts.join(' and ');
        }

        function getFormattedDayAndMonthFor(upcomingEvent) {
            return formatDate(upcomingEvent.date, 'dd MMM');
        }

        function getFormattedDayOfWeekAndTimeFor(upcomingEvent) {
            var dayOfWeek,
                time;

            dayOfWeek = formatDate(upcomingEvent.date, 'EEE');
            time = formatDate(upcomingEvent.date, 'h:mma').toLowerCase();

            return dayOfWeek + ' - ' + time;
        }

        function getFormattedPriceFor(upcomingEvent) {
            var formattedConcessionPrice,
                formattedRegularPrice;

            formattedConcessionPrice = formatCurrency(upcomingEvent.price.concession);
            formattedRegularPrice = formatCurrency(upcomingEvent.price.regular);

            return formattedRegularPrice + '/' + formattedConcessionPrice + ' Concession';
        }

        function getUpcomingEvents() {
            return eventsSchedule.getUpcoming().then(function (upcomingEvents) {
                viewModel.upcomingEvents = upcomingEvents;
            });
        }

        function initialise() {
            return getUpcomingEvents();
        }
    }
})();
