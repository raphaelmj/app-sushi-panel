import { RefreshOptionsOrConfigService } from './../../../services/options-config/refresh-options-or-config.service';
import { DescOptionsService } from './../../../services/options-config/desc-options.service';
import { ReverseOptionsService } from './../../../services/options-config/reverse-options.service';
import { Sortable } from 'sortablejs';
import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { DescOptions } from 'src/app/models/desc-option';
import { ReverseOptions } from 'src/app/models/reverse-option';
import { OptionOrConfig } from 'src/app/services/options-config/refresh-options-or-config.service';

@Component({
  selector: 'app-change-options-group-order',
  templateUrl: './change-options-group-order.component.html',
  styleUrls: ['./change-options-group-order.component.scss']
})
export class ChangeOptionsGroupOrderComponent implements OnInit {

  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  @Output() emitChange: EventEmitter<{ data: ReverseOptions[] | DescOptions[], type: OptionOrConfig }> = new EventEmitter<{ data: ReverseOptions[] | DescOptions[], type: OptionOrConfig }>()
  @Input() elements: ReverseOptions[] | DescOptions[] = []
  @Input() type: OptionOrConfig
  sortable: Sortable

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private reverseOptionsService: ReverseOptionsService,
    private descOptionsService: DescOptionsService,
    private refreshOptionsOrConfigService: RefreshOptionsOrConfigService
  ) { }

  ngOnInit(): void {
    this.createSortable()
  }

  createSortable() {

    this.sortable = new Sortable(this.document.getElementById('sort'), {

      // Element dragging ended
      onEnd: function (/**Event*/evt) {
        // console.log(evt.oldIndex, evt.newIndex)
        var element = this.elements[evt.oldIndex];
        this.elements.splice(evt.oldIndex, 1);
        this.elements.splice(evt.newIndex, 0, element);
        this.changeOrder()
      }.bind(this)

    })
  }

  changeOrder() {
    switch (this.type) {
      case OptionOrConfig.desc:
        this.descOptionsService.updateOrder(this.elements).then(r => {
          this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.desc)
        })
        break
      case OptionOrConfig.reverse:
        this.reverseOptionsService.updateOrder(this.elements).then(r => {
          this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.reverse)
        })
        break;
    }
  }


  closeEdit() {
    this.emitClose.emit()
  }

}
