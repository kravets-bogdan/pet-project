// * Base
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// * Components
import AdminComponent from './admin.component';

// * Shared
import AuthGuard from '../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component'),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/admin-main/admin-main.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'product/:id/update',
        loadComponent: () => import('./components/update/update.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        loadComponent: () => import('./components/create/create.component'),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AdminRoutingModule {}
