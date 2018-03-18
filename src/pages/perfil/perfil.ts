import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  usuariosActualDelDispositivo: any;




  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {
    console.log(localStorage.getItem('nickUsuarioAplicacion'));
    // console.log('ionViewDidLoad InicioDelJuegoPage');
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivo = data;
          console.log(this.usuariosActualDelDispositivo[0].nickname);
        },
        (error) => {
          console.error(error);
        }
      )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivo = data;
          console.log(this.usuariosActualDelDispositivo[0].nickname);
        },
        (error) => {
          console.error(error);
        }
      )
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
