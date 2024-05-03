import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AchatService } from 'app/service/achat.service';

@Component({
  selector: 'app-updateachat',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './updateachat.component.html',
  styleUrl: './updateachat.component.scss'
})
export class UpdateachatComponent {
  achatForm: any;
  constructor(
    private service: AchatService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  achatsForm: FormGroup;
  id: string;
  modifierAvecSucces: boolean = false;

  ngOnInit(): void {
    this.achatsForm = this.fb.group({
      article: new FormControl(),
      quantity: new FormControl(),
      prix_unitaire: new FormControl(),
      date: new FormControl(),
      paiement: new FormControl(),
      fournisseurId: new FormControl()



    });
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    
    this.service.getAchatById(this.id).subscribe((data) => {
      console.log(data);
      this.achatsForm.patchValue({ article: data["article"] });
      this.achatsForm.patchValue({ quantity: data["quantity"] });
      this.achatsForm.patchValue({ prix_unitaire: data["prix_unitaire"] });
      this.achatsForm.patchValue({ date: data["date"] });
      this.achatsForm.patchValue({ paiement: data["paiement"] });
      this.achatsForm.patchValue({ fournisseurId: data["fournisseurId"] });

      console.log("reclamation form here ", this.achatsForm.value);
    });
  }
   


  updateAchat(): void {
    if (this.achatsForm.valid) {
      const achatAchat = this.achatsForm.value;
      achatAchat.id = this.id; // Assuming _id is obtained and stored correctly
  
      this.service.updateAchat(this.id, achatAchat).subscribe(
        (data: any) => {
          console.log("Update success:", data);
          this.modifierAvecSucces = true;
          this.achatsForm.reset();
          this.router.navigate(["dashboards/listachats"]);
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
