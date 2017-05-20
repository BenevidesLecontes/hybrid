/**
 * Created by benevideschissanga on 28/02/17.
 */
//Example ng1 app in typescript
import {HelloComponent} from './hello.component';

declare const angular: any;

export class HelloWorld {
    constructor() {
        angular.module('interestApp').config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('hello', {
                    url: '/hello',
                    component: HelloComponent
                });
        }]);
    }
}
