export interface InventoryFacture
{
    _id: string;
    customerOrSupplierId: string;
    salesOrPurchaseId: string;
    facture_date: Date;
    total_amount: number;
    real_total_amount: number;
    facture_type: Category;
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
    Sales = 'sales',
    Purchases = 'purchases'
  }