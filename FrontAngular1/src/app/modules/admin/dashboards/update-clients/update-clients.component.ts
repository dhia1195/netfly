import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ListeClientsService } from 'app/service/liste-clients.service';


@Component({
  selector: 'app-update-clients',
  standalone: true,

  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-clients.component.html',
  styleUrl: './update-clients.component.scss'
})

export class UpdateClientsComponent {
  clientForm: any;
  constructor(
    private service:ListeClientsService ,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  clientsForm: FormGroup;
  id: string;
  modifierAvecSucces: boolean = false;

  ngOnInit(): void {
    this.clientsForm = this.fb.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      numrTel: new FormControl('', Validators.required)



    });
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    
    this.service.getClientById(this.id).subscribe((data) => {
      console.log(data);

      this.clientsForm.patchValue({nom :data ["nom"]});
  this.clientsForm.patchValue({prenom :data ["prenom"]});
  this.clientsForm.patchValue({adresse :data ["adresse"]});
  this.clientsForm.patchValue({email :data ["email"]});
  this.clientsForm.patchValue({numrTel :data ["numrTel"]});

      console.log("reclamation form here ", this.clientsForm.value);
    });
  }
   


  updateClient(): void {
    if (this.clientsForm.valid) {
      const clientData = this.clientsForm.value;
      clientData.id = this.id; // Assuming _id is obtained and stored correctly
  
      this.service.updateClient(this.id, clientData).subscribe(
        (data: any) => {
          console.log("Update success:", data);
          this.modifierAvecSucces = true;
          this.clientsForm.reset();
          this.router.navigate(["dashboards/listclients"]);
        },
        (error: any) => {
          console.error("Error updating reclamation:", error);
          // Handle error accordingly, e.g., show error message
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}


