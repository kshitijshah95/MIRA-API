import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']
})
export class UsersComponentComponent {
  name: string;

  sex: string;

  dob: string;

  fingerPrint: File;

  constructor(private http: HttpClient,public snackBar: MatSnackBar, 
    public dialog: MatDialog) { }

  openInput(){
    document.getElementById("fileInput").click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.fingerPrint = files[0];
    }
  }

  addUser() {
    const url = `http://localhost:8080/users`;
    let input = new FormData();
    input.append('name', this.name);
    input.append('sex', this.sex);
    input.append('dob', this.dob);
    input.append('file', this.fingerPrint);
    return this.http.post(url, input).subscribe(result => {
      this.snackBar.open("User "+result['name']+" has been created",'', {
        duration: 2000
      });
    },error => {
      this.snackBar.open(error.error.message,'Undo', {
        duration: 1000
      });
    });
    this.name = "";
    this.sex = "";
    this.dob = "";
    this.fingerPrint = undefined;
  }
}
