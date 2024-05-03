import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryPagination, InventoryFacture } from '../list-factures/facture.types';
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
  private _facture: BehaviorSubject<InventoryFacture | null> = new BehaviorSubject(null);
  private _factures: BehaviorSubject<InventoryFacture[] | null> = new BehaviorSubject(null);

  
  
  constructor(private _httpClient: HttpClient) {}
  url: string = "http://localhost:3000/factures";
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get pagination$(): Observable<InventoryPagination>
  {
      return this._pagination.asObservable();
  }

  /**
   * Getter for facture
   */
  get facture$(): Observable<InventoryFacture>
  {
      return this._facture.asObservable();
  }

  /**
   * Getter for factures
   */
  get factures$(): Observable<InventoryFacture[]>
  {
      return this._factures.asObservable();
  }



  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Get factures
   *
   *
   * @param page
   * @param size
   * @param sort
   * @param order
   * @param search
   */
  getfactures(page: number = 0, size: number = 10, sort: string = 'nom', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
      Observable<{ pagination: InventoryPagination; produits: InventoryFacture[] }>
  {
    console.log('Fetching factures...');
      return this._httpClient.get<{ produits: InventoryFacture[]; pagination: InventoryPagination }>(this.url + '/getall', {
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
            console.log('factures response:', response);
              this._pagination.next(response.pagination);
              this._factures.next(response.produits);
          }),
      );
  }

  /**
   * Get facture by id
   */
  getfactureById(id: string): Observable<InventoryFacture>
  {
      return this._factures.pipe(
          take(1),
          map((factures) =>
          {
              // Find the facture
              const facture = factures.find(item => item._id === id) || null;

              // Update the facture
              this._facture.next(facture);

              // Return the facture
              return facture;
          }),
          switchMap((facture) =>
          {
              if ( !facture )
              {
                  return throwError('Could not found facture with id of ' + id + '!');
              }

              return of(facture);
          }),
      );
  }

  public getProduitById(_id: string) {
    return this._httpClient.get(`${this.url}/getProduitsbyid/${_id}`); 
  }

  /**
   * Create facture
   */
  createfacture(facture: any)
  {
    return this._httpClient.post(this.url + "/ajouter", facture)
  }

  /**
   * Update facture
   *
   * @param id
   * @param facture
   */
  updatefacture(id: string, facture: InventoryFacture): Observable<InventoryFacture>
  {
      return this.factures$.pipe(
          take(1),
          switchMap(factures => this._httpClient.patch<InventoryFacture>(`${this.url}/update/${id}`, 
              facture
          ).pipe(
              map((updatedfacture) =>
              {
                  // Find the index of the updated facture
                  const index = factures.findIndex(item => item._id === id);

                  // Update the facture
                  factures[index] = updatedfacture;

                  // Update the factures
                  this._factures.next(factures);

                  // Return the updated facture
                  return updatedfacture;
              }),
              
          )),
      );
  }

  /**
   * Delete the facture
   *
   * @param id
   */
  deletefacture(id: string){
    return this._httpClient.delete(`${this.url}/delete/${id}`).pipe(
        catchError((error: any) => {
            console.error('Error deleting offre:', error);
            return throwError('Something went wrong while deleting offre.');
        })
    );
}
}
