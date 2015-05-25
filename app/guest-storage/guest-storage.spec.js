describe('guestStorage', function () {
    var GuestSession,
        browserStorage,
        guestStorage;

    beforeEach(module('comedyStore', function ($provide) {
        GuestSession = {
            get: sinon.stub()
        };

        browserStorage = {
            get: sinon.stub(),
            put: sinon.stub()
        };

        $provide.value('GuestSession', GuestSession);
        $provide.value('browserStorage', browserStorage);
    }));

    beforeEach(inject(function ($injector) {
        guestStorage = $injector.get('guestStorage');
    }));

    it('should provide the seen jokes', function () {
        GuestSession.get.returns({
            id: 'the session id'
        });

        browserStorage.get.withArgs('guest').returns({
            sessionId: 'the session id',
            seenJokes: [1, 2]
        });

        expect(guestStorage.getSeenJokes()).toEqual([1, 2]);
    });

    it('should provide empty seen jokes when no information about the guest is available', function () {
        GuestSession.get.returns({
            id: 'the session id'
        });

        browserStorage.get.withArgs('guest').returns(null);

        expect(guestStorage.getSeenJokes()).toEqual([]);
    });

    it('should provide empty seen jokes when the guest session has expired', function () {
        GuestSession.get.returns({
            id: 'the session id'
        });

        browserStorage.get.withArgs('guest').returns({
            sessionId: 'expired session id',
            seenJokes: [1, 2]
        });

        expect(guestStorage.getSeenJokes()).toEqual([]);
    });

    it('should add a seen joke', function () {
        GuestSession.get.returns({
            id: 'the session id'
        });

        browserStorage.get.withArgs('guest').returns({
            sessionId: 'the session id',
            seenJokes: [1, 2]
        });

        guestStorage.addSeenJoke(3);

        expect(browserStorage.put).toHaveBeenCalledWith('guest', sinon.match({
            sessionId: 'the session id',
            seenJokes: [1, 2, 3]
        }));
    });

    it('should add a seen joke when no information about the guest is available', function () {
        GuestSession.get.returns({
            id: 'the session id'
        });

        browserStorage.get.withArgs('guest').returns(null);

        guestStorage.addSeenJoke(3);

        expect(browserStorage.put).toHaveBeenCalledWith('guest', sinon.match({
            sessionId: 'the session id',
            seenJokes: [3]
        }));
    });

    it('should add a seen joke when the guest session has expired', function () {
        GuestSession.get.returns({
            id: 'the session id'
        });

        browserStorage.get.withArgs('guest').returns({
            sessionId: 'expired session id',
            seenJokes: [1, 2]
        });

        guestStorage.addSeenJoke(3);

        expect(browserStorage.put).toHaveBeenCalledWith('guest', sinon.match({
            sessionId: 'the session id',
            seenJokes: [3]
        }));
    });
});
