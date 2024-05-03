import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ListProduitsComponent } from 'app/modules/admin/dashboards/list-produits/list-produits.component';
import { ProduitService } from 'app/modules/admin/dashboards/list-produits/produit.service';

export default [
    {
        path     : '',
        component: ListProduitsComponent,   
        resolve  : {
            data: () => inject(ProduitService).getData(),
        },
    },
] as Routes;
