import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { ListeClientsService } from 'app/service/liste-clients.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-list-clients',
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
    FormsModule,
    MatFormFieldModule,NgxChartsModule,
],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent {

  clientsList: any[];
  filteredClientsList: any[];
  searchTerm: string = '';
  query  : string ='';
  addressDistributionData: any[];
 
  pieChartView1: any[] = [600, 400];
  customColors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  constructor(private clientsService: ListeClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getAllCients()
      .subscribe(response => {
        this.clientsList = response.clients;
        this.prepareAddressDistributionData(); // Préparez les données pour la pie chart
      }, error => {
        console.error('Failed to load clients:', error);
      });
  }

  deleteClient(id: string) {
    this.clientsService.deleteClient(id).subscribe(
      (response) => {
        console.log('Client deleted successfully:', response);
        this.loadClients();
      },
      (error) => {
        console.error('Failed to delete client:', error);
      }
    );
  }

  searchClients(): void {
    if (this.query.trim() !== '') {
      this.clientsService.searchClient(this.query)
        .subscribe(
          (response: any) => {
            this.clientsList = response.clients;
            this.prepareAddressDistributionData();
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      this.loadClients();
    }
  }

  prepareAddressDistributionData(): void {
    const addressCountMap = new Map<string, number>();

    // Calculer la répartition des adresses des clients
    this.clientsList.forEach(client => {
      const address = client.adresse;
      console.log(address);
      if (addressCountMap.has(address)) {
        addressCountMap.set(address, addressCountMap.get(address) + 1);
      } else {
        addressCountMap.set(address, 1);
      }
    });

    // Convertir la carte en tableau d'objets avec les étiquettes et les valeurs appropriées
    this.addressDistributionData = Array.from(addressCountMap.entries())
      .map(([address, count]) => ({ name: address, value: count }));
  }
}

