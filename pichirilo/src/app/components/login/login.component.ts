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
  flag:boolean;
  intento = false;
  rol:string;

  constructor(private _userService: UserService, private _activatedRoute:ActivatedRoute, private _route:Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data:any)=>{
      this.rol = data['rol'];
    });
  }

  autenticacion(correo: string, contrasena: string) {
    let usuario = {
      correo,
      contrasena,
      rol: this.rol 
    }
    this._userService.login(JSON.stringify(usuario)).subscribe((data) => {
      if (data.existe) {
        this.flag = true;
        localStorage.setItem('token', data.token);
        this._userService.verifyAuth();
        this._route.navigate(["services/"+this.rol]);
      }else{
        this.flag = false;
      }
    });
  }
}
