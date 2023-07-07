// * Base
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// * Components
import BaseComponent from './base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./main/main.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./product/product.component'),
      },
      {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component'),
      },
      {
        path: 'form',
        loadComponent: () => import('./form/form.component'),
      },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BaseRoutingModule {}
