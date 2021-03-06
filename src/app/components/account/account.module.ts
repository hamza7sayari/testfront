import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AccountRoutingModule} from './account-routing.module';
import {StartComponent} from './start/start.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    StartComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AccountModule {}
