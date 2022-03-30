import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { 
    
  }

  getAccounts() {
    console.log("Request made: " + "https://twitter-authenticator.herokuapp.com/accounts");
    return this.http.get('https://twitter-authenticator.herokuapp.com/accounts');
  }

  deleteAccount(account: any) {
    console.log("Request made: " + "https://twitter-authenticator.herokuapp.com/delete-account" + account.id);
    return this.http.delete('https://twitter-authenticator.herokuapp.com/account/' + account.id);
  }

  getTweet(id: string, account: any) {
    console.log("Request made: " + 'https://twitter-authenticator.herokuapp.com/tweet/' + id + '/' + account.oauth_token + '/' + account.oauth_token_secret);
    return this.http.get('https://twitter-authenticator.herokuapp.com/tweet/' + id + '/' + account.oauth_token + '/' + account.oauth_token_secret);
  }

  getOEmbed(url: string) {
    console.log("Request made: " + 'https://publish.twitter.com/oembed?url=' + url);
    return this.http.get('https://publish.twitter.com/oembed?url=' + url);
  }

  likeTweet(id: string, account: any) {
    console.log("Request made: " + 'https://twitter-authenticator.herokuapp.com/like/' + id, account);
    return this.http.post('https://twitter-authenticator.herokuapp.com/like/' + id, account);
  }

  retweetTweet(id: string, account: any) {
    console.log("Request made: " + 'https://twitter-authenticator.herokuapp.com/retweet/' + id, account);
    return this.http.post('https://twitter-authenticator.herokuapp.com/retweet/' + id, account);
  }

  replyTweet(id: string, account: any, text: string) {
    console.log("Request made: " + 'https://twitter-authenticator.herokuapp.com/reply/' + id);
    return this.http.post('https://twitter-authenticator.herokuapp.com/reply/' + id, {account: account, text: text});
  }
}