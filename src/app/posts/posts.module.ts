import { PostsEffects } from './state/posts.effects';
import { EffectsModule } from '@ngrx/effects';
import { POST_STATE_NAME } from './state/posts.selector';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';
import {MaterialModule} from './material.module';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
    path: '',
    component: PostsListComponent
  },
];
@NgModule({
  declarations: [PostsListComponent, AddPostComponent],
  imports: [
    MaterialModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    MatListModule,
    MatInputModule,
  ]
})
export class PostsModule {}
