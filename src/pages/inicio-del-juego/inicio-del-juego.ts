import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the InicioDelJuegoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-del-juego',
  templateUrl: 'inicio-del-juego.html',
})
export class InicioDelJuegoPage {

  nicknameUsuario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.nicknameUsuario = this.crearNicknameUsuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioDelJuegoPage');
  }

  guardarNicknameUsuario() {
    console.log(this.nicknameUsuario.value);
  }

  private crearNicknameUsuario() {
    return this.formBuilder.group({
      nickname: ['', Validators.required],
    });
  }
}
