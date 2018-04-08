import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { RondasPage } from '../rondas/rondas';

@IonicPage()
@Component({
  selector: 'page-jugar-online',
  templateUrl: 'jugar-online.html',
})
export class JugarOnlinePage {

  // public loadProgress: number = 60;
  formularioEnviarRespuestas: FormGroup;
  // public intervalo;
  public preguntas: any;
  public pregunta1: any;
  public arrayRespuestasUsuario = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider) {
    this.formularioEnviarRespuestas = this.crearFormularioEnviarRespuesta();

    this.userService.getTresPreguntas()
      .subscribe(
        (data) => { // Success
          this.preguntas = data;
          console.log(this.preguntas);
          this.pregunta1 = this.preguntas[0].pregunta;
          // console.log(this.preguntas[0].pregunta);

        },
        (error) => {
          console.error(error);
        }
      )

  }

  guardarFormularioEnviarRespuestas() {
    // console.log(this.formularioEnviarRespuestas.value.respuesta);

    this.arrayRespuestasUsuario.push(this.formularioEnviarRespuestas.value.respuesta);
    console.log(this.arrayRespuestasUsuario);
    // this.arrayRespuestasUsuario.forEach(function (value) {
    //   console.log(value);
    // });

    // for (let i = 0; i < arrayRespuestasUsuario.length; i++) {
    //   console.log(arrayRespuestasUsuario[i]);
    // }

    this.formularioEnviarRespuestas = this.crearFormularioEnviarRespuesta();
  }

  private crearFormularioEnviarRespuesta() {
    return this.formBuilder.group({
      respuesta: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JugarOnlinePage');
  }

  // ngOnInit() {
  //   // Para mostrar la barra de progreso(va descendiendo)
  //   this.intervalo = setInterval(() => {
  //     if (this.loadProgress <= 60) {
  //       this.loadProgress -= 1;
  //       console.log(this.loadProgress);
  //     }
  //     if (this.loadProgress <= 0) {
  //       alert("se ha terminado");
  //       clearInterval(this.intervalo);
  //     }
  //   }, 1000);

  // }

  // ngOnDestroy() {
  //   if (this.intervalo) {
  //     clearInterval(this.intervalo);
  //   }
  // }
  IrARondas() {
    this.navCtrl.push(RondasPage);
  }
}

