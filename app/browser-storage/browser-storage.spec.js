describe('browserStorage', function () {
    var browserStorage,
        localStorage;

    beforeEach(module('comedyStore', function ($provide) {
        var $window;

        localStorage = {
            getItem: sinon.stub(),
            setItem: sinon.stub()
        };

        $window = {
            localStorage: localStorage
        };

        $provide.value('$window', $window);
    }));

    beforeEach(inject(function ($injector) {
        browserStorage = $injector.get('browserStorage');
    }));

    it('should provide an object', function () {
        localStorage.getItem.withArgs('the key').returns('{"the property":"the value"}');

        expect(browserStorage.get('the key')).toEqual({
            'the property': 'the value'
        });
    });

    it('should put an object', function () {
        browserStorage.put('the key', {
            'the property': 'the value'
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('the key', '{"the property":"the value"}');
    });
});
