import { ProductDetailComponent } from './entities/product/components/product-detail/product-detail.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./core/home/home.component').then((c) => c.HomeComponent),
  },
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
  {
    path: 'cart',
    loadComponent: () =>
      import('./entities/cart/cart.component').then((c) => c.CartComponent),
  },
  {
    path: 'crud',
    loadComponent: () =>
      import('./entities/crud/crud.component').then((c) => c.CrudComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
