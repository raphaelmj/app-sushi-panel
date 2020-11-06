import { ToolsModule } from './../../tools/tools.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsAndConfigRoutingModule } from './options-and-config-routing.module';
import { OptionsAndConfigComponent } from './options-and-config.component';
import { EditDescComponent } from './edit-desc/edit-desc.component';
import { EditReverseComponent } from './edit-reverse/edit-reverse.component';
import { DescDataFormComponent } from './edit-desc/desc-data-form/desc-data-form.component';
import { ReverseDataFormComponent } from './edit-reverse/reverse-data-form/reverse-data-form.component';
import { ChangeStringsOrderComponent } from './change-strings-order/change-strings-order.component';
import { ChangeOptionsGroupOrderComponent } from './change-options-group-order/change-options-group-order.component';
import { AddOptionElementComponent } from './add-option-element/add-option-element.component';
import { AppConfigEditComponent } from './app-config-edit/app-config-edit.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { UserOneEditComponent } from './users-admin/user-one-edit/user-one-edit.component';
import { StatusStatesSelectComponent } from './app-config-edit/status-states-select/status-states-select.component';


@NgModule({
  declarations: [OptionsAndConfigComponent, EditDescComponent, EditReverseComponent, DescDataFormComponent, ReverseDataFormComponent, ChangeStringsOrderComponent, ChangeOptionsGroupOrderComponent, AddOptionElementComponent, AppConfigEditComponent, UsersAdminComponent, UserOneEditComponent, StatusStatesSelectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    OptionsAndConfigRoutingModule,
    ToolsModule
  ]
})
export class OptionsAndConfigModule { }
