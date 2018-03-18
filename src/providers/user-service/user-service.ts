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
    return this.http.get('http://localhost:8080/Slim/obtenerUsuarios');
  }

  postDatos(nicknameUsuario) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let datos = { nickname: nicknameUsuario, victoriasRondas: '0', derrotasRondas: '0', victoriaPorcentaje: '0' }
    console.log(datos);
    // let options = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };
    console.log(JSON.stringify(datos));
    var url = 'http://localhost:8080/Slim/nuevoUsuario';
    return new Promise(resolve => {
      this.http.post(url, JSON.stringify(datos), httpOptions)
        .subscribe(data => {
          resolve(data);
          console.log(data);
        });
    });
  }

  getUsuariosRanking() {
    return this.http.get('http://localhost:8080/Slim/obtenerTodosUsuariosRanking');
  }


  getUsuarioDelMovilUsando(nickname) {
    return this.http.get('http://localhost:8080/Slim/obtenerUsuariosEnConcretoPorNickName/'+nickname);
  }

  borrarUsuarioConfiguracion(id) {
    return this.http.delete('http://localhost:8080/Slim/borrarUsuarioConfiguracion/'+id);
  }
}
