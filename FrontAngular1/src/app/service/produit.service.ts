import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private _http: HttpClient) {}

  url: string = "http://localhost:3000/produits";

  public getAllProduits() {
    return this._http.get(this.url + "/getall"); 
  }

  public getProduitById(_id: string) {
    return this._http.get(`${this.url}/getbyid/${_id}`); 
  }
  public addProduits(produit: any) {
    return this._http.post(this.url + "ajouter", produit);
  }
}
