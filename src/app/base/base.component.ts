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
        this.accounts = e.data.map((e: any) => {
          let obj = {
            oauth_token: e.oauth_token,
            oauth_token_secret: e.oauth_token_secret,
            username: e.username,
            id: e.id,
            tweet: null,
            image: e.image,
            active: true
          };

          console.log(obj);

          return obj;
        });

        localStorage.setItem('accounts', JSON.stringify(this.accounts));
      }

      this.loading = false;
    });
  }

  signIn(){
    window.location.href = 'https://twitter-authenticator.herokuapp.com/start-auth';
  }

  deleteAccount(account: any){
    if(confirm("Sure?")){
      this.service.deleteAccount(account).subscribe((e: any) => {
        if(e.response.status){
          this.accounts = this.accounts.filter(e => e.id !== account.id);
        }else{
          alert('Error deleting account: ' + e.response.message);
        }
      });
    }
  }

  goToProfile(account: any){
    window.open('https://twitter.com/'+ account.username, '_blank');
  }
}
