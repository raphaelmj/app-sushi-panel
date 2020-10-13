import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { ServicesModule } from '../services/services.module';
import { RedirectIfAuthGuard } from '../guards/redirect-if-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoginRoutingModule,
    NoopAnimationsModule,
    ServicesModule,
    RouterModule,
    ServicesModule,
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [RedirectIfAuthGuard],
})
export class LoginModule {}
