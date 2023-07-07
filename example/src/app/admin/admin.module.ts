// * Base
import AdminRoutingModule from './admin-routing.module';
import { NgModule } from '@angular/core';

// * Components
import AdminComponent from './admin.component';

// * Service
import ProductService from '../service/product.service';
import AuthService from '../service/auth.service';

// * Shared
import AuthGuard from '../shared/auth.guard';

@NgModule({
  providers: [AuthService, AuthGuard, ProductService],
  imports: [AdminRoutingModule, AdminComponent],
})
export default class AdminModule {}
