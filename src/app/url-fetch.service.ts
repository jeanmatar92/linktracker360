import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlFetchService {

  private api: string = 'https://script.google.com/macros/s/AKfycbwg9eEGEpxhe8iLxkXV2KF04xDr2TDgESJx2d1SPEj9rYQzKBD1Fn14HF9h0g7Chn8V/exec';
  
  constructor(private httpClient: HttpClient) { }

  getRedirectionsFromJson(url: string) {
    let apiLink = this.api;
    let mode = 'single';

    let requestUrl = `${apiLink}?mode=${mode}`;

    return this.httpClient.post(requestUrl, JSON.stringify(url));
  }

  getLandingPagesFromJson(urlList: string[]) {
    let apiLink = this.api;
    let mode = 'multi';

    let requestUrl = `${apiLink}?mode=${mode}`;

    return this.httpClient.post(requestUrl, JSON.stringify(urlList));
  }
}
