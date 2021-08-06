import { getPosts } from '../state/posts.selector';
import { Post } from '../../models/posts.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/posts.actions';
import {UserService} from '../../services/user.servive';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: Post[]|any;
  name:any;
  p:number=1;
  count: Observable<number>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }
  search(){
    this.posts=this.store.select(getPosts);
    if(this.name==''){
      this.ngOnInit();
    }else {
      this.posts=this.posts.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }
  onDeletePost(id: number) {
    // if (confirm('Are you sure you want to delete')) {
    // }
    this.store.dispatch(deletePost({ id }));
  }
}
