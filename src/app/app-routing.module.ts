import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "@app/components/home/home.component";
import {AuthorizationGuard} from '@app/_core/authorization.guard';


const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const candidatesModule = () => import('./components/candidates/candidate.module').then(x => x.CandidateModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthorizationGuard] },
  { path: 'candidates', loadChildren: candidatesModule, canActivate: [AuthorizationGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
