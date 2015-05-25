describe('GuestSession', function () {
    var $cookieStore,
        GuestSession;

    beforeEach(module('comedyStore', function ($provide) {
        $cookieStore = {
            get: sinon.stub(),
            put: sinon.stub()
        };

        $provide.value('$cookieStore', $cookieStore);
    }));

    beforeEach(inject(function ($injector) {
        GuestSession = $injector.get('GuestSession');
    }));

    it('should provide the existing guest session', function () {
        $cookieStore.get.withArgs('guest_session_id').returns('the session id');

        expect(GuestSession.get()).toEqual({
            id: 'the session id'
        });
    });

    it('should provide a new guest session', function () {
        var guestSession;

        $cookieStore.get.withArgs('guest_session_id').returns(undefined);

        guestSession = GuestSession.get();

        expect(guestSession.id).toBeDefined();
        expect($cookieStore.put).toHaveBeenCalledWith('guest_session_id', guestSession.id);
    });

    it('should provide a unique session id', function () {
        var firstSession,
            secondSession;

        $cookieStore.get.withArgs('guest_session_id').returns(undefined);

        firstSession = GuestSession.get();
        secondSession = GuestSession.get();

        expect(secondSession.id).not.toBe(firstSession.id);
    });
});
