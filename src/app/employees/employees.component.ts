import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../shared/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit,OnChanges {

  constructor(private route:ActivatedRoute,private router:Router,public empService:EmployeeService) { }
  public EmployeeData:Employee;
  ngOnInit(): void {

    this.empService.bAddData=false;
  }
  ngOnChanges(){
    this.empService.bAddData=false;
  }
  onEdit(){
    // this.router.navigate(['id'],{relativeTo:this.route,queryParamsHandling:'preserve'});

  } 
}
