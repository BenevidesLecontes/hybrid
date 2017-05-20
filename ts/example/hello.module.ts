/**
 * Created by benevideschissanga on 18/05/17.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HelloComponent} from './hello.component';
import {HelloWorld} from './hello.app';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HelloComponent
    ],

    entryComponents: [HelloComponent],
    providers: [],
})
export class HelloModule {

}
const hello = new HelloWorld();
