import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/shared/account.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  NewPassword:string;
  ConfirmNewPassword:string;
  constructor(public accService:AccountService,private toastr : ToastrService,private empService:EmployeeService) { }
  public changePasswordGroup: FormGroup; 
  ngOnInit(): void {
    this.blankLoad();

  }
  changePassword(){
    if (this.changePasswordGroup.invalid) {
      this.toastr.warning('All required.','Validation');
      return;
    }
    if(this.changePasswordGroup.get('NewPassword').value != this.changePasswordGroup.get('ConfirmNewPassword').value){
      this.toastr.warning('Your new password & confirm new password is not match. Please check again.','Validation');
      return;
    } 
    this.updateData();
  }

  blankLoad(){
    this.changePasswordGroup = new FormGroup({
      'NewPassword':new FormControl('',Validators.required),
      'ConfirmNewPassword':new FormControl('',Validators.required)
    });

  }
  updateData(){
    let formUpdate:Account = {
      EmployeeID : this.empService.currentEmployeeData.EmployeeID,
      Username : this.accService.currentUserId,
      Password : this.changePasswordGroup.get('NewPassword').value
    };

    this.accService.updateAccount(formUpdate).subscribe(
      res =>{
        this.toastr.warning('Success change the password!','Validation');
    }, err =>{
      this.toastr.error('Failure Send/Get API. Error : ' + err.message,'Error');
    });
  }
}
