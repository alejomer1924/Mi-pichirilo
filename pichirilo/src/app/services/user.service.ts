import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  reparaciones: any[] = [];
  logeado:boolean;

  private api = 'http://localhost:3000/';
  log = 'login';
  signup = 'agregarPropietario';
  signuprepair = 'registrarRep';
  listrepairs = 'reparaciones';
  eliminar = 'eliminarRep';



  constructor(private _httpClient: HttpClient) {
    console.log('Servicios corriendo!!');
    this.verifyAuth();
   }

   verifyAuth(){
      let token = localStorage.getItem('token');
      if(token){
        console.log('Hay alguien logeado');
        this.logeado = true;
      }else{
        console.log('No hay nadie logeado');
        this.logeado = false;
      }
    }

  createHeader() {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return header;
  }

  createJwtHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return jwtHeader;
  }

  login(user): Observable<any> {
    let result: Observable<Object>;
    result = this._httpClient.post(this.api + this.log, user, { headers: this.createHeader() });

    return result;
  }

  signUp(propietario): Observable<any> {
    let result: Observable<Object>
    result = this._httpClient.post(this.api + this.signup, propietario, { headers: this.createHeader() });
    return result;
  }

  signUpRepair(repair): Observable<any> {
    let result: Observable<Object>
    result = this._httpClient.post(this.api + this.signuprepair, repair, { headers: this.createJwtHeader() });
    return result;
  }

  listRepairs() {
    this.updateListRepairs();
  }

  getRepair(idRep): Observable<any> {
    let result: Observable<Object>
    result = this._httpClient.get(this.api + this.listrepairs + `/${idRep}`, { headers: this.createJwtHeader() });
    return result;
  }

  updateRepair(idRepair, repair): Observable<any> {
    let result: Observable<Object>
    result = this._httpClient.put(this.api + this.listrepairs + `/${idRepair}`, repair, { headers: this.createJwtHeader() });
    return result;
  }

  deleteRepair(idRepair, vehicle): Observable<any> {
    let result: Observable<Object>
    result = this._httpClient.delete(this.api + this.eliminar + `/${idRepair}` + `/${vehicle}`, { headers: this.createJwtHeader() });
    return result;
  }

  updateListRepairs() {
    this._httpClient.get(this.api + this.listrepairs, { headers: this.createJwtHeader() }).subscribe((data: any) => {
      this.reparaciones = data.items;
      /* console.log(this.reparaciones); */
    })
  }



}

