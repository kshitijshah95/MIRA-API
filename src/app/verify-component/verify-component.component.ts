import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {MatSnackBar} from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'verify-component',
  templateUrl: './verify-component.component.html',
  styleUrls: ['./verify-component.component.css']
})
export class VerifyComponentComponent implements OnInit {

  constructor(private http: HttpClient, public snackBar: MatSnackBar, 
    public dialog: MatDialog) { }

  name:string;
  ourFile: File;

  ngOnInit() {
  }

  openInput(){
    document.getElementById("fileInput").click();
  }

  fileChange(files: File[]) {
    if (files.length > 0) {
      this.ourFile = files[0];
    }
  }

   upload() {
    const url = `http://localhost:8080/verify`;
    let input = new FormData();
    input.append('file', this.ourFile);
    return this.http.post(url, input).subscribe(result => {
      this.dialog.open(DialogComponent, { data: result });
    },error => {
      this.snackBar.open(error.error.message,'Undo', {
        duration: 1000
      });
    });
  }
}