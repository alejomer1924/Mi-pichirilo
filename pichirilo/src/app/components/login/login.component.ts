import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeado = false;
  intento = false;
  rol:string;

  constructor(private _userService: UserService, private _activatedRoute:ActivatedRoute, private _route:Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data:any)=>{
      this.rol = data['rol'];
    });
  }

  autenticacion(correo: string, contrasena: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let usuario = {
      correo,
      contrasena,
      rol: this.rol 
    }
    this._userService.login(JSON.stringify(usuario), headers).subscribe((data) => {
      if (data.existe) {
        this.logeado = true
        this._route.navigate(["services/"+this.rol]);
        localStorage.setItem('token', data.token);
      }
    });

  }
}
