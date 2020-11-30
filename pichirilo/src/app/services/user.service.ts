import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:3000/';
          log = 'login';
          signup = 'agregarPropietario';
          signuprepair = 'registrarRep';   
          listrepairs = 'reparaciones'; 
          eliminar = 'eliminarRep';

  constructor(private _httpClient: HttpClient) { }

  login(user, headers):Observable<any>{
    let result: Observable<Object>;
    result = this._httpClient.post(this.api+this.log, user, {headers:headers});

    return result;
  }

  signUp(propietario, headers):Observable<any>{
    let result:Observable<Object>
    result = this._httpClient.post(this.api+this.signup, propietario, {headers:headers});
    return result; 
  }

  signUpRepair(repair, headers):Observable<any>{
    let result:Observable<Object> 
    result = this._httpClient.post(this.api+this.signuprepair, repair, {headers:headers});
    return result; 
  }

  listRepairs(headers):Observable<any>{
    let result:Observable<Object> 
    result = this._httpClient.get(this.api+this.listrepairs, {headers:headers});
    return result; 
  }

  getRepair(idRep,headers):Observable<any>{
    let result:Observable<Object> 
    result = this._httpClient.get(this.api+this.listrepairs+`/${idRep}`, {headers:headers});
    return result; 
  }

  updateRepair(idRepair,repair,headers):Observable<any>{
    let result:Observable<Object> 
    result = this._httpClient.put(this.api+this.listrepairs+`/${idRepair}`, repair, {headers:headers});
    return result;
  }

  deleteRepair(idRepair, vehicle, headers):Observable<any>{
    let result:Observable<Object> 
    result = this._httpClient.delete(this.api+this.eliminar+`/${idRepair}`+`/${vehicle}`,{headers:headers});
    return result;
  }

  

}

