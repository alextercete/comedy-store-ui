describe('userStorage', function () {
    var browserStorage,
        user,
        userStorage;

    beforeEach(module('comedyStore', function ($provide) {
        browserStorage = {
            get: sinon.stub(),
            put: sinon.stub()
        };

        user = {
            getEmail: sinon.stub()
        };

        $provide.value('browserStorage', browserStorage);
        $provide.value('user', user);
    }));

    beforeEach(inject(function ($injector) {
        userStorage = $injector.get('userStorage');
    }));

    it('should provide the seen jokes', function () {
        user.getEmail.returns('the user email');

        browserStorage.get.withArgs('users').returns({
            'the user email': {
                seenJokes: [1, 2]
            }
        });

        expect(userStorage.getSeenJokes()).toEqual([1, 2]);
    });

    it('should provide empty seen jokes when no information about the users is available', function () {
        user.getEmail.returns('the user email');
        browserStorage.get.withArgs('users').returns(null);

        expect(userStorage.getSeenJokes()).toEqual([]);
    });

    it('should provide empty seen jokes when no information about the specific user is available', function () {
        user.getEmail.returns('the user email');
        browserStorage.get.withArgs('users').returns({});

        expect(userStorage.getSeenJokes()).toEqual([]);
    });

    it('should add a seen joke', function () {
        user.getEmail.returns('the user email');

        browserStorage.get.withArgs('users').returns({
            'the user email': {
                seenJokes: [1, 2]
            }
        });

        userStorage.addSeenJoke(3);

        expect(browserStorage.put).toHaveBeenCalledWith('users', sinon.match({
            'the user email': {
                seenJokes: [1, 2, 3]
            }
        }));
    });

    it('should add a seen joke when no information about the users is available', function () {
        user.getEmail.returns('the user email');
        browserStorage.get.withArgs('users').returns(null);

        userStorage.addSeenJoke(3);

        expect(browserStorage.put).toHaveBeenCalledWith('users', sinon.match({
            'the user email': {
                seenJokes: [3]
            }
        }));
    });

    it('should add a seen joke when no information about the specific user is available', function () {
        user.getEmail.returns('one user email');
        browserStorage.get.withArgs('users').returns({
            'another user email': {
                seenJokes: [1, 2]
            }
        });

        userStorage.addSeenJoke(3);

        expect(browserStorage.put).toHaveBeenCalledWith('users', sinon.match({
            'one user email': {
                seenJokes: [3]
            },
            'another user email': {
                seenJokes: [1, 2]
            }
        }));
    });
});
