import { Component,Input } from '@angular/core';
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
  //Variables de la barra de progreso del tiempo 
  public loadProgressTime: number = 60;
  public loadProgress: number = 100;
  @Input('progress') progress;
  public intervalo2;

  // Variables del juego
  formularioEnviarRespuestas: FormGroup;
  public preguntas: any;
  public pregunta1: any;
  public respuesta1: any;
  public arrayRespuestasUsuario = [];
  public arrayRespuestasCortadas = [];
  // public palabraSinTilde: any;
  public palabraDEFINITIVASinTilde: any;
  public palabraDeUsuarioSinTilde: any;
  public contadorPalabrasAcertadas: any;
  

  usuarioEnConcretoDeLaAplicacion: any;
  usuarioOponente: any;
  // public IDusuarioEnConcretoDeLaAplicacion: any;
  // public IDUsuarioContrincante: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider) {
     let IDusuarioEnConcretoDeLaAplicacion = navParams.get('IDusuarioEnConcretoDeLaAplicacion');
     let IDUsuarioContrincante = navParams.get('IDUsuarioContrincante');

    console.log(IDusuarioEnConcretoDeLaAplicacion);
    console.log(IDUsuarioContrincante);

    this.formularioEnviarRespuestas = this.crearFormularioEnviarRespuesta();
    this.contadorPalabrasAcertadas = 0;

    this.userService.getTresPreguntas()
      .subscribe(
        (data) => { // Success
          this.preguntas = data;
          console.log(this.preguntas);
          this.pregunta1 = this.preguntas[0].pregunta;
          this.respuesta1 = this.preguntas[0].respuesta;
          console.log(this.respuesta1);
          // console.log(this.preguntas[0].pregunta);

        },
        (error) => {
          console.error(error);
        }
      )

      this.navCtrl.pop();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JugarOnlinePage');
    // if (this.navCtrl.canGoBack()) {
    //   alert("hola he dado a atras a la partida");

    //   this.userService.getUsuarioDelMovilUsandoPorId(IDusuarioEnConcretoDeLaAplicacion)
    //   .subscribe(
    //     (data2) => { // Success
    //       this.usuarioEnConcretoDeLaAplicacion = data2;
    //       console.log(this.usuarioEnConcretoDeLaAplicacion);

    //       this.userService.ponerUsuarioADesconectado(
    //         this.usuarioEnConcretoDeLaAplicacion[0].id,
    //         this.usuarioEnConcretoDeLaAplicacion[0].nickname,
    //         this.usuarioEnConcretoDeLaAplicacion[0].victoriasRondas,
    //         this.usuarioEnConcretoDeLaAplicacion[0].derrotasRondas,
    //         this.usuarioEnConcretoDeLaAplicacion[0].victoriaPorcentaje,
    //         0,
    //         0
    //       );

    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   )
    // }else{
    //   alert("sigo en partida");
    // }
  }

  private crearFormularioEnviarRespuesta() {
    return this.formBuilder.group({
      respuesta: ['', Validators.required],
      icono: ['']
    });
  }

  guardarFormularioEnviarRespuestas() {
    console.log(this.formularioEnviarRespuestas.value);
    console.log(this.formularioEnviarRespuestas.value.respuesta);
    console.log(this.formularioEnviarRespuestas.value.icono);

    //rescato las respuestas y las formateo quitandole todas las comas
    this.arrayRespuestasCortadas = this.respuesta1.split(",");
    //console.log(this.arrayRespuestasCortadas);


    //valor del usuario introducido poniendolo todo en minusculas y sin acentos
    this.palabraDeUsuarioSinTilde = this.quitaAcentos(this.formularioEnviarRespuestas.value.respuesta.toLowerCase());
    //console.log(this.palabraDeUsuarioSinTilde);

    //recorro el array que me devuelve anteriormente y ahora recorriendolo las convierto en minusculas todas las mayusculas que se encuentra
    for (let i = 0; i < this.arrayRespuestasCortadas.length; i++) {
      //valor sin quitarle la mayuscula
      //console.log(this.arrayRespuestasCortadas[i]);
      //valor ya poniendolo todo en minusculas
      this.arrayRespuestasCortadas[i].toLowerCase();
      // console.log(this.arrayRespuestasCortadas[i].toLowerCase());
      //valor ya poniendolo todo en minusculas y sin acentos
      this.palabraDEFINITIVASinTilde = this.quitaAcentos(this.arrayRespuestasCortadas[i].toLowerCase());
      console.log(this.palabraDEFINITIVASinTilde);


      if (this.palabraDEFINITIVASinTilde == this.palabraDeUsuarioSinTilde) {
        this.formularioEnviarRespuestas.value.icono = "checkmark";
        this.contadorPalabrasAcertadas += 1; 
        console.log("Llevas acertadas "+this.contadorPalabrasAcertadas+" palabra/s");
        console.log("Has acertado la palabra");
        break;
      } else {
        this.formularioEnviarRespuestas.value.icono = "close";
        console.log("Has fallado la palabra");
      }

    }

    this.arrayRespuestasUsuario.push(this.formularioEnviarRespuestas.value);

    console.log(this.arrayRespuestasUsuario);
    
    this.formularioEnviarRespuestas = this.crearFormularioEnviarRespuesta();
    // this.arrayRespuestasUsuario.forEach(function (value) {
    //   console.log(value);
    // });

    // for (let i = 0; i < arrayRespuestasUsuario.length; i++) {
    //   console.log(arrayRespuestasUsuario[i]);
    // }
  }

  quitaAcentos(palabra) {
    for (var i = 0; i < palabra.length; i++) {
      //Sustituye "á é í ó ú ñ ä ë ï ö ü" 
      if (palabra.charAt(i) == "á") palabra = palabra.replace(/á/, "a");
      if (palabra.charAt(i) == "é") palabra = palabra.replace(/é/, "e");
      if (palabra.charAt(i) == "í") palabra = palabra.replace(/í/, "i");
      if (palabra.charAt(i) == "ó") palabra = palabra.replace(/ó/, "o");
      if (palabra.charAt(i) == "ú") palabra = palabra.replace(/ú/, "u");
      if (palabra.charAt(i) == "ñ") palabra = palabra.replace(/ñ/, "n");
      if (palabra.charAt(i) == "ä") palabra = palabra.replace('ä', 'a');
      if (palabra.charAt(i) == "ë") palabra = palabra.replace('ë', 'e');
      if (palabra.charAt(i) == "ï") palabra = palabra.replace('ï', 'i');
      if (palabra.charAt(i) == "ö") palabra = palabra.replace('ö', 'o');
      if (palabra.charAt(i) == "ü") palabra = palabra.replace('ü', 'u');
    }
    return palabra;
  }


  ngOnInit() {
    // Para mostrar el tiempo que va retrocediendo
    this.intervalo2 = setInterval(() => {
      if (this.loadProgressTime <= 60) {
        this.loadProgressTime -= 1;
        // this.loadProgress -= 1.667;
        // console.log(this.loadProgressTime);
        // console.log(this.loadProgress);
      }
      if (this.loadProgress <= 100) {
        this.loadProgress -= 1.667;
        // console.log(this.loadProgress);
      }

      if (this.loadProgress == 3.313999999999922) {
        this.loadProgress = 1.667;
        // console.log("lo he puesto a 0"+this.loadProgress);
      }

      if (this.loadProgressTime <= 0) {
        alert("se ha terminado");
        clearInterval(this.intervalo2);
        this.navCtrl.push(RondasPage);
        // clearInterval(this.loadProgress);
      }
    }, 1000);

  }

  ngOnDestroy() {
    if (this.intervalo2) {
      clearInterval(this.intervalo2);
    }
  }

}

