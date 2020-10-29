import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:3000/login'; 

  constructor(private _httpClient: HttpClient) { }

  login(user, headers):Observable<any>{
    let result: Observable<Object>;
    result = this._httpClient.post(this.api, user, {headers:headers});

    return result;
  }

  

}

