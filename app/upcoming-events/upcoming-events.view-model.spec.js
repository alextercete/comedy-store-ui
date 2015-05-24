describe('UpcomingEventsViewModel', function () {
    var $q,
        eventsSchedule,
        upcomingEvent,
        viewModel;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($injector) {
        var $controller;

        eventsSchedule = {
            getUpcoming: sinon.stub()
        };
        upcomingEvent = {};

        $controller = $injector.get('$controller');
        $q = $injector.get('$q');

        viewModel = $controller('UpcomingEventsViewModel', {
            eventsSchedule: eventsSchedule
        });
    }));

    afterEach(inject(function ($rootScope) {
        $rootScope.$digest();
    }));

    it('should provide the upcoming events', function () {
        var theRetrievedEvents;
        theRetrievedEvents = [];

        eventsSchedule.getUpcoming.returns(promiseOf(theRetrievedEvents));

        viewModel.getUpcomingEvents().then(function () {
            expect(viewModel.upcomingEvents).toBe(theRetrievedEvents);
        });
    });

    it('should provide formatted artist names for an event with one artist', function () {
        upcomingEvent.artists = ['Moe'];
        expect(viewModel.getFormattedArtistNamesFor(upcomingEvent)).toBe('Moe');
    });

    it('should provide formatted artist names for an event with two artists', function () {
        upcomingEvent.artists = ['Moe', 'Larry'];
        expect(viewModel.getFormattedArtistNamesFor(upcomingEvent)).toBe('Moe and Larry');
    });

    it('should provide formatted artist names for an event with several artists', function () {
        upcomingEvent.artists = ['Moe', 'Larry', 'Curly', 'Joe'];
        expect(viewModel.getFormattedArtistNamesFor(upcomingEvent)).toBe('Moe, Larry, Curly and Joe');
    });

    it('should provide formatted day and month for an event', function () {
        upcomingEvent.date = new Date('2001-01-01');
        expect(viewModel.getFormattedDayAndMonthFor(upcomingEvent)).toBe('01 Jan');
    });

    it('should provide formatted day of week and time for an event', function () {
        upcomingEvent.date = new Date('2001-01-20T20:01');
        expect(viewModel.getFormattedDayOfWeekAndTimeFor(upcomingEvent)).toBe('Sat - 8:01pm');
    });

    it('should provide formatted price for an event', function () {
        var poundSign;
        poundSign = '\u00A3';

        upcomingEvent.price = {
            regular: 8.0,
            concession: 5.0
        };

        expect(viewModel.getFormattedPriceFor(upcomingEvent)).toBe(poundSign + '8/' + poundSign + '5 Concession');
    });

    function promiseOf(value) {
        return $q.when(value);
    }
});
