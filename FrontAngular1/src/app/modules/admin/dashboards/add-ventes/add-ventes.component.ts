import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListeVentesService } from 'app/service/liste-ventes.service';
import { ProduitService } from '../list-produits/produit.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListeClientsService } from 'app/service/liste-clients.service';

@Component({
  selector: 'app-add-ventes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, NgMultiSelectDropDownModule],
  templateUrl: './add-ventes.component.html',
  styleUrl: './add-ventes.component.scss'
})
export class AddVentesComponent {
  addVenteForm: FormGroup;
  dropdownList = [];
  selectedClientId : any;
  dropdownSettings = {};
  produits = [];
  produitsList: any[];
  produitsControl: any[];
  clients: any[];
  selectedProductIds: any[] = [];
  ajoutAvecSucces: boolean = false;
  listClient: any[];
  constructor(private ventesService: ListeVentesService, private produitService: ProduitService, private fb: FormBuilder, private clientService: ListeClientsService) {}
  //produits = this.produitService.getProducts(0, 10, 'nom', 'asc', '');
  
  
  ngOnInit(): void {
    this.clientService.getAllCients().subscribe({

      next:(data: any)=>{
      this.listClient=data.clients
      }
    })
    this.initForm();
    this.produitService.getProducts(0, 10, 'nom', 'asc', '').subscribe((produits: any) => {
      this.produitsList = produits.produits;
      this.dropdownList = this.produitsList.map(product => {
        return { id: product._id, item_text: product.nom};
      });
      console.log(this.dropdownList)
    });


    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }
  
  
  initForm() {
    this.addVenteForm = this.fb.group({
      produits: new FormControl([]),
      dateV: ['', Validators.required],
      statut_paiement: [false, Validators.required],
      clients: ['', Validators.required] // Seul champ pour l'ID du client    });
    
    
    })
  }

  
  addVente() {
    if (this.addVenteForm.valid) {
      console.log("-------------------------",this.addVenteForm.value)
      console.log(this.selectedProductIds)
      console.log(this.addVenteForm.value)
      this.ventesService
      .ajouterVente(this.addVenteForm.value)
      .subscribe((data) => {
        console.log(data);

        this.ajoutAvecSucces = true;
        this.addVenteForm.reset();
      });
     }
  }

  // onItemSelect(event: any)
  //  {
  //   console.log(event)
  //   const selectedId = event.id;
  //   // event.quantite=0;
  //   this.selectedProductIds.push(event)
  //   console.log("produit id selected ",selectedId)
    // const selectedProduit = this.dropdownList.find(produit => produit._id === selectedId);
    // if (selectedProduit) {
    //   this.produitsSelection.push(selectedProduit._id);
    //   this.addVenteForm.patchValue({ produits: this.produitsSelection });
    //   this.addVenteForm.controls.produit.setValue(this.selectedProductIds)
    // }
  onItemSelect(item: any) {
    // Add the selected product ID to the selectedProducts array
   
    const selectedItem = this.dropdownList.find((dropdownItem: any) => dropdownItem.id === item.id);
    console.log(selectedItem)
    if (selectedItem) {
        this.selectedProductIds.push({ id_produit: item.id, item_text: item.item_text, quantite : 1 });
        const produitsWithoutItemText = this.selectedProductIds.map(product => ({ id_produit: product.id_produit, quantite: parseInt(product.quantite) }));
      this.addVenteForm.controls.produits.setValue(produitsWithoutItemText);
       console.log(this.addVenteForm.controls.produits.value)
    }
  }


  onItemDeSelect(item: any): void {
     console.log("item produit selcted",item)


    // const index = this.selectedProductIds.indexOf(item);
    // console.log(index)
    // if (index !== -1) {
    //   this.selectedProductIds.splice(index, 1);
    this.selectedProductIds=this.selectedProductIds.filter((s)=>s.id!==item.id)
     console.log(item)
    const index = this.selectedProductIds.indexOf(item.id);
    if (index !== -1) {
      this.selectedProductIds.splice(index, 1);
      this.addVenteForm.controls.produits.setValue(this.selectedProductIds);
    }
  }
  
  onSelectAll(items: any) {
    console.log(items);
    this.selectedProductIds=items
    this.addVenteForm.controls.produits.patchValue(items);
  }

  updateQuantity(productName: string, quantity: number) {
  //  const indexp= this.selectedProductIds.findIndex(p=>p.item_text === productName)
  //   if (indexp !== -1 ){
  //     console.log(this.selectedProductIds[indexp])
  //     this.selectedProductIds[indexp].quantite=quantity
  //   }
  console.log( "h",this.addVenteForm.controls.produits.value)
    const index = this.addVenteForm.controls.produits.value.findIndex(product =>{
      console.log(product.id)
      console.log(productName)
      return product.id === productName
    } );
  console.log(index)
 
  if (index !== -1) {
    
    
    const updatedProduits = [...this.addVenteForm.controls.produits.value];
    console.log(updatedProduits)
    
    updatedProduits[index].quantite = quantity;

    this.addVenteForm.controls.produits.patchValue(updatedProduits);
  }
  }
  onClientSelected(clientId: string) {
    this.selectedClientId = clientId;
  }
}