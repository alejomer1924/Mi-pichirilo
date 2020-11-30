import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit, AfterViewInit {

  @ViewChild('detalles') detalle;
  @ViewChild('fechaSal') fechaSal; 

  estados:any[] = ['activo', 'inactivo', 'en cola', 'reparacion', 'reparado']; 
  idRep = "";
  reparacion:any; 
  detallessss:string; 

  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${this.token}`
  });
  

  constructor(private _activatedRoute:ActivatedRoute, private _userService:UserService, private _router:Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data)=>{
      this.idRep = data['idRep'];
    });
  }

  ngAfterViewInit():void{
    this._userService.getRepair(this.idRep, this.headers).subscribe((data:any)=> {
      this.reparacion = data.items[0]; 
      console.log(this.reparacion);
      this.detalle.nativeElement.value = data.items[0].detalle; 
    });
  }

  updateRepair(estado:string, fecha_salida:string, detalle:string){
    if(fecha_salida == ""){
      fecha_salida = this.reparacion.fecha_salida.split('T')[0]; 
    }
    let reparacion = {
      estado: this.estados.indexOf(estado) + 1,
      fecha_salida, 
      detalle
    }

    this._userService.updateRepair(this.idRep, reparacion,this.headers).subscribe((data) => {
      console.log(data);
      this._router.navigate(['services/Empleado']);
    })
  }
  
}
