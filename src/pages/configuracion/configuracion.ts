import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SugerirCategoriaPage } from '../sugerir-categoria/sugerir-categoria';
import { ContactanosPage } from '../contactanos/contactanos';
import { UserServiceProvider } from '../../providers/user-service/user-service';
// import { InicioDelJuegoPage } from '../inicio-del-juego/inicio-del-juego';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html'
})
export class ConfiguracionPage {
  usuariosActualDelDispositivoConfiguracion: any;
  usuarios: any;
  users: any;
  usuarioEnConcretoDeLaAplicacion: any;
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
                            // this.navCtrl.push(InicioDelJuegoPage);
                            let interval = setInterval(function () {
                              console.log("he entrado y estoy esperando 2 segundos");
                              location.reload();
                              console.log("he reiniciado");
                              clearInterval(interval);
                              console.log("he borrado el intervalo");
                            }, 2000);
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
  contactanos() {
    this.navCtrl.push(ContactanosPage);
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

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Cambiar nickname',
      // subTitle: 'Nuevo nickname',
      inputs: [
        {
          name: 'nickname',
          placeholder: 'Escriba su nuevo nickname'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {


            console.log(localStorage.getItem('nickUsuarioAplicacion'));
            let detectarBoolean = false;
            this.userService.getUsers()
              .subscribe(
                (data2) => { // Success
                  this.users = data2;
                  console.log(data2);

                  for (let i = 0; i < this.users.length; i++) {
                    console.log(i);
                    console.log(this.users[i].nickname);

                    if (this.users[i].nickname == data.nickname) {
                      // alert("Este usuario existe ya, porfavor introduce otro nickname");
                      let alert = this.alertCtrl.create({
                        title: 'Este usuario ya existe',
                        subTitle: 'Introduzca otro nickname',
                        buttons: ['Ok']
                      });
                      alert.present();
                      console.log("Hemos salido");
                      detectarBoolean = true;
                    }
                  }
                  console.log("Hemos salido del for");
                  if (detectarBoolean == false) {
                    console.log("He modificado el usuario");
                    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
                      .subscribe(
                        (data3) => { // Success
                          this.usuarioEnConcretoDeLaAplicacion = data3;
                          console.log(this.usuarioEnConcretoDeLaAplicacion[0].id);

                          this.userService.cambiarNicknameDelUsuario(
                            this.usuarioEnConcretoDeLaAplicacion[0].id,
                            data.nickname,
                            this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                            this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                            this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje
                          );

                          window.localStorage['nickUsuarioAplicacion'] = data.nickname;
                          let alert2 = this.alertCtrl.create({
                            title: 'Has cambiado de nickname',
                            subTitle: 'Realizado con éxito',
                            buttons: ['Ok']
                          });
                          alert2.present();
                          let interval2 = setInterval(function () {
                            console.log("he entrado y estoy esperando 2 segundos");
                            location.reload();
                            console.log("he reiniciado");
                            clearInterval(interval2);
                            console.log("he borrado el intervalo");
                          }, 2000);
                          console.log("Has cambiado de nombre");
                        },
                        (error) => {
                          console.error(error);
                        }
                      )

                    // this.navCtrl.push(TabsPage);

                  }

                },
                (error) => {
                  console.error(error);
                }
              )


          }
        }
      ]
    });
    alert.present();
  }
}
