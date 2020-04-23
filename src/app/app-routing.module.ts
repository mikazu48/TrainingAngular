import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeesComponent } from './employees/employees.component';
import { ManageEmployeeComponent } from './employees/manage-employee/manage-employee.component';
import { AreasComponent } from './areas/areas.component';
import { ManageAreaComponent } from './areas/manage-area/manage-area.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { RegisterComponent } from './accounts/register/register.component';
import { InfoComponent } from './home/info/info.component';
import { ChangePasswordComponent } from './accounts/change-password/change-password.component';

const appRoutes: Routes = [
    {path: '' , 
    component: HomeComponent,
    canActivateChild:[AuthGuard],
    children:[
      {path: 'info' , component: InfoComponent},
      {
        path: 'employees' ,
        component: EmployeesComponent,
        children:[
        {path: 'new' , component: ManageEmployeeComponent} ,
        {path: 'edit/:id' , component: ManageEmployeeComponent} 
      ]} ,
      {
        path: 'areas' , 
        component: AreasComponent,
        children:[
        {path: 'new' , component: ManageAreaComponent} ,
        {path: 'edit/:id' , component: ManageAreaComponent} 
      ]} ,
      {path: 'change-password' , component: ChangePasswordComponent},
    ]},

    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent},
    // ,
    // {path: 'not-found' , component: PageNotFoundComponent},
    // {path: '**' , redirectTo:'/not-found'},
  ];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}