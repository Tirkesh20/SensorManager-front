import { addPost } from '../state/posts.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  form: FormGroup;
  startPoint:number;
  types=[
    {id:'PRESSURE',value:'Pressure'},
    {id: 'VOLTAGE',value:'Voltage'},
    {id: 'TEMPERATURE',value:'Temperature'},
    {id: 'HUMIDITY',value:'Humidity'},
  ]
  units=[
    {id:'BAR',value:'bar'},
    {id: 'VOLTAGE',value:'Voltage'},
    {id: 'CELSIUS',value:'*C'},
    {id: 'PERCENT',value:'%'}
  ]
  nums=[
    {id:1,value:1},
    {id: 2,value:2},
    {id: 3,value:3},
    {id: 4,value:4}
  ]
  constructor(private store: Store<AppState>,private router:Router) {
  }

  ngOnInit(): void {
  this.initForm();
  }
  initForm(){
    this.form=new FormGroup({
      id:new FormControl(null),
      name:new FormControl('',[Validators.required,Validators.maxLength(30)]) ,
      sensorModel:new FormControl('',[Validators.required,Validators.maxLength(15)]),
      startPoint:new FormControl('',Validators.required),
      endPoint:new FormControl('',[Validators.required]),
      sensorType:new FormControl(0,),
      modelUnit:new FormControl(0,Validators.required),
      locations:new FormControl('',[Validators.maxLength(40)]),
      description:new FormControl('',[Validators.maxLength(200)]),
    })
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
    const post:{ name: string;sensorModel: string  ; startPoint: number;endPoint: number; sensorType: string;modelUnit: string;   locations: string; description: string;}= {
      name:this.form.value.name,
      sensorModel:this.form.value.sensorModel,
      startPoint:this.form.value.startPoint,
      endPoint:this.form.value.endPoint,
      sensorType:this.form.value.sensorType,
      modelUnit:this.form.value.modelUnit,
      locations:this.form.value.locations,
      description: this.form.value.description
    };
    this.store.dispatch(addPost({ post }));
  }

  back() {
    this.router.navigate(['posts']);
  }
}
