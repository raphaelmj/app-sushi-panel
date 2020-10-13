import { OptionOrConfig, RefreshOptionsOrConfigService } from './../../../services/options-config/refresh-options-or-config.service';
import { AppConfigService } from './../../../services/options-config/app-config.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfig } from 'src/app/models/app-config';

@Component({
  selector: 'app-app-config-edit',
  templateUrl: './app-config-edit.component.html',
  styleUrls: ['./app-config-edit.component.scss']
})
export class AppConfigEditComponent implements OnInit {

  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  @Input() appConfig: AppConfig
  formData: FormGroup

  constructor(
    private fb: FormBuilder,
    private appConfigService: AppConfigService,
    private refreshOptionsOrConfigService: RefreshOptionsOrConfigService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formData = this.fb.group({
      extraPrice: [this.appConfig.data.extraPrice, [Validators.required, Validators.pattern('[0-9]+')]],
      acc: this.createArray(this.appConfig.data.acc)
    })
  }

  createArray(acc: Array<{ name: string, icon: string }>): FormArray {
    var array = this.fb.array([])
    acc.map(ac => {
      array.push(this.fb.group({
        name: [ac.name, Validators.required],
        icon: [ac.icon]
      }))
    })
    return array
  }


  addAcc() {
    (this.formData.get('acc') as FormArray).push(this.fb.group({
      name: ['', Validators.required],
      icon: []
    }));
    this.formData.markAsUntouched()
  }


  removeAcc(i: number) {
    this.formData.get('acc')['controls'].splice(i, 1)
    this.formData.get('acc')['value'].splice(i, 1)
  }


  saveData() {
    if (this.formData.valid) {
      let app: AppConfig = { ...this.appConfig, ...{ data: this.formData.value } }
      this.appConfigService.update(app).then(r => {
        this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.config)
      })
    }
  }

  closeEdit() {
    this.emitClose.emit()
  }

}
