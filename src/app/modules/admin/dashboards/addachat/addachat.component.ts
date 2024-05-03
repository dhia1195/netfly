import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AchatService } from 'app/service/achat.service';
import { fournisseurService } from 'app/service/fournisseur.service';

@Component({
  selector: 'app-addachat',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addachat.component.html',
  styleUrl: './addachat.component.scss'
})
export class AddachatComponent {

  constructor(
    private service: AchatService,
    private fb: FormBuilder,
   private router : Router,
   private fournService: fournisseurService
  ) {}
  achatForm: FormGroup;
  ajoutAvecSucces: boolean = false;
  listFourn: any[];
  fournisseurs: any[];

  ngOnInit(): void {
    this.fournService.getAllFournisseurs().subscribe({

      next:(data: any)=>{
      console.log(data)
      this.listFourn=data.fournisseurs
      }
    })
    this.initForm();
  }

  initForm() {
    this.achatForm = this.fb.group({
      article: [],
      quantity: [],
      prix_unitaire: [],
      date: [],
      paiement: [],
      fournIds: [] // Seul champ pour l'ID du client
    });
  }

  addAchat() {
    if (this.achatForm.valid) {
      this.service
          .addAchat(this.achatForm.value)
          .subscribe((data) => {
              console.log(data);
              this.ajoutAvecSucces = true;
              this.achatForm.reset();
              this.router.navigate(["dashboards/listachats"]);
          });
    }
  }

}
