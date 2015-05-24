module.exports = function (config) {
    config.set({
        basePath: '',
        reporters: ['dots'],
        frameworks: ['jasmine', 'sinon'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/lodash-compat/index.js',
            'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
            'app/**/!(index).html',
            'app/**/*.module.js',
            'app/app.js',
            'app/**/*.js'
        ],
        browsers: ['PhantomJS'],
        preprocessors: {
            'app/**/!(index).html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'comedyStore.templates'
        }
    });
};
