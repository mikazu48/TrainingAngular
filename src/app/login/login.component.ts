import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../shared/account.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Password:string;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    public toastr : ToastrService,
    private authGuard:AuthGuard,
    public accService:AccountService) { }

  ngOnInit(): void {
  }
  logIn(){
    this.accService.myTokenAPI = "";
    if(this.accService.currentUserId =="" || this.Password ==""){
      this.toastr.warning('All field required!','Validate');
      return;
    }
    this.checkUser();
  }


  checkUser(){
    this.accService.checkAccountLogin(this.accService.currentUserId,this.Password).subscribe(
      res =>{
        localStorage.setItem('authToken', res['access_token'] as string);
        
        const messageLogin1= 'Your token : ' 
        + localStorage.getItem('authToken');
        
        const messageLogin2= 'Issued : ' + res['.issued'] as string
        + ' - Expired : ' + res['.expires'] as string;

        this.toastr.success(messageLogin1,'Success');
        this.toastr.success(messageLogin2,'Success');
        this.authService.login();
        this.router.navigate(['/info']);
    }, err =>{
      if(err.status == 404){
        this.toastr.error(err.error as string,'Error');
      }
      else{
        this.toastr.error('Account not match. Please check password or create new account. ','Error');
      }
    });
  }
}
