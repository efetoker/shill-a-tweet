import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { 
    
  }

  getAccounts() {
    return this.http.get('https://twitter-authenticator.herokuapp.com/accounts');
  }

  deleteAccount(account: any) {
    return this.http.delete('https://twitter-authenticator.herokuapp.com/account/' + account.id);
  }

  getOEmbed(url: string) {
    return this.http.get('https://publish.twitter.com/oembed?url=' + url);
  }
}