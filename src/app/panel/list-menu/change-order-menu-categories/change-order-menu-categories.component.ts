import { MenuCategoryRefreshService } from './../../../services/menu/menu-category-refresh.service';
import { MenuCategoryService } from './../../../services/menu/menu-category.service';
import { MenuCategory } from './../../../models/menu-category';
import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-change-order-menu-categories',
  templateUrl: './change-order-menu-categories.component.html',
  styleUrls: ['./change-order-menu-categories.component.scss']
})
export class ChangeOrderMenuCategoriesComponent implements OnInit {

  @Input() menuCategories: MenuCategory[]
  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  sortable: Sortable

  constructor(@Inject(DOCUMENT) private document: Document, private menuCategoryService: MenuCategoryService, private menuCategoryRefreshService: MenuCategoryRefreshService) { }

  ngOnInit(): void {
    this.createSortable()
  }

  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sortP'), {

      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.menuCategories[evt.oldIndex];
        this.menuCategories.splice(evt.oldIndex, 1);
        this.menuCategories.splice(evt.newIndex, 0, element);
        this.changeOrder()
      }.bind(this)

    })
  }

  changeOrder() {
    this.menuCategoryService.changeOrder(this.menuCategories).then(r => {
      this.menuCategoryRefreshService.refresh()
    })
  }

  closeEdit() {
    this.emitClose.emit()
  }

}
