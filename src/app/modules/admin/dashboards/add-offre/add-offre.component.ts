import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreService } from 'app/service/offre.service';
import { ProduitService } from '../list-produits/produit.service';

@Component({
  selector: 'app-add-offre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
   templateUrl: './add-offre.component.html',
  styleUrl: './add-offre.component.scss'
})
export class AddOffreComponent {
    produitsList: any[] = []; // Liste des produits
    offreForm: FormGroup;
    ajoutAvecSucces: boolean = false;
  
    constructor(
      private offreService: OffreService,
      private produitService: ProduitService,
      private fb: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.offreForm = this.fb.group({
        name: ['', [Validators.minLength(3), Validators.required]],
        reduction: ['', [Validators.minLength(1), Validators.required]],
        condition: ['', [Validators.minLength(1), Validators.required]],
        dateD: ['', [Validators.minLength(3), Validators.required]],
        dateF: ['', [Validators.minLength(3), Validators.required]],
        produits: ['', Validators.required],
      });
  
      // Chargez la liste des produits lors de l'initialisation du composant
      this.produitService.getProducts(0, 10, 'nom', 'asc', '').subscribe((produits: any) => {
        this.produitsList = produits.produits;
      });
    }
  
    public addOffre() {
      if (this.offreForm.valid) {
        this.offreService.addOffre(this.offreForm.value).subscribe((data) => {
          console.log(data);
          this.ajoutAvecSucces = true;
          this.offreForm.reset();
        });
      }
    }
  }

