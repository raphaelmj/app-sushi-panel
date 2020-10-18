import { UserToken } from './../../models/token-user';
import { User } from '../../models/user';
import { UserService } from './../auth/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CartOrder } from '../../models/cart-order';
import { OrderService } from './order.service';
import { Observable } from 'rxjs';
import { OrderQueryParams } from '../../models/order-query-params';
import * as moment from "moment"

@Injectable({
  providedIn: 'root'
})
export class AllOrdersResolveService implements Resolve<{ orders: CartOrder[], total: number, qp: OrderQueryParams, reservations: number, archives: number, inProgress: number }> {

  constructor(private orderService: OrderService, private userService: UserService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ orders: CartOrder[], total: number, qp: OrderQueryParams, reservations: number, archives: number, inProgress: number }> {

    const user: UserToken | null = await this.userService.getCurrentUserTokenData().toPromise()
    var data: OrderQueryParams

    var d: Date = new Date()
    var dayString: string = moment(d).format("yy-MM-DD")

    if (route.queryParams['saveState'] == '1') {
      data = this.getParamsFree(route, dayString)
      return await this.orderService.getOrders(data).toPromise()
    }

    if (user) {

      switch (user.role) {

        case "admin":

          data = this.getParamsAdmin(route, dayString)

          break;

        case "waiter":
          data = this.getParamsWaiter(route, dayString)
          break;

        default:
          data = this.getParamsWaiter(route, dayString)
          break

      }

    } else {
      data = this.getParamsWaiter(route, dayString)
    }

    return await this.orderService.getOrders(data).toPromise()

  }


  getParamsAdmin(route: ActivatedRouteSnapshot, dayString: string): OrderQueryParams {
    let page = (route.queryParams['page']) ? route.queryParams['page'] : 1
    let sts = ''
    let day = (route.queryParams['day']) ? route.queryParams['day'] : dayString
    let paid: 'all' | '0' | '1' | 'none' = '0'
    let reservation: '0' | '1' | 'all' = '0'
    let inprogress: '0' | '1' | 'all' = '1'
    return { page, sts, day, paid, reservation, inprogress }
  }

  getParamsWaiter(route: ActivatedRouteSnapshot, dayString: string): OrderQueryParams {
    let page = (route.queryParams['page']) ? route.queryParams['page'] : 1
    let sts = (route.queryParams['sts']) ? route.queryParams['sts'] : 'create|ready'
    let day = (route.queryParams['day']) ? route.queryParams['day'] : dayString
    let paid: 'all' | '0' | '1' | 'none' = (route.queryParams['paid']) ? route.queryParams['paid'] : '0'
    let reservation: '0' | '1' | 'all' = (route.queryParams['reservation']) ? route.queryParams['reservation'] : 'all'
    let inprogress: '0' | '1' | 'all' = (route.queryParams['inprogress']) ? route.queryParams['inprogress'] : 'all'
    return { page, sts, day, paid, reservation, inprogress }
  }

  getParamsFree(route: ActivatedRouteSnapshot, dayString: string): OrderQueryParams {
    let page = (route.queryParams['page']) ? route.queryParams['page'] : 1
    let sts = (route.queryParams['sts']) ? route.queryParams['sts'] : 'create|ready'
    let day = (route.queryParams['day']) ? route.queryParams['day'] : dayString
    let paid: 'all' | '0' | '1' | 'none' = (route.queryParams['paid']) ? route.queryParams['paid'] : '0'
    let reservation: '0' | '1' | 'all' = (route.queryParams['reservation']) ? route.queryParams['reservation'] : '0'
    let inprogress: '0' | '1' | 'all' = (route.queryParams['inprogress']) ? route.queryParams['inprogress'] : 'all'
    return { page, sts, day, paid, reservation, inprogress }
  }

}
