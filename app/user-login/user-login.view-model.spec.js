describe('UserLoginViewModel', function () {
    var UserSession,
        user,
        viewModel;

    beforeEach(module('comedyStore'));

    beforeEach(inject(function ($controller) {
        UserSession = {
            create: sinon.stub(),
            destroy: sinon.stub()
        };

        user = {
            getEmail: sinon.stub(),
            isLoggedIn: sinon.stub()
        };

        viewModel = $controller('UserLoginViewModel', {
            UserSession: UserSession,
            user: user
        });
    }));

    it('should provide the user email', function () {
        user.getEmail.returns('the user email');
        expect(viewModel.getUserEmail()).toBe('the user email');
    });

    it('should indicate that the user is logged in', function () {
        user.isLoggedIn.returns(true);
        expect(viewModel.isUserLoggedIn()).toBe(true);
    });

    it('should indicate that the user is not logged in', function () {
        user.isLoggedIn.returns(false);
        expect(viewModel.isUserLoggedIn()).toBe(false);
    });

    it('should log the user in', function () {
        viewModel.userEmail = 'the user email';
        viewModel.logIn();

        expect(UserSession.create).toHaveBeenCalledWith('the user email');
    });

    it('should log the user out', function () {
        viewModel.logOut();
        expect(UserSession.destroy).toHaveBeenCalled();
    });
});
