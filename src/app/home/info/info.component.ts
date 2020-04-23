import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AccountService } from 'src/app/shared/account.service';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private accService:AccountService,private empService:EmployeeService) { }

  EmployeeName:string;
  EmployeeCurrentData:Employee;
  ngOnInit(): void {
    this.accService.doCurrentAccountLogin().then(res => {
      this.empService.getSingleEmployeeCurrent(this.accService.currentAccountData.EmployeeID).then(
        res => {
          if(res.EmployeeID != null)
          {
            this.EmployeeName =  this.empService.currentEmployeeData.EmployeeName;
          }
          else{
            this.EmployeeName = "";
          }
        });
    });
    
  }

}
