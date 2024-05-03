import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryPagination, InventoryProduct } from './produit.types';
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
  private _product: BehaviorSubject<InventoryProduct | null> = new BehaviorSubject(null);
  private _products: BehaviorSubject<InventoryProduct[] | null> = new BehaviorSubject(null);

  
  
  constructor(private _httpClient: HttpClient) {}
  url: string = "http://localhost:3000/produits";
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get pagination$(): Observable<InventoryPagination>
  {
      return this._pagination.asObservable();
  }

  /**
   * Getter for product
   */
  get product$(): Observable<InventoryProduct>
  {
      return this._product.asObservable();
  }

  /**
   * Getter for products
   */
  get products$(): Observable<InventoryProduct[]>
  {
      return this._products.asObservable();
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Get products
   *
   *
   * @param page
   * @param size
   * @param sort
   * @param order
   * @param search
   */
  getProducts(page: number = 0, size: number = 10, sort: string = 'nom', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
      Observable<{ pagination: InventoryPagination; produits: InventoryProduct[] }>
  {
    console.log('Fetching products...');
      return this._httpClient.get<{ produits: InventoryProduct[]; pagination: InventoryPagination }>(this.url + '/all', {
          params: {
              page: '' + page,
              size: '' + size,
              sort,
              order,
              search,
          },
      }).pipe(
          tap((response) =>
          {
            console.log('Products response:', response);
              this._pagination.next(response.pagination);
              this._products.next(response.produits);
          }),
      );
  }

  /**
   * Get product by id
   */
  getProductById(id: string): Observable<InventoryProduct>
  {
      return this._products.pipe(
          take(1),
          map((products) =>
          {
              // Find the product
              const product = products.find(item => item._id === id) || null;

              // Update the product
              this._product.next(product);

              // Return the product
              return product;
          }),
          switchMap((product) =>
          {
              if ( !product )
              {
                  return throwError('Could not found product with id of ' + id + '!');
              }

              return of(product);
          }),
      );
  }

  public getProduitById(_id: string) {
    return this._httpClient.get(`${this.url}/getProduitsbyid/${_id}`); 
  }

  /**
   * Create product
   */
  createProduct(): Observable<InventoryProduct>
  {
      return this.products$.pipe(
          take(1),
          switchMap(products => this._httpClient.post<InventoryProduct>(this.url + "/ajouter", {reference : "",
          nom : "",
          prix: 0,
          quantite : 0,
          categorie: "produit",
          image : "",
          offre : 0}).pipe(
              map((newProduct) =>
              {
                console.log(newProduct);
                  // Update the products with the new product
                  this._products.next([newProduct, ...products]);

                  // Return the new product
                  return newProduct;
              }),
          )),
      );
  }

  /**
   * Update product
   *
   * @param id
   * @param product
   */
  updateProduct(id: string, product: InventoryProduct): Observable<InventoryProduct>
  {
      return this.products$.pipe(
          take(1),
          switchMap(products => this._httpClient.patch<InventoryProduct>(`${this.url}/update/${id}`, 
              product
          ).pipe(
              map((updatedProduct) =>
              {
                  // Find the index of the updated product
                  const index = products.findIndex(item => item._id === id);

                  // Update the product
                  products[index] = updatedProduct;

                  // Update the products
                  this._products.next(products);

                  // Return the updated product
                  return updatedProduct;
              }),
              
          )),
      );
  }

  /**
   * Delete the product
   *
   * @param id
   */
  deleteProduct(id: string): Observable<boolean>
  {
    console.log(id);
      return this.products$.pipe(
          take(1),
          switchMap(products => this._httpClient.delete(`${this.url}/${id}`).pipe(
              map((isDeleted: boolean) =>
              {
                  // Find the index of the deleted product
                  const index = products.findIndex(item => item._id === id);

                  // Delete the product
                  products.splice(index, 1);

                  // Update the products
                  this._products.next(products);

                  // Return the deleted status
                  return isDeleted;
              }),
          )),
      );
  }

}
