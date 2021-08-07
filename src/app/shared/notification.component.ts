import {Injectable} from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn:'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar){}

  config:MatSnackBarConfig={
    duration:1000,
    horizontalPosition:'center',
    verticalPosition:'top'
  }
  success(msg){
    this.snackBar.open(msg,'',this.config)
  }

}
