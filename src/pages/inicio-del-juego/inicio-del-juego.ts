import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';

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
  users: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider) {
    this.nicknameUsuario = this.crearNicknameUsuario();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad InicioDelJuegoPage');
    this.userService.getUsers()
      .subscribe(
        (data) => { // Success
          this.users = data['results'];
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      )
  }
  guardarNicknameUsuario() {
    this.userService.postDatos(this.nicknameUsuario.value.nickname);
    console.log(this.nicknameUsuario.value.nickname);
    window.localStorage['nickUsuarioAplicacion'] = this.nicknameUsuario.value.nickname;
    this.navCtrl.push(TabsPage);
  }


  private crearNicknameUsuario() {
    return this.formBuilder.group({
      nickname: ['', Validators.required],
    });
  }
}
