import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnChanges {

  constructor(private router:Router,
    private authService:AuthService) { }

  ngOnInit() {
  }

  onLoadServers(id:number){
    // complex calculation
    this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'},fragment:'loading'});
  }
  onLogin(){
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnChanges(){
  }
}
