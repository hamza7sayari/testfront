import { Component, OnInit } from '@angular/core';
import {User} from '../../_models';
import {AccountService} from '../../_services/acount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
