import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CandidatesComponent} from "./candidates.component";
import {ManageCandidatesComponent} from "./manage-candidates/manage-candidates.component";
import {ListCandidatesComponent} from "./list-candidates/list-candidates.component";
import {EditComponent} from "./edit/edit.component";
import {ViewComponent} from "./view/view.component";


const routes: Routes = [
  {
    path: '', component: CandidatesComponent,
    children: [
      {path: '', component: ListCandidatesComponent},
      {path: 'add', component: ManageCandidatesComponent},
      {path: 'edit/:id', component: ManageCandidatesComponent},
      {path: 'view/:id', component: ViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule {
}
