import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-list-repairs',
  templateUrl: './list-repairs.component.html',
  styleUrls: ['./list-repairs.component.css']
})
export class ListRepairsComponent implements OnInit {

  @Input() rol:string; 

  constructor(public _userService:UserService, private _router:Router) { }

  ngOnInit(): void {
    this._userService.listRepairs(this.rol);
    console.log('on init');
  }

  toSignUpVehichle(){
    this._router.navigate(['services/Empleado/signUpVehicle']);
  }

  toUpdateVehicle(idRep:string){
    this._router.navigate(['services/Empleado/UpdateVehicle/'+idRep]);
  }

  deleteVehicle(idRep:string, matr:string){
    this._userService.deleteRepair(idRep, matr).subscribe((data)=>{
      console.log(data);
      this._userService.updateListRepairs(this.rol);
    });
  }

  toWatchVehicle(matricula:string){
    this._router.navigate([`services/Propietario/WatchVehicle/${matricula}`]);
  }

}
