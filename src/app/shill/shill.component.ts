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
  tweet_id: number = 0;
  accounts: any[] = [];

  constructor(public service: AppService, private route: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('accounts')){
      this.route.navigate(['/']);
    }else{
      this.accounts = JSON.parse(localStorage.getItem('accounts') || '{}');
    }

    console.log(this.accounts);
  }

  test(){
    if(Number(this.tweet_url.split('/')[5])){
      this.tweet_id = parseInt(this.tweet_url.split('/')[5]);
      this.tweet_url = this.tweet_id.toString();
    }
  }

  /*
  selectTweet(){
    if(this.tweet_url != '' || this.tweet_url != null){
      this.service.getOEmbed(this.tweet_url).subscribe((e: any) => {
        console.log(e);
      });
    }
  }
  */

}
