import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-watch-repair',
  templateUrl: './watch-repair.component.html',
  styleUrls: ['./watch-repair.component.css']
})
export class WatchRepairComponent implements OnInit, AfterViewInit {

  matricula:string;
  info: {
    Vehiculo_matricula:string
    celular:string
    correo:string
    detalle:string
    fecha_llegada:string
    motivo:string
    nombre:string
  }; 

  constructor(private _activatedRoute:ActivatedRoute, private _userService:UserService, private _router:Router) {
    this.info = {
      Vehiculo_matricula: "",
      celular: "",
      correo: "",
      detalle: "",
      fecha_llegada: "",
      motivo: "",
      nombre: ""
    }
    this._activatedRoute.params.subscribe((param)=>{
      this.matricula = param['matricula'];
    }); 
   }

  ngOnInit(): void {
    this._userService.getInfoProp(this.matricula).subscribe((data:any) => {
      this.info = data.items[0];
      console.log(this.info);
    });
  }

  ngAfterViewInit():void{
    console.log('ngafter');
    
  }

}
