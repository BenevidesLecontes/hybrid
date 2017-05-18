/**
 *  Copyright (c) 2016, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Injector, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {UrlService} from "@uirouter/core";
import "interestAppNg1"; // "bare import" for side-effects
import {AddPinComponent} from "./components/AddPinComponent";
import {PinControlsComponent} from "./components/PinControlsComponent";
import {AnalyticsService} from "./services/AnalyticsService";
import {downgradeComponent, downgradeInjectable, UpgradeModule} from "@angular/upgrade/static";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {UIRouterUpgradeModule} from "@uirouter/angular-hybrid";

declare const angular: any;

/*
 * Create our upgradeAdapter
 */
export function getPinsService($injector) {
    $injector.get('wiAuthenticationService');
}
export function getUiRouterState($injector) {
    $injector.get('wiAuthenticationService');
}

/*
 * Expose our ng2 content to ng1
 */
angular.module('interestApp').config(['$urlServiceProvider', ($urlService: UrlService) => $urlService.deferIntercept()]);
angular.module('interestApp')
    .directive('pinControls',
        downgradeComponent({
            component: PinControlsComponent,
            inputs: ['pin'],
            outputs: ['faved']
        }) as angular.IDirectiveFactory)
    .directive('addPin',
        downgradeComponent({
            component: AddPinComponent
        }) as angular.IDirectiveFactory);

angular.module('interestApp')
    .factory('AnalyticsService',
        downgradeInjectable(AnalyticsService));


@NgModule({
    declarations: [
        PinControlsComponent,
        AddPinComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        UIRouterUpgradeModule,
        UpgradeModule,
    ],
    entryComponents: [PinControlsComponent],
    providers: [AnalyticsService,
        {provide: 'PinsService', deps: ['$injector'], useFactory: getPinsService},
        {provide: '$state', deps: ['$injector'], useFactory: getUiRouterState},
    ]
})
class InterestAppModule {
    ngDoBootstrap() { /* no body */
    }
}


/*
 * Bootstrap the App
 */
angular.element(document).ready(function () {
    // Manually bootstrap the Angular app
    platformBrowserDynamic().bootstrapModule(InterestAppModule).then(platformRef => {
        const injector: Injector = platformRef.injector;
        const upgrade = injector.get(UpgradeModule) as UpgradeModule;

        // Manually bootstrap the AngularJS app
        upgrade.bootstrap(document.body, ['interestApp']);

        // Intialize the Angular Module (get() any UIRouter service from DI to initialize it)
        const url: UrlService = injector.get(UrlService);
        // Instruct UIRouter to listen to URL changes
        url.listen();
        url.sync();
    });
});
