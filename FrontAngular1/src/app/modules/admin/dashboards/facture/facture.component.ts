import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListeVentesService } from 'app/service/liste-ventes.service';
import { ProduitService } from '../list-produits/produit.service';
import { ListeClientsService } from 'app/service/liste-clients.service';
import { OffreService } from 'app/service/offre.service';
import { FactureService } from './facture.service';

import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facture.component.html',
})
export class FactureComponent implements AfterViewInit {
  vente: any;
  id: string;
  type: string;
  produits: any[] = [];
  total: number = 0;
  real_total_amount = 0;
  dateV: Date;
  clientDetails: any;
  offre: number = 0;
  facture: any;
  nom: string = "";
  prenom: string = "";
  adresse: string = "";
  numrTel: string = "";
  email: string = "";
  verify: boolean = true;
  factures:any;
  purcentage: number = 0;

  constructor(private route: ActivatedRoute,
    private venteService: ListeVentesService,
    private produitService: ProduitService,
    private clientService: ListeClientsService,
    private offreService: OffreService,
    private factureService: FactureService) { }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];

      this.venteService.getVenteById(params['id']).subscribe(value => {
        this.vente = value;
        this.clientService.getClientById(this.vente.clients).subscribe(client => {
          this.clientDetails = client;
          this.nom = this.clientDetails.nom;
          this.prenom = this.clientDetails.prenom;
          this.adresse = this.clientDetails.adresse;
          this.numrTel = this.clientDetails.numrTel;
          this.email = this.clientDetails.email;

          this.dateV = new Date();

          this.vente.produits.forEach(produit => {
            this.offreService.getAllOffre().subscribe((data: any) => {
              for (const offreItem of data) {
                if (offreItem.produits.find((p: any) => p === produit.id_produit) && offreItem.condition <= produit.quantite) {
                  this.offre = offreItem.reduction;
                }
              }
              this.produitService.getProduitById(produit.id_produit).subscribe((p: any) => {
                const total = p.prix * produit.quantite;
                this.total += total;
                this.real_total_amount = this.total;
                this.produits.push({ soldProduct: p, quantity: produit.quantite, total: total });
                if (this.offre != 0) {
                  this.real_total_amount = (this.total * (100 - this.offre)) / 100;
                  this.purcentage = this.offre;
                }
                if (this.clientDetails && this.clientDetails._id) {
                  console.log("hello");
                } else {
                  console.error("Client details not available.");
                }

                this.factureService.getfactures().subscribe((data: any) => {
                  this.factures = data;
                  for (const facture of data.factures) {
                    console.log(facture.salesOrPurchaseId,this.id)
                    if (facture.salesOrPurchaseId === this.id){
                      this.verify = false;
                    } 
                  }
                    if (this.verify) {
                      this.factureService.createfacture({
                        customerOrSupplierId: this.clientDetails._id,
                        salesOrPurchaseId: this.id,
                        facture_date: this.dateV,
                        total_amount: this.total,
                        real_total_amount: this.real_total_amount,
                        facture_type: this.type
                      }).subscribe((data) => {
                        console.log(data);
                      });
                    }
                })
              })
            })
          })
        });
      });
    });
  }

  ngAfterViewInit(): void {

  }

  generatePDF() {
    const element = document.getElementById('invoice-content'); // Assuming your content is inside a div with id 'invoice-content'
    const opt = {
      margin:       1,
      filename:     'invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().from(element).set(opt).save();
  }

  //hello
}
