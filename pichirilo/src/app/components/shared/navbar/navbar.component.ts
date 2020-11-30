import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router) { }

  rol:string 

  ngOnInit(): void {
    
  }

  toLogin(){
    this._router.navigate(['login']);
  }

  toSignUp(){
    this._router.navigate(['signUp']);
  }

}
