import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';

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
  usuariosConSusComentarios: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.formularioSugerirCategoria = this.crearFormularioDeSugerirCategoria();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SugerirCategoriaPage');
  }

  guardarConsultaDeSugerirCategoria() {
    try {
      console.log(this.formularioSugerirCategoria.value);
      console.log(this.formularioSugerirCategoria.value.comentario1);
      console.log(this.formularioSugerirCategoria.value.comentario2);

      this.userService.enviarSugerenciaDeCategoria(this.formularioSugerirCategoria.value.comentario1, this.formularioSugerirCategoria.value.comentario2);
      let alert = this.alertCtrl.create({
        title: 'Ha sido enviado el mensaje',
        subTitle: 'Gracias por colaborar!',
        buttons: ['Ok']
      });
      alert.present();
    } catch (error) {
      console.log(error);
    }
  }

  private crearFormularioDeSugerirCategoria() {
    return this.formBuilder.group({
      comentario1: ['', Validators.required],
      comentario2: ['', Validators.required],
    });
  }

}
