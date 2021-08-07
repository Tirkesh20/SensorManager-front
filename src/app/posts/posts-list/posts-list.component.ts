import { getPosts } from '../state/posts.selector';
import { Post } from '../../models/posts.model';
import { Observable } from 'rxjs';
import {Component,ViewChild, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/posts.actions';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})

export class PostsListComponent implements OnInit {
  posts: Post[];
  listData:MatTableDataSource<any>
  searchTag:any;
  displayColumns:string[]=['update','Name','Model','Type','Range','Unit','Location','delete'];
  p:number=1;
  count: Observable<number>;
  constructor(private store: Store<AppState>) {}

  @ViewChild(MatSort)sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  ngOnInit(): void {
  this.store.select(getPosts).subscribe((posts)=>{
     let array = posts.map(post =>{
      return{
           id: post.id,
            ...post
      }
      })
    console.log(array);
    this.listData=new MatTableDataSource(array);
    this.listData.sort=this.sort;
    this.listData.paginator=this.paginator;
  })
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: number) {
    if (confirm('Are you sure you want to delete')) {
    }
    this.store.dispatch(deletePost({ id }));
  }

  onClear() {
    this.searchTag='';
    this.onAppleFilter();
  }

  onAppleFilter() {
    this.listData.filter=this.searchTag.trim().toLowerCase();
  }
}
