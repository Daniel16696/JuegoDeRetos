import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-jugar-online',
  templateUrl: 'jugar-online.html',
})
export class JugarOnlinePage {

  // public loadProgress: number = 60;
  formularioEnviarRespuestas: FormGroup;
  // public intervalo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.formularioEnviarRespuestas = this.crearFormularioEnviarRespuesta();
    // let ARRAYGLOBALPREGUNTAS = 
    // [
    //   "PreguntasPerros","PreguntasGatos"
    // ];

    // let arrayAbecedario = 
    // [
    //   "a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"
    // ];

    // let PreguntasPerros =
    // [
    //   "¿Razas de perros que empiezen por {{variableLetraAbecedario}}?"
    // ];

    // let PreguntasGatos =
    // [
    //   "¿Razas de gatos que empiezen por {{variableLetraAbecedario}}?"
    // ];
  }

  guardarFormularioEnviarRespuestas() {
    console.log(this.formularioEnviarRespuestas.value.respuesta);
    // document.getElementById("inputDeEnviarRespuestas").innerHTML = "";
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

}
