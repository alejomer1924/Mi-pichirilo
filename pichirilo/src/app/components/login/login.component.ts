import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeado = false;
  intento = false;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  autenticacion(correo: string, contrasena: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let usuario = {
      correo,
      contrasena
    }
    this._userService.login(JSON.stringify(usuario), headers).subscribe((data) => {
      if (data.existe) {
        this.logeado = true
      }
    });

  }
}
