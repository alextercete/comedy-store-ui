module.exports = function (config) {
    config.set({
        basePath: '',
        reporters: ['dots'],
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.module.js',
            'app/app.js',
            'app/**/*.js'
        ],
        browsers: ['PhantomJS']
    });
};
