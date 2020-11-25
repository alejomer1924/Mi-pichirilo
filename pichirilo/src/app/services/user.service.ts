import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'https://mi-pichirilo.herokuapp.com/login'; 

  constructor(private _httpClient: HttpClient) { }

  login(user, headers):Observable<any>{
    let result: Observable<Object>;
    result = this._httpClient.post(this.api, user, {headers:headers});

    return result;
  }

  

}

