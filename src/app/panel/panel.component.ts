import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserToken } from '../models/token-user';
import { UserPerm } from '../models/user';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  userToken: UserToken
  showIfSuper: boolean = false

  constructor(private activatedRoute: ActivatedRoute) {
    this.userToken = this.activatedRoute.snapshot.data['userToken']

  }

  ngOnInit(): void {
    if (this.userToken.permission == UserPerm.super) {
      this.showIfSuper = true
    } else {
      this.showIfSuper = false
    }
  }
}
