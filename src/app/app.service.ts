import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { 
    
  }

  getAccounts() {
    return this.http.get('/api/accounts');
  }

  deleteAccount(account: any) {
    return this.http.delete('/api/account/' + account.id);
  }
}