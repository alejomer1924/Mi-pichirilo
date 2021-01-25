import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-in',
  templateUrl: './nav-in.component.html',
  styleUrls: ['./nav-in.component.css']
})
export class NavInComponent implements OnInit {

  constructor(private _router: Router, public _userService: UserService) { }
  ngOnInit(): void {
  }
  toSignOut() {
    localStorage.removeItem('token');
    this._userService.verifyAuth();
    this._router.navigate(['/home']);
  }
}
