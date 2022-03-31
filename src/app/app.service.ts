import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { 
    
  }

  getAccounts() {
    return this.http.get('https://cors-anywhere-for-twitter.herokuapp.com/https://twitter-authenticator.herokuapp.com/accounts');
  }

  deleteAccount(account: any) {
    return this.http.delete('https://cors-anywhere-for-twitter.herokuapp.com/https://twitter-authenticator.herokuapp.com/account/' + account.id);
  }

  getTweet(id: string, account: any) {
    return this.http.get('https://cors-anywhere-for-twitter.herokuapp.com/https://twitter-authenticator.herokuapp.com/tweet/' + id + '/' + account.oauth_token + '/' + account.oauth_token_secret);
  }

  likeTweet(id: string, account: any) {
    return this.http.post('https://cors-anywhere-for-twitter.herokuapp.com/https://twitter-authenticator.herokuapp.com/like/' + id, account);
  }

  retweetTweet(id: string, account: any) {
    return this.http.post('https://cors-anywhere-for-twitter.herokuapp.com/https://twitter-authenticator.herokuapp.com/retweet/' + id, account);
  }

  replyTweet(id: string, account: any) {
    return this.http.post('https://cors-anywhere-for-twitter.herokuapp.com/https://twitter-authenticator.herokuapp.com/reply/' + id, account);
  }
}