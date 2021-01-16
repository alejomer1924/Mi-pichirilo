import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpHeaders } from '@angular/common/http/'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  registrarPropietario(id_propietario: string, nombre: string, celular: string, correo: string, contrasena: string, RContrasena: string) {
    console.log('entro al metodo')
    let filtro = false;
    let mensaje = "";
    if (id_propietario == '' || nombre == '' || celular == '' || correo == '' || contrasena == '' || RContrasena == '') {
      alert('Existen campo(s) faltantes');
    } else if (contrasena != RContrasena) {
      alert('Contraseñas no coindicen');
    } else {
      filtro = true;
    }
    if (filtro) {
      let propietario = {
        id_propietario,
        nombre,
        celular,
        correo,
        contrasena,
        RContrasena
      }
      console.log(propietario);
      this._userService.signUp(JSON.stringify(propietario)).subscribe((data) => {
        if(data.mensaje == 'Agregado exitosamente'){
          alert('Agregado exitosamente'); 
        }else{
          alert('Problemas a la hora del registro, revise sus campos o inténtelo más tarde');
        }
      });
    }
  }
}
