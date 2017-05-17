// See also: https://angular.io/docs/ts/latest/quickstart.html
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        '@angular/upgrade/static': 'node_modules/@angular/upgrade/bundles/upgrade-static.umd.js',
        'angular': 'node_modules/angular/angular.js',
        'interestAppNg1': 'js/app.js',
        "@uirouter/angular": "node_modules/@uirouter/angular/_bundles/ui-router-ng2.js",
        '@uirouter/angularjs': "node_modules/@uirouter/angularjs/release/angular-ui-router.js",
        '@uirouter/angular-hybrid': "node_modules/@uirouter/angular-hybrid/_bundles/ui-router-angular-hybrid.js",
        '@uirouter/core': "node_modules/@uirouter/core/_bundles/ui-router-core.js",
        '@uirouter/rx': "node_modules/@uirouter/rx/_bundles/ui-router-rx.js",
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'rxjs': {defaultExtension: 'js'},
        '@uirouter/angularjs': {defaultExtension: 'js'},
        'ts': {format: 'register', defaultExtension: 'js'}
    };

    var angularPackages = [
        'core',
        'common',
        'compiler',
        'platform-browser',
        'platform-browser-dynamic',
        'http',
        'router',
        'forms',
        'upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    angularPackages.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = {
            main: 'bundles/' + pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    });

    var config = {
        map: map,
        packages: packages,
        meta: {
            'angular': {
                format: 'global', exports: 'angular'
            },
            'angular-ui-router': {
                globals: {angular: 'angular'}
            },
            'ng-selectize': {format: 'cjs'}
        }
    }

    console.log('config', config);

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
