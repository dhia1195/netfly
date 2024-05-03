import { NgIf } from '@angular/common';
import { Component, OnInit,OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/service/user.service';
import { messages } from '../mock-api/common/messages/data';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
  standalone   : true,
  imports      : [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class ConnexionComponent implements OnInit{
  @ViewChild('signInNgForm') signInNgForm: NgForm;
  @ViewChild('forgetPNgForm') forgetPNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: '',
  };
  signInForm: UntypedFormGroup;
  forgetPForm: UntypedFormGroup;
  showAlert: boolean = false;
  emailFP:boolean=false;
  codeFP:boolean=false;
  passwordFP:boolean=false;
  codeE:string=""
  authSubscription!: Subscription;

  /**
   * Constructor
   */
  constructor(
      private _activatedRoute: ActivatedRoute,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
      private userS:UserService,
      private authService: SocialAuthService
  )
  {
  }
  
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  ngOnInit(): void
  {
      
    this.authSubscription = this.authService.authState.subscribe((user) => {
      console.log('user', user);
      this.userS.getAllUser().subscribe({
        next:(users:any[])=>{
          console.log(user)
          console.log(users)
         var res=users.find((u)=> u.email === user.email)
         if(!res){
          this.userS.inscriptionG({email:user.email,name:user.name,role:"employe",state:true}).subscribe({
            next:(u)=>{
              this.userS.signToken(u).subscribe({
                next:(token:any)=>{
                  this.userS.decode(token.message).subscribe({
                    next : (dataN:any)=>{
                      if(dataN.payload.state === false){
                          alert("access denied");
                      }
                      else{
                        localStorage.setItem("employe",token.message)
                        this._router.navigate(['profileE'])
                      }
                     
                    }
                  }) 
                }
               })
            }
          });
         
         }
         this.userS.signToken(res).subscribe({
          next:(token:any)=>{
            this.userS.decode(token.message).subscribe({
              next : (dataN:any)=>{
                if(dataN.payload.state === false){
                    alert("access denied");
                }
                else{
                  localStorage.setItem("employe",token.message)
                  this._router.navigate(['profileE'])
                }
               
              }
            }) 
          }
         })
        }
      } 
      )
      
    });
    // Create the form
      this.signInForm = this._formBuilder.group({
          email     : ['', [Validators.required, Validators.email]],
          password  : ['', Validators.required],
          // rememberMe: [''],
      });
      this.forgetPForm = this._formBuilder.group({
        emailP    : ['',[Validators.required, Validators.email]],
        passwordN : ['',Validators.required],
        codeP : ['',Validators.required],
        // rememberMe: [''],
    });
  }
  googleSignin(googleWrapper: any) {
      googleWrapper.click();
    
    
  }
  signIn():void{
    if ( this.signInForm.invalid )
    {
        return;
    }

    // Disable the form
    // this.signInForm.disable();

    // Hide the alert
    // this.showAlert = false;
    var user=this.signInForm.value
    this.userS.connexion(user.email,user.password).subscribe({
      next : (data:any)=>{
        console.log(data)
        if(data.message !== "mot de passe incorrect" && data.message !== "email inexistant"){
          this.userS.decode(data.message).subscribe({
            next : (dataN:any)=>{
              if(dataN.payload.state === false){
                  alert("access denied");
              }
              else{
                localStorage.setItem(dataN.payload.role,data.message)
                this._router.navigate(['profileE'])
              }
             
            }
          }) 
          
        }
        else{
        alert(data.message)
        }
       
      } 
    })
  
  }
  forgetPassword():void{
    this.emailFP=true;
  }
  changePassword():void{
    if(this.passwordFP && this.forgetPForm.value.passwordN){
      
      console.log(this.forgetPForm.value)
      this.userS.modifyEmail({password:this.forgetPForm.value.passwordN},this.forgetPForm.value.emailP).subscribe({
        next:(data:any)=>this.passwordFP=false
      })
    }
    else if(this.codeFP && this.forgetPForm.value.codeP  ){
      if(this.forgetPForm.value.codeP !== this.codeE){
        alert("wrong code")
      }
      else{
        this.codeFP=false
      this.passwordFP=true
      }
      
    }
    else if(this.emailFP && this.forgetPForm.value.emailP){
      this.emailFP=false
      this.codeFP=true
      this.userS.sendCode(this.forgetPForm.value.emailP).subscribe({
        next:(data:any)=>this.codeE=data.message
      })
    }
    else{
      return;
    }
  }
}
