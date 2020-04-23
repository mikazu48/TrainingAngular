import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/shared/area.service';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/shared/area.model';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,public areaService:AreaService, public toastr : ToastrService) { }
  AreaList:Area[];
  currentPath;
  ngOnInit(): void {
    this.areaService.bAddData=false;
    
    // this.areaService.checkNewData(this.route);
    this.AreaList = this.areaService.areaList;
    this.areaService.refreshList();

  }

  populateForm(AreaData:Area){
    this.areaService.bAddData=true;
    this.router.navigate(['edit/' + AreaData.AreaID],{relativeTo:this.route});
  }
  onDelete(AreaData:Area){
    if(confirm('Are you sure for delete this data?')){
      this.areaService.deleteArea(AreaData).subscribe(res=>{
        this.areaService.refreshList();
        this.toastr.warning('Success delete data.','Delete');
      }, err =>{
        alert(err.message);
      });
    };
  }
  
  searchData(term: string) {
    if(!term) {
      this.areaService.refreshList();
    } else {
      this.areaService.areaList = this.areaService.areaList.filter(x => 
        x.AreaID.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
        x.AreaName.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
        x.Regional.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
        x.District.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }
}
