import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigResolveService implements Resolve<AppConfig> {

  constructor(private appConfigService: AppConfigService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AppConfig | Observable<AppConfig> | Promise<AppConfig> {
    return this.appConfigService.getFirst()
  }
}
