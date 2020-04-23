import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import {  NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { ManageEmployeeComponent } from './employees/manage-employee/manage-employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './shared/employee.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreasComponent } from './areas/areas.component';
import { ManageAreaComponent } from './areas/manage-area/manage-area.component';
import { AreaListComponent } from './areas/area-list/area-list.component';
import { AccountsComponent } from './accounts/accounts.component';
import { RegisterComponent } from './accounts/register/register.component';
import { ChangePasswordComponent } from './accounts/change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { AreaService } from './shared/area.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { InfoComponent } from './home/info/info.component';
import { AccountService } from './shared/account.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    EmployeesComponent,
    ManageEmployeeComponent,
    EmployeeListComponent,
    AreasComponent,
    ManageAreaComponent,
    AreaListComponent,
    AccountsComponent,
    RegisterComponent,
    ChangePasswordComponent,
    LoginComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [EmployeeService,AreaService,AuthGuard,AuthService,AccountService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
