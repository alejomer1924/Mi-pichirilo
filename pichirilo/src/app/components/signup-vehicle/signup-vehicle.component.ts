import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-vehicle',
  templateUrl: './signup-vehicle.component.html',
  styleUrls: ['./signup-vehicle.component.css']
})
export class SignupVehicleComponent implements OnInit {

  tipos: string[] = ['Automovil', 'Camioneta', 'Camion', 'Moto', 'Otro'];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  registrarRep(matricula: string, tipo: string, marca: string, modelo: string,
    color: string, kilometraje: string, descripcion: string,
    fechaIngr: string, fechaSal: string, motivo: string, detalles: string) {

    let registroRep = {
      vehiculo: {
        matricula,
        tipo: this.tipos.indexOf(tipo) + 1,
        marca,
        modelo,
        color,
        kilometraje,
        descripcion
      },
      reparacion: {
        fechaIngr,
        fechaSal,
        motivo,
        detalles
      }
    }
    console.log(registroRep);
    this._userService.signUpRepair(registroRep).subscribe((data:any)=>{
        console.log(data);
        this._router.navigate(['services/Empleado']);
    });
    console.log(this._userService.reparaciones);

    
  }

}
