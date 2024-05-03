import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fournisseurService } from 'app/service/fournisseur.service';

@Component({
  selector: 'app-updatefournisseur',
  standalone: true,
  
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './updatefournisseur.component.html',
  styleUrl: './updatefournisseur.component.scss'
})
export class UpdatefournisseurComponent {

  fournisseurForm: any;
  constructor(
    private service: fournisseurService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  fournisseursForm: FormGroup;
  id: string;
  modifierAvecSucces: boolean = false;

  ngOnInit(): void {
    this.fournisseursForm = this.fb.group({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)



    });
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    
    this.service.getFournisseurbyId(this.id).subscribe((data) => {
      console.log(data);
      this.fournisseursForm.patchValue({ nom: data["nom"] });
      this.fournisseursForm.patchValue({ adresse: data["adresse"] });
      this.fournisseursForm.patchValue({ numero: data["numero"] });
      this.fournisseursForm.patchValue({ numero: data["email"] });
      this.fournisseursForm.patchValue({ numero: data["type"] });

      console.log("reclamation form here ", this.fournisseursForm.value);
    });
  }
   


  updateFournisseur(): void {
    if (this.fournisseursForm.valid) {
      const fournisseurData = this.fournisseursForm.value;
      fournisseurData.id = this.id; // Assuming _id is obtained and stored correctly
  
      this.service.updateFournisseur(this.id, fournisseurData).subscribe(
        (data: any) => {
          console.log("Update success:", data);
          this.modifierAvecSucces = true;
          this.fournisseursForm.reset();
          this.router.navigate(["dashboards/listfournisseur"]);
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
