import { ProductDetailComponent } from './entities/product/components/product-detail/product-detail.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import(
        './entities/product/components/product-list/product-list.component'
      ).then((c) => c.ProductListComponent),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () =>
      import(
        './entities/product/components/product-detail/product-detail.component'
      ).then((c) => c.ProductDetailComponent),
  },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
];
