import { DescOptionsService } from './desc-options.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DescOptions } from '../../models/desc-option';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DescOptionsResolveService implements Resolve<DescOptions[]> {

  constructor(private descOptionsService: DescOptionsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DescOptions[] | Observable<DescOptions[]> | Promise<DescOptions[]> {
    return this.descOptionsService.getAll()
  }
}
