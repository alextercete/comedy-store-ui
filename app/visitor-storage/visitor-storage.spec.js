describe('visitorStorage', function () {
    var guestStorage,
        user,
        userStorage,
        visitorStorage;

    beforeEach(module('comedyStore', function ($provide) {
        guestStorage = {
            addSeenJoke: sinon.stub(),
            getSeenJokes: sinon.stub()
        };

        user = {
            isLoggedIn: sinon.stub()
        };

        userStorage = {
            addSeenJoke: sinon.stub(),
            getSeenJokes: sinon.stub()
        };

        $provide.value('guestStorage', guestStorage);
        $provide.value('user', user);
        $provide.value('userStorage', userStorage);
    }));

    beforeEach(inject(function ($injector) {
        visitorStorage = $injector.get('visitorStorage');
    }));

    it('should provide the seen jokes for a logged in user', function () {
        user.isLoggedIn.returns(true);
        userStorage.getSeenJokes.returns([1, 2]);

        expect(visitorStorage.getSeenJokes()).toEqual([1, 2]);
    });

    it('should provide the seen jokes for a guest', function () {
        user.isLoggedIn.returns(false);
        guestStorage.getSeenJokes.returns([3, 4]);

        expect(visitorStorage.getSeenJokes()).toEqual([3, 4]);
    });

    it('should add a seen joke for a logged in user', function () {
        user.isLoggedIn.returns(true);
        visitorStorage.addSeenJoke(123);

        expect(userStorage.addSeenJoke).toHaveBeenCalledWith(123);
    });

    it('should add a seen joke for a guest', function () {
        user.isLoggedIn.returns(false);
        visitorStorage.addSeenJoke(456);

        expect(guestStorage.addSeenJoke).toHaveBeenCalledWith(456);
    });
});
