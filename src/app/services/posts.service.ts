import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>('http://localhost:8080/sensor/all')
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post >(
      `${this.apiServerUrl}/sensor/add`,
      post
    );
  }

  updatePost(post: Post) {
    return this.http.put<Post>(`${this.apiServerUrl}/sensor/add`, post);
  }

  deletePost(id: number) {
    return this.http.delete<void>(`${this.apiServerUrl}/sensor/delete/${id}`);
  }

  getPostById(id: number): Observable<Post> {
   return this.http.get<Post>('http://localhost:8080/sensor/find/'+id);
  }
}
