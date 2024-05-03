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
import { ReclamationService } from 'app/service/reclamation.service';
import { FormsModule } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { UserService } from 'app/service/user.service';
import { forkJoin } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChatService } from '../../apps/chat/chat.service';

@Component({
    selector: 'app-list-reclamation',
    standalone: true,
    templateUrl: './list-reclamation.component.html',
    styleUrl: './list-reclamation.component.scss',
    providers: [
        DatePipe // Provide DatePipe here
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
        HttpClientModule,
        FormsModule, 
    
    NgxChartsModule,
   


    ],
})
export class ListReclamationComponent implements OnInit {
    reclamation: any;
    searchTerm: string = '';

    displayedColumns: string[] = ['title', 'description', 'date', 'user', 'action'];
    dataSource = [];
    pieChartData: any[] = [];
    pieChartView: any[] = [600, 400];

    constructor(private reclamationService: ReclamationService,private datePipe: DatePipe,private userService:UserService ,private chatService: ChatService,private router: Router) {}

    ngOnInit(): void {
        this.reclamationService.getAllReclamation().subscribe((data: any) => {
            this.reclamation = data;
            this.dataSource = data;
            console.log(data);
            this.calculatePieChartData();

            // Array to hold all observables for fetching product details
            const observables: any[] = [];
    
            for (const reclamation of this.reclamation) {
                if (reclamation.hasOwnProperty('user') && Array.isArray(reclamation.user) && reclamation.user.length > 0) {
                    const userId = reclamation.user[0];
                    // Push each observable to the observables array
                    observables.push(this.userService.getUserById(userId));
                }
            }
    
            // Use forkJoin to wait for all observables to complete
            forkJoin(observables).subscribe((userDataArray: any[]) => {
                let dataIndex = 0; // Index to track userDataArray
                for (const reclamation of this.reclamation) {
                    if (reclamation.hasOwnProperty('user') && Array.isArray(reclamation.user) && reclamation.user.length > 0) {
                        // Assign userData to usersdetails property of this.reclamation[d]
                        reclamation.usersdetails = userDataArray[dataIndex++];
                    }
                }
            });
        });
    }
    
    calculatePieChartData(): void {
        // Initialiser un objet pour stocker les statistiques
        const statistics: any = {};
    
        // Parcourir chaque réclamation
        this.reclamation.forEach((reclamation: any) => {
            // Vérifier si le titre de réclamation est déjà présent dans les statistiques
            if (statistics.hasOwnProperty(reclamation.title)) {
                // Incrémenter le nombre de réclamations pour ce titre de réclamation
                statistics[reclamation.title]++;
            } else {
                // Initialiser le nombre de réclamations pour ce titre de réclamation
                statistics[reclamation.title] = 1;
            }
        });
    
        // Convertir les statistiques en un tableau d'objets pour ngx-charts
        this.pieChartData = Object.keys(statistics).map((title: string) => ({
            name: title,
            value: statistics[title]
        }));
    }
    fetchChats() {
        this.chatService.getChats().subscribe(
          response => {
            console.log("Chat response:", response);
            // Ouvrir l'URL dans un nouvel onglet
            window.open('http://127.0.0.1:5000', '_blank');
          },
          error => {
            console.error("Error:", error);
          }
        );
      }
      
      
    
    get filteredreclamation() {
        if (this.reclamation)
            return this.reclamation.filter((element) => {
                const searchData =
                    `${element.title} ${element.description} ${element.date}`.toLowerCase();
                return searchData.includes(this.searchTerm.toLowerCase());
            });
        return [];
    }
    deleteReclamation(reclamation: any) {
        console.log("Avant suppression - ID de la réclamation :", reclamation._id);
        
        const confirmation = window.confirm(
            "Êtes-vous sûr de vouloir supprimer cette réclamation ?"
        );
    
        if (confirmation) {
            // Appeler la méthode de service pour supprimer la réclamation
            this.reclamationService.deleteReclamation(reclamation._id).subscribe(() => {
                // Après suppression, mettre à jour les réclamations à partir du service
                this.refreshReclamations();
                console.log("Réclamation supprimée avec succès.");
            }, error => {
                console.error("Erreur lors de la suppression de la réclamation :", error);
            });
        }
    }
    
    private updateUsersDetails() {
        // Array to hold all observables for fetching user details
        const observables: any[] = [];
    
        for (const reclamation of this.reclamation) {
            if (reclamation.hasOwnProperty('user') && Array.isArray(reclamation.user) && reclamation.user.length > 0) {
                const userId = reclamation.user[0];
                // Push each observable to the observables array
                observables.push(this.userService.getUserById(userId));
            }
        }
    
        // Use forkJoin to wait for all observables to complete
        forkJoin(observables).subscribe((userDataArray: any[]) => {
            let dataIndex = 0; // Index to track userDataArray
            for (const reclamation of this.reclamation) {
                if (reclamation.hasOwnProperty('user') && Array.isArray(reclamation.user) && reclamation.user.length > 0) {
                    // Assign userData to usersdetails property of this.reclamation[d]
                    reclamation.usersdetails = userDataArray[dataIndex++];
                }
            }
        });
    }private refreshReclamations() {
        this.reclamationService.getAllReclamation().subscribe((data: any) => {
            // Mettre à jour les données des réclamations et la source de données
            this.reclamation = data;
            this.dataSource = data;
            
            // Mettre à jour les détails des utilisateurs
            this.updateUsersDetails();
        });
    }
    
    generatePDF() {
        // Check if dataSource is empty
        if (!this.dataSource || this.dataSource.length === 0) {
          console.error('No data to generate PDF');
          return;
        }
      
        const documentDefinition = {
          content: [
            { text: 'Liste des Reclamation', style: 'header' }, // Add a header for the PDF content
            {
              // Table containing the reclamation data
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto'], // Adjust column widths as needed
                body: [
                  // Header row
                  ['title', 'description', 'date'],
                  // Data rows
                  ...this.dataSource.map(reclamation => [
                    reclamation.title,
                    reclamation.description,
                    this.datePipe.transform(reclamation.date, 'dd/MM/yyyy HH:mm:ss')
                   
                  ])
                ]
              }
            }
          ],
          styles: {
            header: {
                fontSize: 22,
                bold: true,
                margin: [0, 0, 0, 10], // Margin: [top, right, bottom, left]
                decoration: 'underline', // Add underline decoration
                color: '#333', // Dark gray color
            }
        }
        
        };
      
        // Open the PDF in a new tab
        pdfMake.createPdf(documentDefinition).open();
      }
      
    }    
    
    
  
