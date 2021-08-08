import {addPost, updatePost} from '../state/posts.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {MatDialogRef} from '@angular/material/dialog';
import {PopulateService} from '../populate.service';
import {Post} from '../../models/posts.model';

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
  nums=[]
  constructor(private store: Store<AppState>,public dialogRef:MatDialogRef<AddPostComponent>,public service:PopulateService) {
  }

  ngOnInit(): void {
    this.form=this.service.form;
  }

  onAddPost() {
    if (!this.form.valid) {
      return;
    }

    if (!this.service.form.get('id').value){
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
    }else{
      const post:Post= {
        id:this.form.value.id,
        name:this.form.value.name,
        sensorModel:this.form.value.sensorModel,
        startPoint:this.form.value.startPoint,
        endPoint:this.form.value.endPoint,
        sensorType:this.form.value.sensorType,
        modelUnit:this.form.value.modelUnit,
        locations:this.form.value.locations,
        description: this.form.value.description
      };
      this.store.dispatch(updatePost({ post }));
    }
    this.back();

  }

  back() {
    this.service.form.reset();
    this.dialogRef.close();
    this.service.initForm();
  }


}
