import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }
  getUsers() {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerUsuarios');
    } catch (error) {
      console.log(error);
    }

  }

  postDatos(nicknameUsuario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nicknameUsuario, imagenAsociada: 'imagen0', victoriasRondas: '0', derrotasRondas: '0', victoriaPorcentaje: '0', sala:'0', ocupado:'0', IdAsignacionDePregunta:'0',contadorTemporalDeAciertos:'0', respuestasDelUsuarioTemporal: '', IconosDeRespuestasDelUsuarioTemporal: '' }
      console.log(datos);
      console.log(JSON.stringify(datos));
      var url = 'http://192.168.18.16:8080/Slim/nuevoUsuario';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }

  }

  getUsuariosRanking() {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerTodosUsuariosRanking');
    } catch (error) {
      console.log(error);
    }
  }

  getUsuarioDelMovilUsandoPorId(id) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerUsuariosEnConcreto/' + id);
    } catch (error) {
      console.log(error);
    }

  }

  getUsuarioDelMovilUsando(nickname) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerUsuariosEnConcretoPorNickName/' + nickname);
    } catch (error) {
      console.log(error);
    }

  }

  borrarUsuarioConfiguracion(id) {
    try {
      return this.http.delete('http://192.168.18.16:8080/Slim/borrarUsuarioConfiguracion/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  enviarSugerenciaDeCategoria(comentario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { comentario: comentario }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://192.168.18.16:8080/Slim/enviarEmailSugerencias';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }

  }
  enviarEmailDeContactarnos(nombre, email, comentario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nombre: nombre, email: email, comentario: comentario }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://192.168.18.16:8080/Slim/enviarEmailContactanos';
      return new Promise(resolve => {
        this.http.post(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  cambiarNicknameDelUsuario(id, nickname, imagenAsociada, victoriasRondas, derrotasRondas, victoriaPorcentaje, sala, ocupado, IdAsignacionDePregunta, contadorTemporalDeAciertos, respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nickname, imagenAsociada: imagenAsociada, victoriasRondas: victoriasRondas, derrotasRondas: derrotasRondas, victoriaPorcentaje: victoriaPorcentaje, sala: sala, ocupado: ocupado, IdAsignacionDePregunta: IdAsignacionDePregunta, contadorTemporalDeAciertos: contadorTemporalDeAciertos, respuestasDelUsuarioTemporal: respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal: IconosDeRespuestasDelUsuarioTemporal }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://192.168.18.16:8080/Slim/cambiarNicknameDelUsuario/' + id;
      return new Promise(resolve => {
        this.http.put(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  getPreguntaAsignada(idSala) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerLaPreguntaAsignada/' + idSala);
    } catch (error) {
      console.log(error);
    }
  }

  obtenerLaPreguntaDefinitiva(idPregunta) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerLaPreguntaDefinitiva/' + idPregunta);
    } catch (error) {
      console.log(error);
    }
  }

  cambiarElEstadoDeConectadoDelUsuario(id, nickname, imagenAsociada, victoriasRondas, derrotasRondas, victoriaPorcentaje, sala, ocupado, IdAsignacionDePregunta, contadorTemporalDeAciertos, respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nickname, imagenAsociada: imagenAsociada, victoriasRondas: victoriasRondas, derrotasRondas: derrotasRondas, victoriaPorcentaje: victoriaPorcentaje, sala: sala, ocupado: ocupado, IdAsignacionDePregunta:IdAsignacionDePregunta, contadorTemporalDeAciertos: contadorTemporalDeAciertos, respuestasDelUsuarioTemporal: respuestasDelUsuarioTemporal, IconosDeRespuestasDelUsuarioTemporal: IconosDeRespuestasDelUsuarioTemporal }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://192.168.18.16:8080/Slim/cambiarElEstadoDeConectado/' + id;
      return new Promise(resolve => {
        this.http.put(url, JSON.stringify(datos), httpOptions)
          .subscribe(data => {
            resolve(data);
            console.log(data);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  buscarUsuarioDisponibleParaJugar(id) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/buscarUsuarioParaJugar/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  buscandoTeniendoContrincanteYa(id) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/buscarTeniendoContrincanteYa/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  buscarSalaNoOcupada(id) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/buscarSalaNoOcupada/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  esperarAsalaCompleta(idSala) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/esperarAsalaCompleta/'+ idSala);
    } catch (error) {
      console.log(error);
    }
  }

  relevarRespuestasDeLaPreguntaJugada(idPregunta) {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/relevarRespuestasDeLaPreguntaJugada/'+ idPregunta);
    } catch (error) {
      console.log(error);
    }
  }

  obtenerImagenes() {
    try {
      return this.http.get('http://192.168.18.16:8080/Slim/obtenerImagenes');
    } catch (error) {
      console.log(error);
    }
  }


  
}
