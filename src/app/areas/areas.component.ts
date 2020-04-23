import { Component, OnInit, AfterViewInit,AfterContentChecked, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../shared/area.service';
import { Area } from '../shared/area.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit,OnChanges {

  constructor(private route:ActivatedRoute,private router:Router,public areaService:AreaService,cdRef:ChangeDetectorRef) { }
  public AreaData:Area;
  currentPath;
  ngOnInit(): void {
    
    this.areaService.bAddData=false;
    this.areaService.checkNewData(this.route);
  }
  ngOnChanges(){
    // this.areaService.bAddData=false;
  }
  onEdit(){
    // this.router.navigate(['id'],{relativeTo:this.route,queryParamsHandling:'preserve'});

  } 
  addData(){
    this.areaService.bAddData=true;
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  public refreshAddStatus()
  {
    this.areaService.bAddData=true;
  }
  
}
