import { ConfirmWindowComponent } from './../../../tools/confirm-window/confirm-window.component';
import { OptionOrConfig, RefreshOptionsOrConfigService } from './../../../services/options-config/refresh-options-or-config.service';
import { DescOptionsService } from './../../../services/options-config/desc-options.service';
import { DescOptions } from './../../../models/desc-option';
import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type } from '@angular/core';

@Component({
  selector: 'app-edit-desc',
  templateUrl: './edit-desc.component.html',
  styleUrls: ['./edit-desc.component.scss']
})
export class EditDescComponent implements OnInit {


  @ViewChild('temp', { read: ViewContainerRef }) temp: ViewContainerRef
  confirmC: ComponentRef<ConfirmWindowComponent>
  @Input() descOptions: DescOptions[] = []

  constructor(
    private descOptionsService: DescOptionsService,
    private refreshOptionsOrConfigService: RefreshOptionsOrConfigService,
    private cf: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {

  }

  changeData(event: { data: DescOptions, index: number }) {
    this.descOptionsService.updateOption(event.data).then(r => {
      this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.desc)
    })
  }


  remove(descOption: DescOptions) {
    this.temp.clear()
    let confirm = this.cf.resolveComponentFactory(<Type<ConfirmWindowComponent>>ConfirmWindowComponent)
    this.confirmC = this.temp.createComponent<ConfirmWindowComponent>(confirm)
    this.confirmC.instance.showConfirm = true
    this.confirmC.instance.bundleData = descOption
    this.confirmC.instance.message = 'Czy checesz usunąć element?'
    this.confirmC.instance.emitActionConfirm.subscribe(r => {

      if (r.do) {
        this.confirmC.destroy()
        this.descOptionsService.delete(r.bundleData.id).then(r => {
          this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.desc)
        })
      } else {
        this.confirmC.destroy()
      }
    })
  }

}
