import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';
import {  NgApexchartsModule } from 'ng-apexcharts';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { fournisseurService } from 'app/service/fournisseur.service';
@Component({
  selector: 'app-listefournisseur',
  standalone: true,
  imports: [  CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    NgApexchartsModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatProgressBarModule,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    HttpClientModule,],
  templateUrl: './listefournisseur.component.html',
  styleUrls: ['./listefournisseur.component.scss']
})
export class ListefournisseurComponent implements OnInit {
 
  fournisseurlist: any[] = []; // Définissez le type approprié pour votre dataSource
  // displayedColumns: string[] = ['nom', 'adresse', 'numero', 'email', 'type'];
 

  constructor(private service: fournisseurService,private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.service.getAllFournisseurs()
      .subscribe(response => {
        this.fournisseurlist = response.fournisseurs;
      }, error => {
        console.error('Failed to load clients:', error);
        // Handle the error based on your application's needs
      });
  }
  updateFournisseur(fournisseur: any) {

    console.log('Navigating to:', `/updateFournisseur/${fournisseur._id}`);
    this.router.navigate(['dashboards/updateFournisseur', fournisseur._id]);
  }


  deleteFournisseur(fournisseur: any) {
    console.log("Avant suppression - ID de la réclamation :", fournisseur._id);
    
    const confirmation = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette réclamation ?"
    );

    if (confirmation) {
        // Call your service method to delete the reclamation
        this.service.deleteFournisseur(fournisseur._id).subscribe(() => {
            // After deletion, update the data source to reflect the changes
            this.fournisseurlist = this.fournisseurlist.filter(item => item.id !== fournisseur._id);
            console.log("Réclamation supprimée avec succès.");
        }, error => {
            console.error("Erreur lors de la suppression de la réclamation :", error);
        });
    }
}
  

  
}
  