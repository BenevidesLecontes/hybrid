/**
 * Created by benevideschissanga on 24/02/17.
 */
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hellocomponent',
    templateUrl: '/templates/hello.html'
})
export class HelloComponent implements OnInit {
    form: FormGroup;
    wellcome: string;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.wellcome = 'Hello world in ng2';
        this.form = this.formBuilder.group({
            nome: [''],
            telefones: this.formBuilder.array([this.initTelefones()]),
        })
    }

    initTelefones() {
        return this.formBuilder.group({
            numero: ['', Validators.maxLength(10)],
            ddd: ['', Validators.maxLength(2)]
        });
    }

    addTelefone() {
        const control = < FormArray > this.form.controls['telefones'];
        control.push(this.formBuilder.group({
            numero: ['', Validators.maxLength(10)],
            ddd: ['', Validators.maxLength(2)],
            tipo: ['']
        }));
    }
}
