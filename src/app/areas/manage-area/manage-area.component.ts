import { Component, OnInit, Input, AfterContentChecked, OnChanges, Injector } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/shared/area.service';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/shared/area.model';
import { AreasComponent } from '../areas.component';

@Component({
  selector: 'app-manage-area',
  templateUrl: './manage-area.component.html',
  styleUrls: ['./manage-area.component.css']
})
export class ManageAreaComponent implements OnInit,OnChanges {

  @Input() bAdd = false;
  bMode:boolean;
  currentPath;
  paramsSubscription:Subscription;
  public areaForm: FormGroup; 

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public areaService:AreaService, 
    public toastr : ToastrService,
    private injector:Injector) {}

  ngOnInit(): void { 
    // this.areaService.bAddData=true;

    this.blankLoad();
    
    this.route.url.subscribe(url => this.currentPath=url[0].path);
    if(this.currentPath == "new"){
    this.bMode=false;
    if(this.areaService.bFirstLoad){
      this.areaService.bAddData=true;
    }
  }
    else{
    const AreaId = this.route.snapshot.params['id'];
    this.areaService.getSingleArea(AreaId).then(
      res=>{
        if(res.AreaID == null){
          this.toastr.error('ID with ' + AreaId + ' not found on API Database.','Error');
        }
        else{
          this.areaService.formDataGet = this.areaService.formData;
          this.setAreaValues(this.areaService.formDataGet);
        }
      }
    );
    this.bMode=true;
  }
}

  ngOnChanges()
  {
    
  }

  setAreaValues(AreaData:Area)
  {
    this.areaForm.setValue({
      'AreaID': AreaData.AreaID,
      'AreaName': AreaData.AreaName,
      'Regional': AreaData.Regional,
      'District': AreaData.District,
    })
  }
  blankLoad(){
    this.areaForm = new FormGroup({
      'AreaID':new FormControl('',Validators.required),
      'AreaName':new FormControl('',Validators.required),
      'Regional':new FormControl(''),
      'District':new FormControl('')
    });

  }
  
  resetFormWithoutId(){
    this.areaService.formDataGet.AreaName ='';
    this.areaService.formDataGet.Regional = '';
    this.areaService.formDataGet.District = '';    
    this.setAreaValues(this.areaService.formData);
    this.bMode=false;
  }
  ngOnDestroy(){
    this.areaService.bAddData=false;
  }
  onSubmit(){
    if (this.areaForm.invalid) {
      this.toastr.warning('All required.','Validation');
      return;
    }
    if (this.areaForm.get('Regional').value == "") {
      this.toastr.warning('Please choose regional.','Validation');
      return;
    }
    if (this.areaForm.get('District').value == "") {
      this.toastr.warning('Please input District.','Validation');
      return;
    }
    this.toastr.success('Success Save Data.','Success');
    if(!this.bMode)
    {
      this.insertData();
    }
    else{
      this.updateData();
    }
  }
  
  insertData(){
    this.areaService.postArea(this.areaForm.value).subscribe(
      res =>{
      this.router.navigate(['../'],{relativeTo:this.route});
    }, err =>{
      this.toastr.error('Failure Send/Get API. Error : ' + err.message,'Error');
    });
  }
  updateData(){
    this.areaService.updateArea(this.areaForm.value).subscribe(
      res =>{
        if(this.currentPath == "new"){
          this.router.navigate(['../'],{relativeTo:this.route});
        }
        else{
          this.router.navigate(['../../'],{relativeTo:this.route});
        }
    }, err =>{
      this.toastr.error('Failure Send/Get API. Error : ' + err.message,'Error');
    });
  }
  onChangedData(){
    this.areaService.getSingleArea(this.areaForm.get('AreaID').value).then(
      res => {
        if(res.AreaID != null)
        {
          this.areaService.formDataGet = this.areaService.formData;
          this.setAreaValues(this.areaService.formDataGet);
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

}


