import { MenuCategoryRefreshService } from './../../../services/menu/menu-category-refresh.service';
import { MenuElementService } from './../../../services/menu/menu-element.service';
import { MenuElement } from 'src/app/models/menu-element';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuCategory } from 'src/app/models/menu-category';

@Component({
  selector: 'app-add-free-element',
  templateUrl: './add-free-element.component.html',
  styleUrls: ['./add-free-element.component.scss']
})
export class AddFreeElementComponent implements OnInit {

  @Input() menuElements: MenuElement[]
  @Input() menuCategory: MenuCategory
  @Output() emitClose: EventEmitter<any> = new EventEmitter()

  constructor(
    private menuElementService: MenuElementService,
    private menuCategoryRefreshService: MenuCategoryRefreshService
  ) { }

  ngOnInit(): void {
  }

  addElement(item: MenuElement) {
    this.menuElementService.addElementToMenu(item, this.menuCategory.id).then(r => {
      this.menuCategoryRefreshService.refresh()
    })
  }

  closeEdit() {
    this.emitClose.emit()
  }

}
