import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterContentInit {

  ngOnInit(){
    if(localStorage.getItem('authToken') != null){
      localStorage.setItem('authToken', "");
      localStorage.setItem('loginStatus','false');
    }
  }
  ngAfterContentInit(){
    // if(localStorage.getItem('loginStatus')== 'false'){
    //   localStorage.setItem('loginStatus','true');
    // }
    
  }
}
