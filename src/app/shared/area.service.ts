import { Injectable } from '@angular/core';
import { Area } from './area.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  
  bAddData:boolean = false;
  bFirstLoad:boolean = false;
  formData : Area;
  formDataGet : Area;
  areaList:Area[];
  rootURL = "http://localhost:64839/";
  regionalList=["DKI Jakarta","Jawa Barat","Banten","Jawa Tengah","Jawa Timur"];
  currentPath;
  headersToken = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http : HttpClient) { }
  postArea(formData : Area){
    
    return this.http.post(this.rootURL+'api/Area/CreateArea',formData,{headers : this.headersToken});
  }
  updateArea(formData : Area){
    return this.http.put(this.rootURL+'api/Area/UpdateArea',formData,{headers : this.headersToken});
  }
  deleteArea(formData : Area){
    return this.http.delete(this.rootURL+'api/Area/DeleteArea?Id=' + formData.AreaID,{headers : this.headersToken});
  }
  
  refreshList(){
    return this.http.get(this.rootURL+'api/Area/GetListArea',{headers : this.headersToken})
    .toPromise().then(res => this.areaList = res as Area[]);
  }
  
  getSingleArea(AreaId){
    return this.http.get(this.rootURL+'api/Area/GetSingleArea?Id='+AreaId,{headers : this.headersToken})
    .toPromise().then(res => this.formData = res as Area);
  }

  checkNewData(route:ActivatedRoute){
    if(route.firstChild!=null){
      route.firstChild.url.subscribe(url => this.currentPath=url[0].path);
      if(this.currentPath == "new"){
        this.bAddData=true;
      }
    }
  }
}
