import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  accounts: any[] = [];
  loading: boolean = true;

  constructor(public service: AppService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(){
    this.service.getAccounts().subscribe((e: any) => {
      if(e.response.status){
        this.accounts = e.data;
      }

      this.loading = false;
    });
  }

  signIn(){
    window.location.href = 'https://twitter-authenticator.herokuapp.com/start-auth';
  }
}
