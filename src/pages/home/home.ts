import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { JugarOnlinePage } from '../jugar-online/jugar-online';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public intervaloTiempo;
  cargando: any;
  usuarioEnConcretoDeLaAplicacion: any;
  usuarioOponente: any;

  contadorDeBuscadorAtras: any;



  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.cargando = "none";
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  // Jugador en 0: Desconectado y no disponible para jugar
  // Jugador en 1: Conectado y disponible para jugar
  // Jugador en 2: Conectado y pero no disponible para jugar
  jugarOnline() {
    this.contadorDeBuscadorAtras = 15;
    this.cargando = "block";


    this.userService.getUsuarioDelMovilUsando(localStorage.getItem('nickUsuarioAplicacion'))
      .subscribe(
        (data) => { // Success
          this.usuarioEnConcretoDeLaAplicacion = data;
          console.log(this.usuarioEnConcretoDeLaAplicacion[0].id);

          this.userService.cambiarElEstadoDeConectadoDelUsuario(
            this.usuarioEnConcretoDeLaAplicacion[0].id,
            this.usuarioEnConcretoDeLaAplicacion[0].nickname,
            this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
            this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
            this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
            1,
            this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante
          );



          this.intervaloTiempo = setInterval(() => {

            if (this.contadorDeBuscadorAtras <= 15) {
              this.contadorDeBuscadorAtras -= 1;
              console.log(this.contadorDeBuscadorAtras);

              this.userService.buscarUsuarioDisponibleParaJugar(this.usuarioEnConcretoDeLaAplicacion[0].id)
              .subscribe(
                (data2) => { // Success
                  this.usuarioOponente = data2;
                  console.log("EL OPONENTE ES: " + this.usuarioOponente[0].nickname);
  
                  if (this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante == this.usuarioOponente[0].id ||
                    this.usuarioOponente[0].idUsuarioContrincante == this.usuarioEnConcretoDeLaAplicacion[0].id) {
  
                      this.cargando = "none";
                      this.contadorDeBuscadorAtras = 0;
                      clearInterval(this.intervaloTiempo);
    
                      console.log("He encontrado un Contrincante, te lanzo a la pantalla de juego");
                      console.log("Vas a jugar contra " + this.usuarioOponente[0].nickname);
    
                      this.userService.cambiarElEstadoDeConectadoDelUsuario(
                        this.usuarioEnConcretoDeLaAplicacion[0].id,
                        this.usuarioEnConcretoDeLaAplicacion[0].nickname,
                        this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                        this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                        this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                        2,
                        this.usuarioOponente[0].id
                      );
    
                      this.userService.cambiarElEstadoDeConectadoDelUsuario(
                        this.usuarioOponente[0].id,
                        this.usuarioOponente[0].nickname,
                        this.usuarioOponente[0].victoriasRondas,
                        this.usuarioOponente[0].derrotasRondas,
                        this.usuarioOponente[0].victoriaPorcentaje,
                        2,
                        this.usuarioEnConcretoDeLaAplicacion[0].id
                      );
    
                      this.navCtrl.push(JugarOnlinePage, {
                        IDusuarioEnConcretoDeLaAplicacion: this.usuarioEnConcretoDeLaAplicacion[0].id,
                        IDUsuarioContrincante: this.usuarioOponente[0].id
                      });
                  }
  
                  if (this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante == 0 && this.usuarioOponente[0].idUsuarioContrincante == 0) {
  
                    this.userService.cambiarElEstadoDeConectadoDelUsuario(
                      this.usuarioEnConcretoDeLaAplicacion[0].id,
                      this.usuarioEnConcretoDeLaAplicacion[0].nickname,
                      this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                      this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                      this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                      this.usuarioEnConcretoDeLaAplicacion[0].conectado,
                      this.usuarioOponente[0].id
                    );
  
                    this.userService.cambiarElEstadoDeConectadoDelUsuario(
                      this.usuarioOponente[0].id,
                      this.usuarioOponente[0].nickname,
                      this.usuarioOponente[0].victoriasRondas,
                      this.usuarioOponente[0].derrotasRondas,
                      this.usuarioOponente[0].victoriaPorcentaje,
                      this.usuarioOponente[0].conectado,
                      this.usuarioEnConcretoDeLaAplicacion[0].id
                    );
                  }
  
                  if (this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante == this.usuarioOponente[0].id
                    && this.usuarioOponente[0].idUsuarioContrincante == this.usuarioEnConcretoDeLaAplicacion[0].id) {
  
                    this.cargando = "none";
                    this.contadorDeBuscadorAtras = 0;
                    clearInterval(this.intervaloTiempo);
  
                    console.log("He encontrado un Contrincante, te lanzo a la pantalla de juego");
                    console.log("Vas a jugar contra " + this.usuarioOponente[0].nickname);
  
                    this.userService.cambiarElEstadoDeConectadoDelUsuario(
                      this.usuarioEnConcretoDeLaAplicacion[0].id,
                      this.usuarioEnConcretoDeLaAplicacion[0].nickname,
                      this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                      this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                      this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                      2,
                      this.usuarioOponente[0].id
                    );
  
                    this.userService.cambiarElEstadoDeConectadoDelUsuario(
                      this.usuarioOponente[0].id,
                      this.usuarioOponente[0].nickname,
                      this.usuarioOponente[0].victoriasRondas,
                      this.usuarioOponente[0].derrotasRondas,
                      this.usuarioOponente[0].victoriaPorcentaje,
                      2,
                      this.usuarioEnConcretoDeLaAplicacion[0].id
                    );
  
                    this.navCtrl.push(JugarOnlinePage, {
                      IDusuarioEnConcretoDeLaAplicacion: this.usuarioEnConcretoDeLaAplicacion[0].id,
                      IDUsuarioContrincante: this.usuarioOponente[0].id
                    });
  
                  }
  
                },
                (error) => {
                  console.error(error);
                  console.log("No se ha podido encontrar ningún usuario conectado");
                }
              )



            }

            if (this.contadorDeBuscadorAtras <= 0) {
              this.cargando = "none";
              alert("se ha terminado");
              this.userService.cambiarElEstadoDeConectadoDelUsuario(
                this.usuarioEnConcretoDeLaAplicacion[0].id,
                this.usuarioEnConcretoDeLaAplicacion[0].nickname,
                this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
                this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
                this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
                0,
                this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante
              );
              clearInterval(this.intervaloTiempo);
            }

          }, 1000);



        },
        (error) => {
          console.error(error);
        }
      )
  }
}


    // this.userService.buscarUsuarioDisponibleParaJugar(this.usuarioEnConcretoDeLaAplicacion[0].id)
    //   .subscribe(
    //     (data2) => { // Success
    //       this.usuarioOponente = data2;
    //       console.log(this.usuarioOponente);

    //       if (this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante == 0 ) {

    //         this.userService.ponerUsuarioAConectado(
    //           this.usuarioEnConcretoDeLaAplicacion[0].id,
    //           this.usuarioEnConcretoDeLaAplicacion[0].nickname,
    //           this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
    //           this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
    //           this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
    //           1,
    //           this.usuarioOponente[0].id
    //         );

    //         this.userService.ponerUsuarioAConectado(
    //           this.usuarioOponente[0].id,
    //           this.usuarioOponente[0].nickname,
    //           this.usuarioOponente[0].victoriasRondas,
    //           this.usuarioOponente[0].derrotasRondas,
    //           this.usuarioOponente[0].victoriaPorcentaje,
    //           1,
    //           this.usuarioEnConcretoDeLaAplicacion[0].id
    //         );

    //         if (this.usuarioOponente[0].idUsuarioContrincante == this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante ) {
    //           console.log("He encontrado un Contrincante, te lanzo a la pantalla de juego");
    //           console.log("Vas a jugar contra " + this.usuarioOponente[0].nickname);

    //           this.userService.ponerUsuarioAConectado(
    //             this.usuarioEnConcretoDeLaAplicacion[0].id,
    //             this.usuarioEnConcretoDeLaAplicacion[0].nickname,
    //             this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
    //             this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
    //             this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
    //             2,
    //             this.usuarioOponente[0].id
    //           );

    //           this.userService.ponerUsuarioAConectado(
    //             this.usuarioOponente[0].id,
    //             this.usuarioOponente[0].nickname,
    //             this.usuarioOponente[0].victoriasRondas,
    //             this.usuarioOponente[0].derrotasRondas,
    //             this.usuarioOponente[0].victoriaPorcentaje,
    //             2,
    //             this.usuarioEnConcretoDeLaAplicacion[0].id
    //           );

    //           this.navCtrl.push(JugarOnlinePage, {
    //             IDusuarioEnConcretoDeLaAplicacion: this.usuarioEnConcretoDeLaAplicacion[0].id,
    //             IDUsuarioContrincante: this.usuarioOponente[0].id
    //           });


    //         }

    //       }


    //     },
    //     (error) => {
    //       console.error(error);
    //       console.log("No se ha podido encontrar ningún usuario conectado");
    //     }
    //   )


    // this.userService.ponerUsuarioADesconectado(
    //   this.usuarioEnConcretoDeLaAplicacion[0].id,
    //   this.usuarioEnConcretoDeLaAplicacion[0].nickname,
    //   this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
    //   this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
    //   this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
    //   0,
    //   this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante
    // );

    // this.userService.ponerUsuarioAEnPartida(
    //   this.usuarioEnConcretoDeLaAplicacion[0].id,
    //   this.usuarioEnConcretoDeLaAplicacion[0].nickname,
    //   this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
    //   this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
    //   this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
    //   2,
    //   this.usuarioEnConcretoDeLaAplicacion[0].idUsuarioContrincante
    // );



