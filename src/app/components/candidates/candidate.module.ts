import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CandidateRoutingModule} from "./candidate-routing.module";
import {CandidatesComponent} from "./candidates.component";
import {ListCandidatesComponent} from "./list-candidates/list-candidates.component";
import {ManageCandidatesComponent} from "./manage-candidates/manage-candidates.component";
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    CandidatesComponent,
    ListCandidatesComponent,
    ManageCandidatesComponent,
    EditComponent,
    ViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CandidateRoutingModule
  ]
})
export class CandidateModule {
}
