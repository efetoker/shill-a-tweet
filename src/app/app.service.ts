import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private oauth_callback: string = 'http://localhost:4200/callback';
  private oauth_nonce: any;
  private oauth_consumer_key = 'y1ZSqUv1Df8ArBZVe9df2fxKp';
  private oauth_signature_method = 'HMAC-SHA1';
  private oauth_version : any;
  private oauth_signature: any;
  private oauth_timestamp: any;

  private baseUrl: string = '/api';

  constructor(private http: HttpClient) { 
    this.oauth_nonce = this.generateNonce();
    this.oauth_timestamp = this.generateTimestamp();
    this.oauth_version = '1.0';
  }

  private generateNonce(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private generateTimestamp(): string {
    return new Date().getTime().toString();
  }

  private requestToken() {
    let url = this.baseUrl + '/oauth/request_token';
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.getAuthorizationHeader(url, 'POST')
    });
    let body = 'oauth_callback=' + this.oauth_callback;
    return this.http.post(url, body, { headers: headers }).subscribe(data => {
      console.log(data);
    });
  }

  private getAuthorizationHeader(url: string, method: string): string {
    let params = this.getAuthorizationParams(url, method);
    let baseString = this.getBaseString(url, method, params);
    let signature = this.getSignature(baseString);
    let authHeader = 'OAuth ' + this.getAuthHeaderParams(params, signature);
    return authHeader;
  }

  private getAuthorizationParams(url: string, method: string): any {
    let params = {
      oauth_consumer_key: this.oauth_consumer_key,
      oauth_nonce: this.oauth_nonce,
      oauth_signature_method: this.oauth_signature_method,
      oauth_timestamp: this.oauth_timestamp,
      oauth_version: this.oauth_version
    };
    return params;
  }

  private getBaseString(url: string, method: string, params: any): string {
    let baseString = method + '&' + this.encode(url) + '&' + this.encode(this.getParamsString(params));
    return baseString;
  }

  private getParamsString(params: any): string {
    let paramsArray = [];
    for (let key in params) {
      paramsArray.push(this.encode(key) + '=' + this.encode(params[key]));
    }
    return paramsArray.sort().join('&');
  }

  private getSignature(baseString: string): string {
    let key = this.oauth_consumer_key + '&';
    let signature = this.encode(this.getSignatureBase64(baseString, key));
    return signature;
  }

  private getSignatureBase64(baseString: string, key: string): string {
    let hash = this.getHash(baseString, key);
    return this.btoa(hash);
  }

  private getHash(baseString: string, key: string): string {
    var CryptoJS = require("crypto-js");
    let hash = CryptoJS.HmacSHA1(baseString, key);
    return hash.toString(CryptoJS.enc.Base64);
  }

  private getAuthHeaderParams(params: any, signature: string): string {
    params.oauth_signature = signature;
    let authHeaderParams = [];
    for (let key in params) {
      authHeaderParams.push(key + '="' + this.encode(params[key]) + '"');
    }
    return authHeaderParams.join(',');
  }

  private encode(value: string): string {
    return encodeURIComponent(value).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  private btoa(value: string): string {
    return btoa(value);
  }

  private getRequestToken(): void {
    let url = this.baseUrl + '/oauth/request_token';
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.getAuthorizationHeader(url, 'POST')
    });
    let body = 'oauth_callback=' + this.oauth_callback;
    this.http.post(url, body, { headers: headers }).subscribe(data => {
      console.log(data);
    });
  }

  public auth(){
    return this.getRequestToken();
  }
}