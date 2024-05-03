import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListeClientsService } from 'app/service/liste-clients.service';


@Component({
  selector: 'app-add-clients',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './add-clients.component.html',
  styleUrl: './add-clients.component.scss'
})
export class AddClientsComponent {

  clientsList: any[];
  addClientForm: FormGroup;
  

  constructor(private clientsService: ListeClientsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadClients();
    this.initForm();
  }

  initForm() {
    this.addClientForm = this.fb.group({
      
      
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        adresse: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        numrTel: ['', Validators.required],
    })
    
  }
  

  loadClients() {
    this.clientsService.getAllCients().subscribe(
      (response) => {
        this.clientsList = response.clients;
      },
      (error) => {
        console.error('Failed to load clients:', error);
        
      }
    );
  }

  addclient() {
    if (this.addClientForm.valid) {
      const formData = this.addClientForm.value;
      this.clientsService.ajouterClient(formData).subscribe(
        (response) => {
          console.log('Client added successfully:', response);
          // Refresh the list after adding the vente
          this.loadClients();
          // Reset the form
          this.addClientForm.reset();
        },
        (error) => {
          console.error('Failed to add client:', error);
          // Handle the error based on your application's needs
        }
      );
    }
  }
  
}

