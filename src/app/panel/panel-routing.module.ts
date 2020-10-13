import { RedirectIfNotauthGuard } from './../guards/redirect-if-notauth.guard';
import { PanelComponent } from './panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'list-menu',
    loadChildren: () =>
      import('./list-menu/list-menu.module').then((m) => m.ListMenuModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'menu-elements',
    loadChildren: () =>
      import('./menu-elements/menu-elements.module').then((m) => m.MenuElementsModule),
    canActivate: [RedirectIfNotauthGuard],
  },
  {
    path: 'options-and-config',
    loadChildren: () =>
      import('./options-and-config/options-and-config.module').then(m => m.OptionsAndConfigModule),
    canActivate: [RedirectIfNotauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule { }