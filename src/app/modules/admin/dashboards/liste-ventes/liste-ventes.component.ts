import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ListeVentesService } from 'app/service/liste-ventes.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProduitService } from '../list-produits/produit.service';
import { forkJoin } from 'rxjs';
import { ListeClientsService } from 'app/service/liste-clients.service';

@Component({
  selector: 'app-liste-ventes',
  standalone: true,
  imports: [
    CommonModule,
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
    HttpClientModule,
],
  templateUrl: './liste-ventes.component.html',
  styleUrl: './liste-ventes.component.scss'
})
export class ListeVentesComponent {

  ventesList: any[];
  produitList: string[] = [];
  
  

  constructor(private ventesService: ListeVentesService
              ,private produitService:ProduitService
              ,private clientService:ListeClientsService,
            private router:Router) {}

  ngOnInit(): void {
    this.loadVentes();
  }
 

  loadVentes() {
    this.ventesService.getAllVentes()
    // .subscribe(response => {
    //   console.log(response)
    //   console.log("all vente work")
    //   if (Array.isArray(response)) {
    //     this.ventesList = response;
    //   } else {
    //     // If response is not an array, convert it to an array
    //     this.ventesList = [response];
    //   }
      
    
    //   console.log(this.ventesList);
      
    // }, error => {
    //   console.error('Failed to load ventes:', error);
    //   // Handle the error based on your application's needs
    // });
      .subscribe(response => {
        this.ventesList = response.ventes;


        for (const venteItem of this.ventesList) {
          const produitIds = venteItem.produits; // Get the array of product IDs
          const produitObservables: any[] = []; // Array to store observables for each product
          for (const produitId of produitIds) {
            this.produitService.getProduitById(produitId.id_produit).subscribe(value => {
              produitObservables.push({detail : value, quantite : produitId.quantite});
            })
          }
          this.clientService.getClientById(venteItem.clients).subscribe(value => {
            venteItem.clientDetails = value;
          })
          venteItem.produitDetails = produitObservables;        
        }
          console.log(this.ventesList)
      }, error => {
        console.error('Failed to load ventes:', error);
        // Handle the error based on your application's needs
      });

      
  }
  
  deleteVente(id: string) {
    this.ventesService.deleteVente(id).subscribe(
      (response) => {
        console.log('Vente deleted successfully:', response);
        // Refresh the client list after deletion
        this.loadVentes();
      },
      (error) => {
        console.error('Failed to delete Vente:', error);
        // Handle the error based on your application's needs
      }
    );
}
onSendEmail(clientid:string,vente:any)
{
  this.clientService.sendEmail(clientid).subscribe(()=>{
    console.log("sended success")
    this.router.navigate(['/dashboards/facture'], {
      queryParams: { id: vente._id, type: 'sales' }
    });

  },err =>{
    console.log(err);
  })
}


}
