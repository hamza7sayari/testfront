import {Component} from '@angular/core';
import {User} from "./_models";
import {AccountService} from "./_services/acount.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  user: User;
  // tslint:disable-next-line:variable-name
  is_superuser = false;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }
}
