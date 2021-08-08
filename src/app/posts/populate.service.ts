import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class PopulateService {

  form:FormGroup=new FormGroup({
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

  initForm(){
    this.form.setValue({
      id:null,
      name:'',
      sensorModel:'',
      startPoint:0,
      endPoint:1,
      sensorType:0,
      modelUnit:0,
      locations:'',
      description:''
    })
  }

  populateForm(row) {
    this.form.setValue(row)
  }
}
