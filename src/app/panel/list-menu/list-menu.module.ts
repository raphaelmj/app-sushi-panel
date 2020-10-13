import { PipesModule } from './../../pipes/pipes.module';
import { ToolsModule } from './../../tools/tools.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListMenuRoutingModule } from './list-menu-routing.module';
import { ListMenuComponent } from './list-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditMenuCategoryComponent } from './add-edit-menu-category/add-edit-menu-category.component';
import { ChangeOrderMenuCategoriesComponent } from './change-order-menu-categories/change-order-menu-categories.component';
import { AddFreeElementComponent } from './add-free-element/add-free-element.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';



@NgModule({
  declarations: [ListMenuComponent, AddEditMenuCategoryComponent, ChangeOrderMenuCategoriesComponent, AddFreeElementComponent],
  imports: [
    CommonModule,
    ListMenuRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule,
    ToolsModule,
    NgxMatColorPickerModule,
    PipesModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class ListMenuModule { }
