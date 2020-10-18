import { AppConfig } from 'src/app/models/app-config';
import { MenuCategory } from 'src/app/models/menu-category';
import { CartCategory } from './../../models/cart-category';
import { DescOptions } from 'src/app/models/desc-option';
import { ReverseOptions } from 'src/app/models/reverse-option';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserToken } from 'src/app/models/token-user';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.component.html',
  styleUrls: ['./order-menu.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class OrderMenuComponent implements OnInit {

  userToken: UserToken
  elementOptions: { desc: DescOptions[]; reverse: ReverseOptions[] };
  plusCartCategories: CartCategory[]
  menuElementsFull: MenuCategory[] = [];
  cartCategories: CartCategory[] = [];
  appConfig: AppConfig
  opened: boolean;
  selectedIndex: number = 0

  constructor(private activatedRoute: ActivatedRoute) {
    this.userToken = this.activatedRoute.snapshot.data["user"];
    this.elementOptions = this.activatedRoute.snapshot.data["options"];
    this.plusCartCategories = this.activatedRoute.snapshot.data["plusCartCategories"]
    this.cartCategories = this.activatedRoute.snapshot.data["cartCategories"];
    this.menuElementsFull = this.activatedRoute.snapshot.data["menuElements"];
    this.appConfig = this.activatedRoute.snapshot.data["config"];
  }

  changeMenuTab(i: number) {
    this.selectedIndex = i + 1
  }

  ngOnInit(): void {
  }

}
