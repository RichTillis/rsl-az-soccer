import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import { facebookConfig } from "../../../facebook.config";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FacebookService {
  private accessToken = facebookConfig.appToken;
  private graphUrl = "https://graph.facebook.com/v3.2/";
  private pageName = "117766291631543"; //RSLAZsa
  private graphQuery = `?access_token=${this.accessToken}&date_format=U&fields=posts{from,created_time,message,attachments,link,picture,type}`;

  private allPosts: {};
  posts: any = {};

  constructor(private http: HttpClient) {}

  // getPosts(): Observable<any[]> {
  getPosts() {
    let url = this.graphUrl + this.pageName + this.graphQuery;
    console.log(url);
    return this.http.get(url).pipe(
      map(response => {
        this.allPosts = response["posts"]["data"];
        this.posts = this.allPosts;
        // console.log(this.posts);
        return this.posts;
      })
    );
  }
}
