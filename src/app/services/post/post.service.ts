import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, groupBy, tap, catchError, filter, mergeMap, toArray } from "rxjs/operators";
import { AngularFireDatabase } from '@angular/fire/database';
import { Post } from '../../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = "https://ftlowellrush.firebaseio.com";

  posts: Observable<any[]>;

  postsData$ = this.http.get<Post[]>('/assets/posts.json').pipe(
    tap(posts => console.log(posts)),
    map(posts => posts['posts'].map(post => ({
      ...post
    }) as Post)),
    catchError(this.handleError)
  );

  constructor(public http: HttpClient, private db: AngularFireDatabase) { }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
