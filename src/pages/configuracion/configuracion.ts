import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SugerirCategoriaPage } from '../sugerir-categoria/sugerir-categoria';
import { AyudaPage } from '../ayuda/ayuda';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html'
})
export class ConfiguracionPage {

  constructor(public navCtrl: NavController) {

  }
  sugerirCategoria(){
    this.navCtrl.push(SugerirCategoriaPage);
  }
  ayuda(){
    this.navCtrl.push(AyudaPage);
  }
}
