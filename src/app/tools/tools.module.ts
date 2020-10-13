import { MaterialModule } from './../shared/material.module';
import { ConfirmWindowComponent } from './confirm-window/confirm-window.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCollectionChangeComponent } from './order-collection-change/order-collection-change.component';



@NgModule({
  declarations: [ConfirmWindowComponent, OrderCollectionChangeComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ConfirmWindowComponent, OrderCollectionChangeComponent]
})
export class ToolsModule { }
