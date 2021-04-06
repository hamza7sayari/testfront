import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../_services/acount.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})

export class StartComponent {
  // tslint:disable-next-line:typedef
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }
}
