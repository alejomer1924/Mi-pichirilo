import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, public _userService: UserService) { }

  rol: string
  logeado: boolean

  ngOnInit(): void {
    this.logeado = this._userService.logeado;
    console.log(this.logeado);
  }

  toLogin() {
    this._router.navigate(['login']);
  }

  toSignUp() {
    this._router.navigate(['signUp']);
  }
}
