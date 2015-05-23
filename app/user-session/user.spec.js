describe('user', function () {
    var UserSession,
        user;

    beforeEach(module('comedyStore', function ($provide) {
        UserSession = {
            get: sinon.stub()
        };

        $provide.value('UserSession', UserSession);
    }));

    beforeEach(inject(function ($injector) {
        user = $injector.get('user');
    }));

    it('should provide the user email', function () {
        UserSession.get.returns({
            id: 'the user email'
        });

        expect(user.getEmail()).toBe('the user email');
    });

    it('should indicate that the user is logged in', function () {
        UserSession.get.returns({});
        expect(user.isLoggedIn()).toBe(true);
    });

    it('should indicate that the user is not logged in', function () {
        UserSession.get.returns(null);
        expect(user.isLoggedIn()).toBe(false);
    });
});
