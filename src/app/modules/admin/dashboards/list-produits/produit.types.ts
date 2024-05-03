export interface InventoryProduct
{
    _id: string;
    reference: string;
    nom: string;
    prix: number;
    quantite: number;
    image: string;
    categorie: string;
    offre: number;
    __v: number;
}

export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export enum Category {
    Service = 'service',
    Produit = 'produit'
  }
