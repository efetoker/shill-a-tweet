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
  reply: boolean = false;

  loading: boolean = false;
  accountId: number = 0;

  processes: any[] = [];

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

  reset(){
    this.loading = true;
    this.tweet_id = null;
    this.tweet_url = '';

    this.processes = [];
    
    this.accounts = JSON.parse(localStorage.getItem('accounts') || '{}');

    setTimeout(() => {
      this.loading = false;
    }, 350);
  }

  tweetInserted(){
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
        }

        this.loading = false;
      });
    }else{
      this.loading = false;
    }
  }
  
  selectionsDone(){
    if(this.reply && this.accounts.filter(e => e.tweet != null).length == 0){
      alert('Please fill in all fields.');
    }else{
      this.loading = true;

      this.accounts.filter(e => e.active === true).forEach((e: any) => {
          if(this.like && this.tweet_id != null){
              this.process('like', e);
          }
  
          if(this.retweet && this.tweet_id != null){
              this.process('retweet', e);
          }
  
          if(this.reply && this.tweet_id != null){
              this.process('reply', e);
          }
      });
    }
  }

  process(type: string, e: any){
    let processMultiplier = 0;

    if(this.like){ processMultiplier++; }
    if(this.retweet){ processMultiplier++; }
    if(this.reply){ processMultiplier++; }

    if(type == 'reply' && this.tweet_id != null){
      this.service.replyTweet(this.tweet_id, e).subscribe((e2: any) => {
        this.processes.push({type:'reply', status: e2.response.status, username: e.username, image: e.image});

        if(this.processes.length == (processMultiplier * this.accounts.filter(e => e.active === true).length)){
          setTimeout(() => {
            this.loading = false;
            this.tweet_id = null;
          }, 1000);
        }
      });
    }

    if(type == 'retweet' && this.tweet_id != null){
      this.service.retweetTweet(this.tweet_id, e).subscribe((e2: any) => {
        this.processes.push({type:'retweet', status: e2.response.status, username: e.username, image: e.image});

        if(this.processes.length == (processMultiplier * this.accounts.filter(e => e.active === true).length)){
          setTimeout(() => {
            this.loading = false;
            this.tweet_id = null;
          }, 1000);
        }
      });
    }

    if(type == 'like' && this.tweet_id != null){
      this.service.likeTweet(this.tweet_id, e).subscribe((e2: any) => {
        this.processes.push({type:'like', status: e2.response.status, username: e.username, image: e.image});

        if(this.processes.length == (processMultiplier * this.accounts.filter(e => e.active === true).length)){
          setTimeout(() => {
            this.loading = false;
            this.tweet_id = null;
          }, 1000);
        }
      });
    }
  }
}
