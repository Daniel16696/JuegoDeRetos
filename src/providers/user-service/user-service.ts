import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  enviarSugerenciaDeCategoria(comentario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { comentario: comentario }
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
  enviarEmailDeContactarnos(nombre, email, comentario) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nombre: nombre, email: email, comentario: comentario }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://localhost:8080/Slim/enviarEmailContactanos';
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

  cambiarNicknameDelUsuario(id, nickname, victoriasRondas, derrotasRondas, victoriaPorcentaje) {
    try {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      let datos = { nickname: nickname, victoriasRondas: victoriasRondas, derrotasRondas: derrotasRondas, victoriaPorcentaje: victoriaPorcentaje }
      console.log(datos);

      console.log(JSON.stringify(datos));
      var url = 'http://localhost:8080/Slim/cambiarNicknameDelUsuario/' + id;
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

}
