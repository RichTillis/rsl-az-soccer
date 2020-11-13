import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, groupBy, tap, catchError, filter, mergeMap, toArray } from "rxjs/operators";
import { AngularFireDatabase } from '@angular/fire/database';
import { Post } from '../../interfaces/post';
import * as _ from "lodash";
import { Link } from '../../interfaces/link';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = "https://ftlowellrush.firebaseio.com";

  posts: Observable<any[]>;

  // postsData$ = this.http.get<Post[]>('/assets/posts.json').pipe(
  //   tap(posts => console.log(posts)),
  //   map(posts => posts['posts'].map(post => ({
  //     ...post
  //   }) as Post)),
  //   catchError(this.handleError)
  // );
  postsData$ = this.db.list<Post[]>('posts').valueChanges().pipe(
    tap(posts => console.log(posts)),
    map(posts => posts.map(post => ({
      ...post
    }) as Post))
  );



  public getPosts(){
    this.postsData$.subscribe((data: any) => {
      return _.chain(data)
        .value();
    });
  }

  constructor(
    public http: HttpClient, 
    private db: AngularFireDatabase
    ) { }

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

  updatePost(post: Post) {
    if(!post.id) {
      const uid = this.db.createPushId();
      post.id = uid;
    }
    return this.createPostInFirebase(post);
  }

  createPostInFirebase(post: Post): Promise<any> {
    let path = `posts/${post.id}`;
    console.log(post);
    return this.db.object(path).set(post);
  }

  updatePostInFirebase(post: Post): Promise<any> {
    let path = `posts/${post.id}`;
    return this.db.object(path).update(post);
  }

  createPost(post: Post) {
    const uid = this.db.createPushId();
    post.id = uid;
    return this.createPostInFirebase(post);
  }
}
