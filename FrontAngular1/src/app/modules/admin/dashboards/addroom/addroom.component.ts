import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.scss']
})
export class AddroomComponent implements OnInit {
  roomForm!: FormGroup;
  nickname = '';
  roomname = '';
  database = firebase.database();
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      'roomname': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const room = form;
    const roomRef = this.database.ref('rooms/');
    roomRef.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot: firebase.database.DataSnapshot) => {
      if (snapshot.exists()) {
        this.snackBar.open('Le nom de la salle existe déjà !', '', {
          duration: 2000
        });
      } else {
        const newRoomRef = roomRef.push();
        newRoomRef.set(room);
        this.router.navigate(['/dashboards/roomlist']);
      }
    });
  }
}
