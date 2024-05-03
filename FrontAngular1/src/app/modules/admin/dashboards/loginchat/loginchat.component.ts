import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-loginchat',
  templateUrl: './loginchat.component.html',
  styleUrls: ['./loginchat.component.scss']
})
export class LoginchatComponent implements OnInit {

  loginForm: FormGroup;
  nickname = '';
  ref = firebase.firestore().collection('users');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['/roomlist']);
    }
    this.loginForm = this.formBuilder.group({
      'nickname': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const login = form;
    this.ref.where('nickname', '==', login.nickname).get().then((querySnapshot: firebase.firestore.QuerySnapshot) => {
      if (!querySnapshot.empty) {
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist']);
      } else {
        const newUser = firebase.firestore().collection('users').doc();
        newUser.set(login);
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist']);
      }
    }).catch((error: any) => {
      console.error('Error searching for user:', error);
    });
  }
}



