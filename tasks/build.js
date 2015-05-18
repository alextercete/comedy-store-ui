require('shelljs/global');

var bundle,
    findIn,
    files,
    javascriptFiles,
    moduleFiles;

findIn = function (directory, includePattern, excludePattern) {
    return find(directory).filter(function (file) {
        return file.match(includePattern) && !(excludePattern && file.match(excludePattern));
    });
};

moduleFiles = findIn('app', /\.module\.js$/);
javascriptFiles = findIn('app', /\.js$/, /(\/app|\.module|\.spec)\.js$/);

files = [].concat(moduleFiles, 'app/app.js', javascriptFiles);
bundle = cat(files);
echo(bundle);
