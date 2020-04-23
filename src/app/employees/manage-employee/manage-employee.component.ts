import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from 'src/app/shared/employee.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit,OnDestroy {

  @Input() bAdd = false;
  bMode:boolean;
  currentPath;
  paramsSubscription:Subscription;
  defaultImageUrl:string="/assets/icon-upload.png";
  fileToUpload:File=null;
  bNumber:boolean;
  public Picture:string;

  bUpdateImage:boolean = false;
  oldImageUrl:string;
  constructor(private route:ActivatedRoute,private router:Router,public empService:EmployeeService, public toastr : ToastrService) {}

  ngOnInit(): void { 
    this.bNumber = true;
    this.empService.bAddData=true;
  // Parent:  about 
  // Current Path:  company 
  this.route.url.subscribe(url => this.currentPath=url[0].path);
  if(this.currentPath == "new"){
    this.empService.formDataGet = {
      EmployeeID:'',
      EmployeeName:'',
      Gender:'',
      BirthDate :null,
      Email:'',
      ContactPhone:'',
      Address:'',
      Position:'',
      Division:'',
      SupervisorID:'',
      Picture:'',
    };
    this.bMode=false;
  }
  else{
    const employeeId = this.route.snapshot.params['id'];
    this.empService.getSingleEmployee(employeeId).then(
      res=>{
        if(res.EmployeeID == null){
          this.toastr.error('ID with ' + employeeId + ' not found on API Database.','Error');
        }
        else{
          this.empService.formDataGet = this.empService.formData;
          this.empService.formDataGet.Gender = this.convertGender(this.empService.formData.Gender);
          const urlImageUpdate=this.empService.rootURL + '/Image/' +  this.empService.formDataGet.Picture;
          this.defaultImageUrl =urlImageUpdate;
          this.oldImageUrl=this.empService.formDataGet.Picture;
        }
      }
    );
    this.bMode=true;
  }
  }
  onSelectedChangeDivison(value: string) {
    // do something else with the value
    console.log(value);

    this.empService.formDataGet.Division = value;
  }
  onSelectedChangePosition(value: string) {
    // do something else with the value
    console.log(value);

    this.empService.formDataGet.Position = value;
  }
  resetFormWithoutId(){
    this.empService.formDataGet.EmployeeName ='';
    this.empService.formDataGet.Gender ='';
    this.empService.formDataGet.Email ='';
    this.empService.formDataGet.ContactPhone ='';
    this.empService.formDataGet.Address ='';
    this.bMode=false;
  }
  isNumber(value: string)
  {
    if(!isNaN(Number(value.toString()))){
      this.bNumber = true;
    }
    else{
      this.bNumber = false;
    }
  }
  ngOnDestroy(){
    this.empService.bAddData=false;
  }
  onChangedData(employeeId){
    this.empService.getSingleEmployee(employeeId).then(
      res => {
        this.empService.formData.Gender = this.convertGender(this.empService.formData.Gender);
        if(res.EmployeeID != null)
        {
          this.empService.formDataGet= this.empService.formData;
          this.bMode=true;
        }
        else 
        {
          if(this.bMode)
          {
            this.resetFormWithoutId();
          }
        }
      });
  }
  onSubmit(form : NgForm){
    if(!this.validateData(form)){
      return;
    }
    this.toastr.success('Success Save Data.','Success');
    if(!this.bMode)
    {
      this.insertDataWithImage(form);
    }
    else{
      this.removeImageForUpdate(form);
    }
  }

  
  insertData(form : NgForm){
    this.empService.postEmployee(form.value).subscribe(
      res =>{
      this.router.navigate(['../'],{relativeTo:this.route});
    }, err =>{
      this.toastr.error('Failure Send/Get API. Error : ' + err.message,'Error');
    });
  }
  updateData(form : NgForm){
    // this.empService.formDataGet.Picture = this.insertImage();
    this.empService.updateEmployee(form.value).subscribe(
      res =>{
      this.router.navigate(['../../'],{relativeTo:this.route});
    }, err =>{
      this.toastr.error('Failure Send/Get API. Error : ' + err.message,'Error');
    });
  }

  validateData(form:NgForm){
    if(form.invalid){
      this.toastr.warning('All required.','Validation');
      return false ;
    }
    if(form.value.Picture ==""){
      this.toastr.warning('Please choose picture.','Validation');
      return false ;
    }
    if(form.value.Division ==""){
      this.toastr.warning('Please choose Divison.','Validation');
      return false ;
    }
    if(form.value.Position ==""){
      this.toastr.warning('Please choose Position.','Validation');
      return false ;
    }
    if(!this.bNumber){
      this.toastr.warning('Please check contact phone number.','Validation');
      return false ;
    }
    return true;
  }
  private convertGender(gender:String)
  {
    if(gender =="M"){
      return "Male";
    }
    else{
      return "Female";
    }
  }

  handleFileInput(file:FileList){
    this.fileToUpload = file.item(0);

    var reader= new FileReader();
    reader.onload = (event:any) => {
      this.defaultImageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    if(this.bMode){
      this.bUpdateImage=true;
    }
  }

   insertDataWithImage(form:NgForm){
    this.empService.postImageEmployee(this.fileToUpload).subscribe(
      res=> {
        form.value.Picture = res as string;
        this.insertData(form);
      }
      , err =>{          
        this.toastr.error(err.error as string,'Error');
        // result= err.error;
      }
    );
  }
  
  updateDataWithImage(form:NgForm){
    if(this.bUpdateImage){
      this.empService.postImageEmployee(this.fileToUpload).subscribe(
        res=> {
          form.value.Picture = res as string;
          this.updateData(form);
        }
        , err =>{          
          this.toastr.error(err.error as string,'Error');
          // result= err.error;
        }
      );
    }
    else{
      this.updateData(form);
    }
  }
  removeImageForUpdate(form:NgForm){
    if(this.bUpdateImage){
      this.empService.removeImageEmployee(this.oldImageUrl).subscribe(
        res=> {
          this.updateDataWithImage(form);
        }
        , err =>{          
          this.toastr.error(err.error as string,'Error');
        }
      );
    }
    else{
      this.updateDataWithImage(form);
    }
  }
}
