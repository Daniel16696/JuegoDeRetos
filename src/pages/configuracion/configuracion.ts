import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SugerirCategoriaPage } from '../sugerir-categoria/sugerir-categoria';
import { AyudaPage } from '../ayuda/ayuda';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { InicioDelJuegoPage } from '../inicio-del-juego/inicio-del-juego';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html'
})
export class ConfiguracionPage {
  usuariosActualDelDispositivoConfiguracion: any;
  usuarios: any;
  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    console.log(localStorage.getItem('nickUsuarioAplicacion'));
    // console.log('ionViewDidLoad InicioDelJuegoPage');
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivoConfiguracion = data;
          console.log(this.usuariosActualDelDispositivoConfiguracion[0].nickname);
        },
        (error) => {
          console.error(error);
        }
      )
  }
  borrarCuenta() {
    this.userService.getUsers()
      .subscribe(
        (data) => { // Success
          this.usuarios = data;
          let alert = this.alertCtrl.create({
            title: '¿Quieres eliminar tu cuenta?',
            message: 'Piensatelo dos veces porfavor',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Has cancelado');
                }
              },
              {
                text: 'Aceptar',
                handler: () => {
                  console.log('Has aceptado');
                  for (let i = 0; i < this.usuarios.length; i++) {
                    console.log(i);
                    console.log(this.usuarios[i].nickname);

                    if (this.usuarios[i].nickname == localStorage.getItem('nickUsuarioAplicacion')) {
                      let idDelUsuarioParaBorrar = this.usuarios[i].id;
                      this.userService.borrarUsuarioConfiguracion(idDelUsuarioParaBorrar)
                        .subscribe(
                          (data) => { // Success
                            // alert("Se ha borrado el usuario correctamente");
                            let alert = this.alertCtrl.create({
                              title: 'Se ha eliminado el usuario',
                              subTitle: '¡Hasta pronto!',
                              buttons: ['Ok']
                            });
                            alert.present();
                            localStorage.clear();
                            this.navCtrl.push(InicioDelJuegoPage);
                          },
                          (error) => {
                            console.error(error);
                          }
                        )
                    }
                  }

                }
              }
            ]
          });
          alert.present();

        },
        (error) => {
          console.error(error);
        }
      )
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }
  sugerirCategoria() {
    this.navCtrl.push(SugerirCategoriaPage);
  }
  ayuda() {
    this.navCtrl.push(AyudaPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuariosActualDelDispositivoConfiguracion = data;
          console.log(this.usuariosActualDelDispositivoConfiguracion[0].nickname);
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
