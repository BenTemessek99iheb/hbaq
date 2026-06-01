import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Hbaq — Mediterranean Luxury'
  },
 /*   {
    path: 'collection',
    loadComponent: () =>
      import('./features/collection/collection.component').then(m => m.CollectionComponent),
    title: 'Collection — Carthage Studio'
  }, */
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product/product.component').then(m => m.ProductComponent),
  }, 
  { path: '**', redirectTo: '' }
];