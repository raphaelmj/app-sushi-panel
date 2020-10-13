import { element } from 'protractor';
import { ConfirmWindowComponent } from './../../tools/confirm-window/confirm-window.component';
import { AddFreeElementComponent } from './add-free-element/add-free-element.component';
import { MenuElementService } from './../../services/menu/menu-element.service';
import { ChangeOrderMenuCategoriesComponent } from './change-order-menu-categories/change-order-menu-categories.component';
import { MenuCategoryRefreshService } from './../../services/menu/menu-category-refresh.service';
import { MenuCategoryService } from './../../services/menu/menu-category.service';
import { AddEditMenuCategoryComponent } from './add-edit-menu-category/add-edit-menu-category.component';
import { MenuElement } from './../../models/menu-element';
import { MenuCategory } from './../../models/menu-category';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit, OnDestroy {

  @ViewChild('editTemp', { read: ViewContainerRef, static: true }) editTemp: ViewContainerRef
  editAddC: ComponentRef<AddEditMenuCategoryComponent>
  changeOrderC: ComponentRef<ChangeOrderMenuCategoriesComponent>
  freeElementsC: ComponentRef<AddFreeElementComponent>
  confirmC: ComponentRef<ConfirmWindowComponent>
  subRefresh: Subscription
  subCategories: Subscription
  subFree: Subscription

  menuCategories: MenuCategory[]
  freeElements: MenuElement[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private cf: ComponentFactoryResolver,
    private menuCategoryService: MenuCategoryService,
    private menuElementService: MenuElementService,
    private menuCategoryRefreshService: MenuCategoryRefreshService) {
    this.menuCategories = this.activatedRoute.snapshot.data['menuCategories']
    this.freeElements = this.activatedRoute.snapshot.data['freeElements']

  }

  ngOnInit(): void {
    this.subscribeRefresh()
  }

  subscribeRefresh() {
    this.subRefresh = this.menuCategoryRefreshService.action$.subscribe(bool => {
      if (bool) {
        this.subCategories = this.menuCategoryService.getMenuFull().subscribe(data => {
          this.menuCategories = data
        })
        this.subFree = this.menuElementService.getFreeElements().subscribe(data => {
          this.freeElements = data
          if (this.freeElementsC) {
            this.freeElementsC.instance.menuElements = this.freeElements
          }
        })
      }
    })
  }

  drop(event: CdkDragDrop<MenuCategory[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data['elements'], event.previousIndex, event.currentIndex);
      // console.log('saveInSide', event.container.data)
      this.menuElementService.changeElementsOrder(event.container.data['elements']).then(r => { })
    } else {
      transferArrayItem(event.previousContainer.data['elements'],
        event.container.data['elements'],
        event.previousIndex,
        event.currentIndex);
      this.menuElementService.changeElementsOrderAdd(event.container.data['elements'], event.container.data['id']).then(r => { })
    }
  }

  picDown(item: MenuElement) {
    this.menuElementService.freeElementFromMenuCategory(item).then(r => {
      this.menuCategoryRefreshService.refresh()
    })
  }

  addGroup() {
    this.editTemp.clear()
    let edit = this.cf.resolveComponentFactory(<Type<AddEditMenuCategoryComponent>>AddEditMenuCategoryComponent)
    this.editAddC = this.editTemp.createComponent(edit)
    this.editAddC.instance.isNew = true
    this.editAddC.instance.element = this.menuCategoryService.createEmpty()
    this.editAddC.instance.emitClose.subscribe(r => {
      this.editAddC.destroy()
    })
  }

  editGroup(mc: MenuCategory) {
    this.editTemp.clear()
    let edit = this.cf.resolveComponentFactory(<Type<AddEditMenuCategoryComponent>>AddEditMenuCategoryComponent)
    this.editAddC = this.editTemp.createComponent(edit)
    this.editAddC.instance.isNew = false
    this.editAddC.instance.element = mc
    this.editAddC.instance.emitClose.subscribe(r => {
      this.editAddC.destroy()
    })
  }

  changeOrder() {
    this.editTemp.clear()
    let edit = this.cf.resolveComponentFactory(<Type<ChangeOrderMenuCategoriesComponent>>ChangeOrderMenuCategoriesComponent)
    this.changeOrderC = this.editTemp.createComponent(edit)
    this.changeOrderC.instance.menuCategories = this.menuCategories
    this.changeOrderC.instance.emitClose.subscribe(r => {
      this.changeOrderC.destroy()
    })
  }

  addFreeElement(mc: MenuCategory) {
    this.editTemp.clear()
    let edit = this.cf.resolveComponentFactory(<Type<AddFreeElementComponent>>AddFreeElementComponent)
    this.freeElementsC = this.editTemp.createComponent(edit)
    this.freeElementsC.instance.menuElements = this.freeElements
    this.freeElementsC.instance.menuCategory = mc
    this.freeElementsC.instance.emitClose.subscribe(r => {
      this.freeElementsC.destroy()
    })
  }

  removeMenuCategory(mc: MenuCategory) {
    this.editTemp.clear()
    let confirm = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmC = this.editTemp.createComponent<ConfirmWindowComponent>(confirm)
    this.confirmC.instance.showConfirm = true
    this.confirmC.instance.bundleData = mc
    this.confirmC.instance.message = 'Czy checesz usunąć element?'
    this.confirmC.instance.emitActionConfirm.subscribe(r => {

      if (r.do) {
        this.confirmC.destroy()
        this.removeMC(r.bundleData)
      } else {
        this.confirmC.destroy()
      }
    })
  }

  removeMC(mc: MenuCategory) {
    this.menuCategoryService.delete(mc.id).then(r => {
      this.menuCategoryRefreshService.refresh()
    })
  }

  ngOnDestroy(): void {
    if (this.subRefresh)
      this.subRefresh.unsubscribe()
    if (this.subCategories)
      this.subCategories.unsubscribe()
    if (this.subFree)
      this.subFree.unsubscribe()
  }


}
