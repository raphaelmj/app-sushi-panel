import { MenuCategoryService } from './menu-category.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MenuCategory } from '../../models/menu-category';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryResolveService implements Resolve<MenuCategory[]> {

  constructor(private menuCategoryService: MenuCategoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MenuCategory[] | Observable<MenuCategory[]> | Promise<MenuCategory[]> {
    return this.menuCategoryService.getMenuFull()
  }
}
