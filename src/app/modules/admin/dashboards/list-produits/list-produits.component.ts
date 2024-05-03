import { CommonModule } from '@angular/common';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { catchError, combineLatest, debounceTime, map, merge, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { ProduitService } from './produit.service';
import { InventoryPagination } from './produit.types';
import { InventoryProduct, Category } from './produit.types';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styles         : [
    `
        .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 160px 160px 96px;
                }
            }
            .image-upload {
            position: relative;
            display: inline-block;
            }

            .image-upload input[type="file"] {
            display: none;
            }

            .image-preview {
            width: 200px; /* Adjust as needed */
            height: 200px; /* Adjust as needed */
            border: 2px dashed #ccc;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            }

            .image-preview img {
            max-width: 100%;
            max-height: 100%;
}

            
    `,
],
encapsulation  : ViewEncapsulation.None,
changeDetection: ChangeDetectionStrategy.OnPush,
animations     : fuseAnimations,
standalone     : true,
imports        : [NgIf, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],
})
export class ListProduitsComponent implements OnInit, AfterViewInit, OnDestroy 
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

    products$: Observable<InventoryProduct[]>;
    categories = Object.values(Category);
    productCreated : any;
    

    ngUnsubscribe = new Subject();
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: any | null = null;
    selectedProductForm: UntypedFormGroup;
    tagsEditMode: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    errorMessage: string;
    noProductsFound: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _produitService: ProduitService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the selected product form
        this.selectedProductForm = this._formBuilder.group({
            _id               : [''],
            categorie         : [''],
            reference         : [''],
            nom             : ['', [Validators.required]],
            quantite            : [''],
            prix            : [''],
            offre            : [''],
            image        : [''],
        });

            // Your initialization logic here
            // For example, initializing pagination
            this._produitService.pagination$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((pagination: InventoryPagination) =>
        {
            // Update the pagination
            this.pagination = pagination;
            
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

        

        this.products$ = this._produitService.products$;
        
        this._produitService.getProducts(0, 10, 'nom', 'asc', '').subscribe();
        

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(100),
                switchMap((query) =>
                {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._produitService.getProducts(0, 10, 'nom', 'asc', query);
                }),
                map(() =>
                {
                    this.isLoading = false;
                }),
            )
            .subscribe();
    }

    //hello

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {        
        if (this.pagination == null){
            setTimeout(() => {
                this.paginatorFunction();
            }, 300);
        }
        else this.paginatorFunction();
       
    }

    paginatorFunction2() {
        setTimeout(() => {
            this.paginatorFunction();
        }, 50);
    }

     paginatorFunction () {
        if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'nom',
                start       : 'asc',
                disableClear: false,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() =>
                {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                startWith({}),
                switchMap(() =>
                {
                    this.closeDetails();
                    this.isLoading = true;
                    console.log(this._sort.active);
                    return this._produitService.getProducts(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() =>
                {
                    this.isLoading = false;
                }),
            ).subscribe();
        }
        this.noProductsFound = false;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(productId: string): void
    {
        // If the product is already selected...
        if ( this.selectedProduct && this.selectedProduct._id === productId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the product by id
        
        this._produitService.getProductById(productId)
            .subscribe((product) =>
            {
                // Set the selected product
                this.selectedProduct = product;

                // Fill the form
                this.selectedProductForm.patchValue(product);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedProduct = null;
    }

    /**
     * Create product
     */
    createProduct(): void
    {

        this._produitService.createProduct().subscribe((newProduct) =>
        {
            // Go to new product
            this.selectedProduct = newProduct;

            // Fill the form
            this.selectedProductForm.patchValue(newProduct);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void
    {

         const product = this.selectedProductForm.getRawValue();

        // Update the product on the server
        this._produitService.updateProduct(product._id, product).subscribe(() =>
        {   
            this.closeDetails();
            //this.showFlashMessage('success');
            this._produitService.getProducts(0, 10, 'name', 'asc','').subscribe();
        });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete product',
            message: 'Are you sure you want to remove this product? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) =>
        {
            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                // Get the product object
                    const product = this.selectedProductForm.getRawValue();
                    // Delete the product on the server
                    //console.log(product.id);
                    this._produitService.deleteProduct(product._id).subscribe(() =>
                    {
                        this._produitService.getProducts(0, 10, 'name', 'asc','').subscribe();
                        this.closeDetails();
                    });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() =>
        {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item._id || index;
    }

    handleTransitionFromNoProducts(): void {
        this.noProductsFound = true;
      }

      triggerFileInput(): void {
        // Programmatically trigger click event on the hidden file input
        this.fileInput.nativeElement.click();
      }

      handleImageUpload(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = reader.result as string;
            this.selectedProductForm.get('image').setValue(image);
            event.target.value = '';
            this._changeDetectorRef.markForCheck();
        };
    }
}
