import { addPost } from '../state/posts.actions';
import { Post } from '../../models/posts.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  form: FormGroup;

  types=[
    {id: 3,value:'C'},
    {id: 2,value:'%'},
    {id: 3,value:'temp'}
  ]
  constructor(private store: Store<AppState>) {
    this.form=new FormGroup({
      $key:new FormControl(null),
      name:new FormControl('') ,
      sensorModel:new FormControl(''),
      startPoint:new FormControl(''),
      endPoint:new FormControl(''),
      sensorType:new FormControl(0),
      modelUnit:new FormControl(0),
      locations:new FormControl(''),
      description:new FormControl(''),
    })
  }

  ngOnInit(): void {

  }

  showDescriptionErrors() {
    const descriptionForm = this.form.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors.required) {
        return 'Description is required';
      }

      if (descriptionForm.errors.minlength) {
        return 'Description should be of minimum 10 characters length';
      }
    }
  }

  onAddPost() {
    if (!this.form.valid) {
      return;
    }
    const post: Post = {
      id:this.form.value,
      name:this.form.value.name,
      sensorModel:this.form.value,
      startPoint:this.form.value,
      endPoint:this.form.value,
      sensorType:this.form.value,
      modelUnit:this.form.value,
      locations:this.form.value,
      description: this.form.value.description
    };

    this.store.dispatch(addPost({ post }));
  }
}
