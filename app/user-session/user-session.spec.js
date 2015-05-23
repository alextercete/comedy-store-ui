describe('UserSession', function () {
    var $cookieStore,
        UserSession;

    beforeEach(module('comedyStore', function ($provide) {
        $cookieStore = {
            get: sinon.stub(),
            put: sinon.stub(),
            remove: sinon.stub()
        };

        $provide.value('$cookieStore', $cookieStore);
    }));

    beforeEach(inject(function ($injector) {
        UserSession = $injector.get('UserSession');
    }));

    it('should create a new user session', function () {
        UserSession.create('the user email');
        expect($cookieStore.put).toHaveBeenCalledWith('user_session_id', 'the user email');
    });

    it('should destroy the existing user session', function () {
        UserSession.destroy();
        expect($cookieStore.remove).toHaveBeenCalledWith('user_session_id');
    });

    it('should provide the existing user session', function () {
        $cookieStore.get.withArgs('user_session_id').returns('the user email');

        expect(UserSession.get()).toEqual({
            id: 'the user email'
        });
    });

    it('should provide null when there is not an existing user session', function () {
        $cookieStore.get.withArgs('user_session_id').returns(undefined);
        expect(UserSession.get()).toEqual(null);
    });
});
