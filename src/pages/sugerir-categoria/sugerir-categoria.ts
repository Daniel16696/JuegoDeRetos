import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SugerirCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sugerir-categoria',
  templateUrl: 'sugerir-categoria.html',
})
export class SugerirCategoriaPage {
  
  formularioSugerirCategoria: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.formularioSugerirCategoria = this.crearFormularioDeSugerirCategoria();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SugerirCategoriaPage');
  }

  guardarConsultaDeSugerirCategoria() {
    console.log(this.formularioSugerirCategoria.value);
  }

  private crearFormularioDeSugerirCategoria() {
    return this.formBuilder.group({
      comentario1: ['', Validators.required],
      comentario2: ['', Validators.required],
    });
  }

}
