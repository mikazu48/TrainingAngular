import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http : HttpClient,private accService: AccountService) { }
  
  bAddData:boolean = false;
  formData : Employee;
  formDataGet : Employee;
  currentEmployeeData:Employee;
  employeeList:Employee[];
  rootURL = "http://localhost:64839/";
  positionList = ["Staff","Manager","Head Divison"];
  divisionList=["Programmer","Analyst","Leader"];
  genderList=["Male","Female"];
  headersToken = new HttpHeaders({
    'Authorization': 'Bearer ' +  localStorage.getItem('authToken'),
    'Content-Type': 'application/json; charset=utf-8'
  });

 customHeadersImage = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    'Accepted-Encoding': 'application/json'
  });

 customOptionsImage = {
    headers: this.customHeadersImage,
    reportProgress: true,
  };

  postEmployee(formData : Employee){
    if(formData.Gender =="Male"){
      formData.Gender="M";
    }
    else{
      formData.Gender="F";
    }
    return this.http.post(this.rootURL+'api/Employee/CreateEmployee',formData,{headers : this.headersToken});
  }


  postImageEmployee(fileToUpload:File) : Observable<any> {
    const formSend:FormData = new FormData();
    formSend.append('Image',fileToUpload);
    return this.http.post(this.rootURL+'api/Employee/UploadImage',formSend,this.customOptionsImage);
  }
  
  removeImageEmployee(filename:string){
    return this.http.post(this.rootURL+'api/Employee/RemoveImage?Filename=' + filename,"",{headers : this.headersToken});
  }
  updateEmployee(formData : Employee){
    if(formData.Gender =="Male"){
      formData.Gender="M";
    }
    else{
      formData.Gender="F";
    }
    return this.http.put(this.rootURL+'api/Employee/UpdateEmployee',formData,{headers : this.headersToken});
  }
  deleteEmployee(formData : Employee){
    return this.http.delete(this.rootURL+'api/Employee/DeleteEmployee?Id=' + formData.EmployeeID,{headers : this.headersToken});
  }
  
  refreshList(){
    return this.http.get(this.rootURL+'api/Employee/GetListEmployee',{headers : this.headersToken})
    .toPromise().then(res => this.employeeList = res as Employee[]);
  }
  
  getSingleEmployee(EmployeeId){
    return this.http.get(this.rootURL+'api/Employee/GetSingleEmployee?Id='+EmployeeId,{headers : this.headersToken})
    .toPromise().then(res => this.formData = res as Employee);
  }
  getSingleEmployeeCurrent(EmployeeId){
    return this.http.get(this.rootURL+'api/Employee/GetSingleEmployee?Id='+EmployeeId,{headers : this.headersToken})
    .toPromise().then(res => this.currentEmployeeData = res as Employee);
  }
}
