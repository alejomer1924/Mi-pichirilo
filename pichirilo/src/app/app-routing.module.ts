import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ServicesComponent } from './components/services/services.component';
import { SignupVehicleComponent } from './components/signup-vehicle/signup-vehicle.component';
import { UpdateVehicleComponent } from './components/update-vehicle/update-vehicle.component';

const routes: Routes = [ 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home/:rol',
    component: HomeComponent
  },
  {
    path: 'login/:rol',
    component: LoginComponent
  },
  {
    path: 'services/:rol',
    component: ServicesComponent
  },
  {
    path: 'services/:rol/signUpVehicle',
    component: SignupVehicleComponent
  },
  {
    path: 'services/:rol/UpdateVehicle/:idRep',
    component: UpdateVehicleComponent
  },
  {
    path: '**', 
    pathMatch: 'full', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
