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
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddPostComponent} from '../add-post/add-post.component';
import {PopulateService} from '../populate.service';
import {isAdmin} from '../../auth/state/auth.selector';
import {AuthService} from '../../services/auth.service';

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
  constructor(private store: Store<AppState>,public dialog:MatDialog,public service:PopulateService,private authService:AuthService) {}

  @ViewChild(MatSort)sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  ngOnInit(): void {
    console.log(this.store.select(isAdmin));
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

  onCreate() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width='50%';
    this.dialog.open(AddPostComponent,dialogConfig);
  }
   isAdmin ():boolean {
    return this.authService.isAdmin();

  }

  onEdit(row) {
    this.service.populateForm(row);
    console.log(this.isAdmin)
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width='50%';
    this.dialog.open(AddPostComponent,dialogConfig);
  }
}
