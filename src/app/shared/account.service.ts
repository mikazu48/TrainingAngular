import { Injectable } from '@angular/core';;
import { Account } from './account.model';
import {  HttpHeaders, HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Employee } from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  bAddData:boolean = false;
  formData : Account;
  formDataAcc : Employee;
  formDataGet : Account;
  currentAccountData:Account;
  currentUserId:string;
  accountList:Account[];
  myTokenAPI:string;
  statusCodeLogin:number;
  rootURL = "http://localhost:64839/";
  positionList = ["Staff","Manager","Head Divison"];
  divisionList=["Programmer","Analyst","Leader"];
  genderList=["Male","Female"];
  tokenVal:TokenData={
    Username:'',
    Password:'',
    grant_type:'password'
  };

  headersToken = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8'
});
  headersTokenBearer = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private http : HttpClient) { } 
  postAccount(formData : Account){
    return this.http.post(this.rootURL+'api/Pqs_Account/CreateAccount',formData,{headers : this.headersToken});
  }

  updateAccount(formData : Account){
    return this.http.post(this.rootURL+'api/Pqs_Account/UpdateAccount',formData,{headers : this.headersToken});
  }

  checkAccountLogin(username:string,password:string){
    var data = "username="+username+"&password="+password+"&grant_type=password";
    return this.http.post(this.rootURL+'/Token',data,{headers:this.headersTokenBearer});
  }

  doCurrentAccountLogin()
  {
    return this.http.get(this.rootURL+'api/Pqs_Account/GetSingleAccount?Id='+this.currentUserId)
    .toPromise().then(res => this.currentAccountData = res as Account);
  }
  
  getSingleEmployeeAccount(EmployeeId){
    return this.http.get(this.rootURL+'api/Employee/GetSingleEmployee?Id='+EmployeeId,{headers : this.headersToken})
    .toPromise().then(res => this.formDataAcc = res as Employee);
  }
 
}

export class TokenData{
  Username:string;
  Password:string;
  grant_type:string;
}