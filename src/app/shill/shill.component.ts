import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-shill',
  templateUrl: './shill.component.html',
  styleUrls: ['./shill.component.scss']
})
export class ShillComponent implements OnInit {

  tweet_url: string = '';
  tweet_id: string|null = null;
  accounts: any[] = [];

  like: boolean = true;
  retweet: boolean = true;
  reply: boolean = true;

  loading: boolean = false;
  accountId: number = 0;

  constructor(public service: AppService, private route: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('accounts')){
      this.route.navigate(['/']);
    }else{
      this.accounts = JSON.parse(localStorage.getItem('accounts') || '{}');
    }
  }

  change(event: any){
    this.accounts = JSON.parse(localStorage.getItem('accounts') || '{}').map((e: any) => {e.id == event || event == 0 ? e.active = true : e.active = false; return e;});
  }

  test(){
    this.loading = true;

    if(Number(this.tweet_url.split('/')[5])){
      this.tweet_id = this.tweet_url.split('/')[5];
    }else{
      this.tweet_id = null;
    }

    if(this.tweet_id != null){
      this.service.getTweet(this.tweet_id, this.accounts[0]).subscribe((e: any) => {
        if(e.response.status === false){
          this.tweet_id = null;

          alert(e.response.message);
        }else{
          this.tweet_id = e.data.id;
        }

        this.loading = false;
      });
    }else{
      this.loading = false;
    }
  }

  done(){
    if(this.reply && this.accounts.filter(e => e.tweet != null).length == 0){
      alert('Please fill in all fields.');
    }else{
      
    }
  }

}
