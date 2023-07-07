// * Base
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import BaseRoutingModule from './base-routing.module';
import { NgModule } from '@angular/core';

// * Components
import BaseComponent from './base.component';

@NgModule({
  imports: [ReactiveFormsModule, BaseRoutingModule, BaseComponent, FormsModule],
})
export default class BaseModule {}
