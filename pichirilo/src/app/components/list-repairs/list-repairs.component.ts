import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-list-repairs',
  templateUrl: './list-repairs.component.html',
  styleUrls: ['./list-repairs.component.css']
})
export class ListRepairsComponent implements OnInit {

  reparaciones:any[] = []; 
  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit(): void {
    this._userService.listRepairs(this.headers).subscribe((data:any)=>{
      this.reparaciones = data.items
      console.log(this.reparaciones);
    });
  }

  toSignUpVehichle(){
    this._router.navigate(['services/Empleado/signUpVehicle']);
  }

  toUpdateVehicle(idRep:string){
    this._router.navigate(['services/Empleado/UpdateVehicle/'+idRep]);
  }

  deleteVehicle(idRep:string, matr:string){
    this._userService.deleteRepair(idRep,matr, this.headers).subscribe((data)=>{
      console.log(data);
    });
  }

}
