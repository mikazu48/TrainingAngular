import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public accService:AccountService, 
    public toastr : ToastrService) {}

  EmployeeName:string;
  ConfirmPassword:string;
  ngOnInit(): void {
    this.accService.formDataGet = {
      Username:'',
      Password:'',
      EmployeeID:''
    };
    this.EmployeeName="";
    this.ConfirmPassword="";
  }
  onSubmit(form:NgForm){
    if(!this.validateEmployee()){
      return;
    };
    this.insertData(form);
    this.toastr.success('Success Save Data.','Success');
  }

  validateEmployee(){
    if(this.accService.formDataGet.Username == "" || 
      this.accService.formDataGet.Password == "" ||
      this.accService.formDataGet.EmployeeID == ""){
      this.toastr.warning('Please fill all field!','Validate');
      return false;
    }
    if(this.accService.formDataGet.Password != this.ConfirmPassword){
      this.toastr.warning('Your password is not match!','Validate');
      return false;
    }
    if(this.EmployeeName == ""){
      this.toastr.warning('Cannot find employee name, please input correctly!','Validate');
      return false;
    }
    return true;
  }

  
  insertData(form: NgForm){
    this.accService.postAccount(this.accService.formDataGet).subscribe(
      res =>{
      this.router.navigate(['/login'],{relativeTo:this.route});
    }, err =>{
      this.toastr.error('Failure Send/Get API. Error : ' + err.message,'Error');
    });
  }
  
  onChangedData(employeeId){
    // alert(employeeId);
    this.accService.getSingleEmployeeAccount(employeeId).then(
      res => {
        if(res.EmployeeID != null)
        {
          this.EmployeeName =  this.accService.formDataAcc.EmployeeName;
        }
        else{
          this.EmployeeName = "";
        }
      });
  }

}
