import { AddOptionElementComponent } from './add-option-element/add-option-element.component';
import { ChangeOptionsGroupOrderComponent } from './change-options-group-order/change-options-group-order.component';
import { AppConfigService } from './../../services/options-config/app-config.service';
import { ReverseOptionsService } from './../../services/options-config/reverse-options.service';
import { DescOptionsService } from './../../services/options-config/desc-options.service';
import { Subscription } from 'rxjs';
import { OptionOrConfig, RefreshOptionsOrConfigService } from './../../services/options-config/refresh-options-or-config.service';
import { DescOptions } from './../../models/desc-option';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Type } from '@angular/core';
import { ReverseOptions } from 'src/app/models/reverse-option';
import { AppConfig } from 'src/app/models/app-config';
import { AppConfigEditComponent } from './app-config-edit/app-config-edit.component';

@Component({
  selector: 'app-options-and-config',
  templateUrl: './options-and-config.component.html',
  styleUrls: ['./options-and-config.component.scss']
})
export class OptionsAndConfigComponent implements OnInit, OnDestroy {

  @ViewChild('temp', { read: ViewContainerRef }) temp: ViewContainerRef
  changeOR: ComponentRef<ChangeOptionsGroupOrderComponent>
  addOC: ComponentRef<AddOptionElementComponent>
  appConfigEditC: ComponentRef<AppConfigEditComponent>
  reverseOptions: ReverseOptions[]
  descOptions: DescOptions[]
  appConfig: AppConfig
  subRefresh: Subscription
  subDesc: Subscription
  subReverse: Subscription
  subConfig: Subscription
  optionOrConfig = OptionOrConfig

  constructor(
    private activatedRoute: ActivatedRoute,
    private refreshOptionsOrConfigService: RefreshOptionsOrConfigService,
    private descOptionsService: DescOptionsService,
    private reverseOptionsService: ReverseOptionsService,
    private appConfigService: AppConfigService,
    private cf: ComponentFactoryResolver
  ) {
    this.appConfig = this.activatedRoute.snapshot.data['appConfig']
    this.reverseOptions = this.activatedRoute.snapshot.data['reverseOptions']
    this.descOptions = this.activatedRoute.snapshot.data['descOptions']
  }


  ngOnInit(): void {
    this.makeSubRefresh()
  }

  makeSubRefresh() {
    this.subRefresh = this.refreshOptionsOrConfigService.subject$.subscribe((w: OptionOrConfig) => {
      switch (w) {
        case OptionOrConfig.desc:
          this.subDesc = this.descOptionsService.getAll().subscribe(d => {
            this.descOptions = d
          })
          break;
        case OptionOrConfig.reverse:
          this.subReverse = this.reverseOptionsService.getAll().subscribe(r => {
            this.reverseOptions = r
          })
          break;
        case OptionOrConfig.config:
          this.subConfig = this.appConfigService.getFirst().subscribe(c => {
            this.appConfig = c
          })
          break;
      }
    })
  }



  changeOrderStart(type: OptionOrConfig) {
    this.temp.clear()
    let pop = this.cf.resolveComponentFactory(<Type<ChangeOptionsGroupOrderComponent>>ChangeOptionsGroupOrderComponent)
    this.changeOR = this.temp.createComponent(pop)
    switch (type) {
      case OptionOrConfig.desc:
        this.changeOR.instance.elements = this.descOptions
        this.changeOR.instance.type = OptionOrConfig.desc
        break
      case OptionOrConfig.reverse:
        this.changeOR.instance.elements = this.reverseOptions
        this.changeOR.instance.type = OptionOrConfig.reverse
        break;
    }

    this.changeOR.instance.emitClose.subscribe(r => {
      this.changeOR.destroy()
    })
    this.changeOR.instance.emitChange.subscribe((data: { data: ReverseOptions[] | DescOptions[], type: OptionOrConfig }) => {

    })
  }


  addOptionsGroup(type: OptionOrConfig) {
    this.temp.clear()
    let add = this.cf.resolveComponentFactory(<Type<AddOptionElementComponent>>AddOptionElementComponent)
    this.addOC = this.temp.createComponent(add)
    switch (type) {
      case OptionOrConfig.desc:
        this.addOC.instance.type = OptionOrConfig.desc
        break
      case OptionOrConfig.reverse:
        this.addOC.instance.type = OptionOrConfig.reverse
        break;
    }
    this.addOC.instance.emitClose.subscribe(r => {
      this.addOC.destroy()
    })
  }


  openAppConfig() {
    this.temp.clear()
    let edit = this.cf.resolveComponentFactory(<Type<AppConfigEditComponent>>AppConfigEditComponent)
    this.appConfigEditC = this.temp.createComponent(edit)
    this.appConfigEditC.instance.appConfig = this.appConfig
    this.appConfigEditC.instance.emitClose.subscribe(e => {
      this.appConfigEditC.destroy()
    })
  }


  ngOnDestroy(): void {
    if (this.subRefresh)
      this.subRefresh.unsubscribe()
    if (this.subDesc)
      this.subDesc.unsubscribe()
    if (this.subReverse)
      this.subReverse.unsubscribe()
    if (this.subConfig)
      this.subConfig.unsubscribe()
  }

}
