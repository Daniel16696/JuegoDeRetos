import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AyudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  formularioAyuda: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.formularioAyuda = this.crearFormularioDeAyuda();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudaPage');
  }

  guardarConsultaDeAyuda() {
    console.log(this.formularioAyuda.value);
  }

  private crearFormularioDeAyuda() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      comentario: ['', Validators.required],
    });
  }

}
