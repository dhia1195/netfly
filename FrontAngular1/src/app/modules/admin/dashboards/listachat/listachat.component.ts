import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { AchatService } from 'app/service/achat.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { NgApexchartsModule } from 'ng-apexcharts';
import { fournisseurService } from 'app/service/fournisseur.service';

import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-listachat',
  standalone: true,
  animations     : fuseAnimations,
  imports: [CommonModule,
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
    MatFormFieldModule],
  templateUrl: './listachat.component.html',
  styleUrls: ['./listachat.component.scss']
})

export class ListachatComponent  {

  achatsList: any[];
  query: string = '';
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  isLoading: boolean = false;

  constructor(private service: AchatService 
    ,private serviceFournisseur: fournisseurService
    , private router:Router,private _formBuilder: UntypedFormBuilder,) {}

  ngOnInit(): void {
    this.loadAchat();
    
  }

  loadAchat() {
    this.service.getAllAchats()
      .subscribe(response => {
        this.achatsList = response.achat;
        console.log(this.achatsList)
      }, error => {
        console.error('Failed to load ventes:', error);
        // Handle the error based on your application's needs
      });
  }

  deleteAchat(id: string) {
    this.service.deleteAchat(id).subscribe(
      (response) => {
        console.log('Vente deleted successfully:', response);
        // Refresh the client list after deletion
        this.loadAchat();
      },
      (error) => {
        console.error('Failed to  delete Vente:', error);
        // Handle the error based on your application's needs
      }
    );
    }
    updateAchat(achat: any) {

      console.log('Navigating to:', `/updateAchat/${achat._id}`);
      this.router.navigate(['dashboards/updateAchat', achat._id]);
    }
    searchAchats(): void {
      if (this.query.trim() !== '') {
        this.service.searchAchats(this.query)
          .subscribe(
            (response: any) => {
              // Assuming the response contains an 'achats' array
              this.achatsList = response.achats; // Accessing the 'achats' array directly
            },
            (error) => {
              console.error('Error fetching data:', error);
            }
          );
      } else {
        // If the query is empty, reset the table data
        this.loadAchat();
      }
    }
    
  
}
