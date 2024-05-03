import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListeVentesService } from 'app/service/liste-ventes.service';

@Component({
  selector: 'app-update-ventes',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-ventes.component.html',
  styleUrl: './update-ventes.component.scss'
})
export class UpdateVentesComponent {
  ventesForm: any;
  constructor(
    private service:ListeVentesService ,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  venteForm: FormGroup;
  id: string;
  modifierAvecSucces: boolean = false;

  ngOnInit(): void {
    this.venteForm = this.fb.group({
      id_produit: new FormControl('', Validators.required),
      dateV: new FormControl('', Validators.required),
      statut_paiement: new FormControl('', Validators.required),
      clients: new FormControl('', Validators.required)
     

    });
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    
    this.service.getVenteById(this.id).subscribe((data) => {
      console.log(data);

      this.venteForm.patchValue({id_produit :data ["id_produit"]});
  this.venteForm.patchValue({dateV :data ["dateV"]});
  this.venteForm.patchValue({statut_paiement :data ["statut_paiement"]});
  this.venteForm.patchValue({clientId :data ["clientId"]});
 

      console.log("here ", this.venteForm.value);
    });
  }
  
  updateVente(): void {
    if (this.venteForm.valid) {
      const venteData = this.venteForm.value;
      venteData.id = this.id; // Assuming _id is obtained and stored correctly
  
      this.service.updateVente(this.id, venteData).subscribe(
        (data: any) => {
          console.log("Update success:", data);
          this.modifierAvecSucces = true;
          this.venteForm.reset();
          this.router.navigate(["dashboards/listventes"]);
        },
        (error: any) => {
          console.error("Error updating vente:", error);
          // Handle error accordingly, e.g., show error message
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}


