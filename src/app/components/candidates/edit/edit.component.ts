import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CandidateService} from "@app/_services/candidate.service";
import {Candidate} from "@app/_models";
import {first, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  private id: number;
  candidate: Candidate = null;
  results: Candidate[] = [];
  private sessionId;
  private testVariable: string;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    // const lastUrlSegment = this.route.parent.split('?')[0].split('/').pop()
    const url_id = this.route.params['_value'].id;

    console.log('uralos',);
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params.id;
    // });
    // console.log(this.id);
    this.candidateService.getById(String(url_id))
      .subscribe((c: Candidate) => {
        this.candidate = c;
        this.results.push(c);
        console.log('ddddds', c);
      });

    console.log('ddddddzdzs', this.results);
    console.log('candanca', this.candidate);
    console.log('candanca', this.results[0]);


    this.candidateService.getById('9').subscribe
    (
      () => console.log('success'),
      // tslint:disable-next-line:no-shadowed-variable
      (error) => console.log('error', error),
      () => {
        this.ngZone.run( () => {
          this.testVariable += '-bar';
        });
      }
    );


    const a = this.results.pop()
    console.log('ssassa', a)
    //
    // this.route.params.subscribe(params => {
    //
    //   this.id = params.id;
    // });
    // console.log('sessionId',this.id)
    // this.candidateService.getById(String(this.id))
    //   // .pipe(first())
    //   .subscribe((candidater) => this.candidate = candidater);
    // // console.log('ididi', this.id);
    // // console.log(this.route.pathFromRoot);
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params.id;
    // });
  }


}
