import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fournisseurService } from 'app/service/fournisseur.service';

@Component({
  selector: 'app-addfournisseur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addfournisseur.component.html',
  styleUrls: ['./addfournisseur.component.scss'] // Change styleUrl to styleUrls
})
export class AddfournisseurComponent {
  constructor(
    private service: fournisseurService,
    private fb: FormBuilder,
   private router : Router
  ) {}
  fournisseurForm: FormGroup;
  ajoutAvecSucces: boolean = false;

  ngOnInit(): void {
    this.fournisseurForm = this.fb.group({
      nom: ['', [Validators.minLength(3), Validators.required]],
      adresse: ['', [Validators.minLength(3), Validators.required]],
      numero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Change to email validator
      type: ['', [Validators.required]]
    });
  }

  public addFournisseur() {
    console.log(this.fournisseurForm.controls);
    if (this.fournisseurForm.valid) {
      this.service
          .addFournisseur(this.fournisseurForm.value)
          .subscribe((data) => {
              console.log(data);
              this.ajoutAvecSucces = true;
              this.fournisseurForm.reset();
              this.router.navigate(["dashboards/listfournisseurs"]);
          });
    }
  }
}
