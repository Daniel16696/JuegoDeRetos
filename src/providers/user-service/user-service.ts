import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }
  getUsers() {
    try {
      return this.http.get('http://localhost:8080/Slim/obtenerUsuarios');
    } catch (error) {
      console.log(error);
    }

  }

  postDatos(nicknameUsuario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nicknameUsuario, victoriasRondas: '0', derrotasRondas: '0', victoriaPorcentaje: '0' }
      console.log(datos);
      console.log(JSON.stringify(datos));
      var url = 'http://localhost:8080/Slim/nuevoUsuario';
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
      return this.http.get('http://localhost:8080/Slim/obtenerTodosUsuariosRanking');
    } catch (error) {
      console.log(error);
    }
  }


  getUsuarioDelMovilUsando(nickname) {
    try {
      return this.http.get('http://localhost:8080/Slim/obtenerUsuariosEnConcretoPorNickName/' + nickname);
    } catch (error) {
      console.log(error);
    }

  }

  borrarUsuarioConfiguracion(id) {
    try {
      return this.http.delete('http://localhost:8080/Slim/borrarUsuarioConfiguracion/' + id);
    } catch (error) {
      console.log(error);
    }
  }

  enviarSugerenciaDeCategoria(comentario1, comentario2) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { comentario1: comentario1, comentario2: comentario2 }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://localhost:8080/Slim/enviarEmailSugerencias';
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
}
