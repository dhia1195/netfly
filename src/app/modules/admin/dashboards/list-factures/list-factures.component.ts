import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import {  MatTableModule } from '@angular/material/table';
import {  NgApexchartsModule } from 'ng-apexcharts';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { UserService } from 'app/service/user.service';
import { forkJoin } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChatService } from '../../apps/chat/chat.service';
import { FactureService } from '../facture/facture.service';
import { ListeClientsService } from 'app/service/liste-clients.service';

@Component({
    selector: 'app-list-factures',
    standalone: true,
    providers: [
      DatePipe 
    ],
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
      HttpClientModule,    NgxChartsModule,
  
  ],
    templateUrl: './list-factures.component.html',
    styleUrl: './list-factures.component.scss'
  })
export class ListFacturesComponent {
    factures: any;
  searchTerm: string = '';
  pieChartData1: any[] = [];
  pieChartView: any[] = [600, 400];

  displayedColumns: string[] = ['customerOrSupplierId','total_amount','real_total_amount', 'facture_date', 'action'];
  dataSource = [];

  constructor(private factureService: FactureService, private clientService: ListeClientsService) {}

    ngOnInit(): void {
        this.factureService.getfactures().subscribe((data: any) => {
          this.factures = data.factures;
          this.dataSource = data.factures;

          for (const venteItem of this.dataSource) {
            this.clientService.getClientById(venteItem.customerOrSupplierId).subscribe(value => {
              venteItem.clientDetails = value;
              console.log(value);
            })
             
          }
          console.log(this.dataSource);
        });
      }
      
  deletefacture(facture: any) {
      console.log("Avant suppression - ID de la facture :", facture._id);
      
      const confirmation = window.confirm(
          "Êtes-vous sûr de vouloir supprimer cette facture ?"
      );
  
      if (confirmation) {
          // Call your service method to delete the reclamation
          this.factureService.deletefacture(facture._id).subscribe(() => {
              // After deletion, update the data source to reflect the changes
              this.dataSource = this.dataSource.filter(item => item._id !== facture._id);
              console.log("facture supprimée avec succès.");
          }, error => {
              console.error("Erreur lors de la suppression de la facture :", error);
          });
      }
  }  
        // Use forkJoin to wait for all observables to complete
    }    
    
    
  
