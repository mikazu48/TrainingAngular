import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,public empService:EmployeeService, public toastr : ToastrService) { }
  employeeList:Employee[];
  ngOnInit(): void {
    this.employeeList = this.empService.employeeList;
    this.empService.refreshList();
  }
  populateForm(EmployeeData:Employee){
    this.empService.bAddData=true;
    this.router.navigate(['edit/' + EmployeeData.EmployeeID],{relativeTo:this.route});
  }
  onDelete(EmployeeData:Employee){
    if(confirm('Are you sure for delete this data?')){
      this.empService.deleteEmployee(EmployeeData).subscribe(res=>{
        this.empService.refreshList();
        this.toastr.warning('Success delete data.','Delete');
      }, err =>{
        alert(err.message);
      });
    };
  }
  
  searchData(term: string) {
    if(!term) {
      this.empService.refreshList();
    } else {
      this.empService.employeeList = this.empService.employeeList.filter(x => 
         x.EmployeeID.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
         x.EmployeeName.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
         x.Email.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
         x.ContactPhone.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
         x.Address.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
         x.Position.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
         x.Division.trim().toLowerCase().includes(term.trim().toLowerCase())||
         x.SupervisorID.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }
}
