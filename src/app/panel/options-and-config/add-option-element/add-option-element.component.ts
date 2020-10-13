import { RefreshOptionsOrConfigService } from './../../../services/options-config/refresh-options-or-config.service';
import { ReverseOptionsService } from './../../../services/options-config/reverse-options.service';
import { DescOptionsService } from './../../../services/options-config/desc-options.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { group } from 'console';
import { OptionOrConfig } from 'src/app/services/options-config/refresh-options-or-config.service';
import { DescOptions } from 'src/app/models/desc-option';
import { ReverseOptions } from 'src/app/models/reverse-option';

@Component({
  selector: 'app-add-option-element',
  templateUrl: './add-option-element.component.html',
  styleUrls: ['./add-option-element.component.scss']
})
export class AddOptionElementComponent implements OnInit {

  @Output() emitClose: EventEmitter<any> = new EventEmitter()
  @Output() emitAdd: EventEmitter<any> = new EventEmitter()
  @Input() type: OptionOrConfig
  formData: FormGroup

  constructor(
    private fb: FormBuilder,
    private reverseOptionsService: ReverseOptionsService,
    private descOptionsService: DescOptionsService,
    private refreshOptionsOrConfigService: RefreshOptionsOrConfigService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formData = this.fb.group({
      name: ['', Validators.required]
    })
  }

  saveData() {
    if (this.formData.valid) {
      switch (this.type) {
        case OptionOrConfig.desc:
          let des: DescOptions = { ...{ tags: [] }, ...this.formData.value }
          this.descOptionsService.create(des).then(r => {
            this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.desc)
            this.emitClose.emit()
          })
          break
        case OptionOrConfig.reverse:
          let rev: ReverseOptions = { ...{ tags: [] }, ...this.formData.value }
          this.reverseOptionsService.create(rev).then(r => {
            this.refreshOptionsOrConfigService.makeRefresh(OptionOrConfig.desc)
            this.emitClose.emit()
          })
          break;
      }
    }
  }

  closeEdit() {
    this.emitClose.emit()
  }

}
