import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OffreService } from 'app/service/offre.service';
import { ProduitService } from 'app/service/produit.service';

@Component({
  selector: 'app-update-offre',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-offre.component.html',
  styleUrl: './update-offre.component.scss'
})
export class UpdateOffreComponent {
  offreForm: FormGroup;
  produitsList: any[] = [];
    constructor(
        private offreService: OffreService,
        private produitService:ProduitService,
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}
    _id: string;
    modifierAvecSucces: boolean = false;

    ngOnInit(): void {
      this.offreForm = this.fb.group({
        reduction: ['', Validators.required],
        condition: ['', Validators.required],
        dateD: ['', Validators.required],
        dateF: ['', Validators.required],
        produits: ['', Validators.required] // Add produits field to the form
      });
  
      this._id = this.activatedRoute.snapshot.params.id;
  
      this.offreService.getOffreById(this._id).subscribe((data: any) => {
        this.offreForm.patchValue({
          reduction: data.reduction,
          condition: data.condition,
          dateD: data.dateD,
          dateF: data.dateF,
          produits: data.produits // Patch the produits field with the corresponding data
        });
      });
  
      this.produitService.getAllProduits().subscribe((produits: any) => {
        this.produitsList = produits.produits;
      });
    }
  
    updateOffre(): void {
      if (this.offreForm.valid) {
        const offreData = this.offreForm.value;
        offreData._id = this._id;
  
        this.offreService.updateOffre(this._id, offreData).subscribe(
          (data: any) => {
            console.log("Update success:", data);
            this.modifierAvecSucces = true;
            this.offreForm.reset();
            this.router.navigate(["dashboards/listoffre"]);
          },
          (error: any) => {
            console.error("Error updating offre:", error);
          }
        );
      } else {
        // Form is invalid, handle accordingly
      }
    }
  }