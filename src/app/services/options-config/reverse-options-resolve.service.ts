import { ReverseOptionsService } from './reverse-options.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ReverseOptions } from '../../models/reverse-option';
@Injectable({
  providedIn: 'root'
})
export class ReverseOptionsResolveService implements Resolve<ReverseOptions[]> {

  constructor(private reverseOptionsService: ReverseOptionsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReverseOptions[] | Observable<ReverseOptions[]> | Promise<ReverseOptions[]> {
    return this.reverseOptionsService.getAll()
  }

}
