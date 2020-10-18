import { ConfigResolveService } from './../../services/options-config/config-resolve.service';
import { UserTokenResolveService } from './../../services/auth/user-token-resolve.service';
import { AllOrdersResolveService } from './../../services/orders/all-orders-resolve.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersBoardComponent } from './orders-board.component';

const routes: Routes = [
  { path: '', component: OrdersBoardComponent, outlet: 'blackContent', resolve: { ordersData: AllOrdersResolveService, user: UserTokenResolveService, config: ConfigResolveService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersBoardRoutingModule { }
