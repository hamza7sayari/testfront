import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../_services/acount.service";
import {first} from "rxjs/operators";
import {Candidate, User} from "@app/_models";
import {CandidateService} from "@app/_services/candidate.service";

@Component({
  selector: 'app-list-candidates',
  templateUrl: './list-candidates.component.html',
  styleUrls: ['./list-candidates.component.css']
})
export class ListCandidatesComponent implements OnInit {
  candidates: Candidate [];

  constructor(private candidateService: CandidateService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.candidateService.getAll()
      .pipe(first())
      .subscribe((candidate) => this.candidates = candidate);
  }

  // tslint:disable-next-line:typedef
  deleteCandidate(id: string) {
    const candidate = this.candidates.find(x => x.id === id);
    this.candidateService.delete(id)
      .pipe(first())
      .subscribe(() => this.candidates = this.candidates.filter(x => x.id !== id));
  }
}
