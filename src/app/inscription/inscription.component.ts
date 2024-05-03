import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/service/user.service';
import { user } from '../mock-api/common/user/data';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
  standalone   : true,
  imports      : [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class InscriptionComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: '',
  };
  signUpForm: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
      private userS:UserService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Create the form
      this.signUpForm = this._formBuilder.group({
              name      : ['', Validators.required],
              email     : ['', [Validators.required, Validators.email]],
              password  : ['', Validators.required],
              number   : ['',[Validators.required]],
              birthD   : ['',Validators.required],
              agreements: ['', Validators.requiredTrue],
          },
      );
  }
  signUp(){
    if ( this.signUpForm.invalid )
    {
        return;
    }

    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;
    var user=this.signUpForm.value
    user.role="employe"
    user.state=true
    this.userS.inscription(user).subscribe({
      next : (data:any)=> this._router.navigate(["login"])
    })
  }

}
