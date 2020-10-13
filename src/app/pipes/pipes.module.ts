import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTypeNamePipe } from './menu-type-name.pipe';
import { MenuOptionTypeNamePipe } from './menu-option-type-name.pipe';



@NgModule({
  declarations: [MenuTypeNamePipe, MenuOptionTypeNamePipe],
  imports: [
    CommonModule
  ],
  exports: [
    MenuTypeNamePipe,
    MenuOptionTypeNamePipe
  ]
})
export class PipesModule { }
