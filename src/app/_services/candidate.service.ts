import {Injectable} from '@angular/core';
import {Candidate, User} from "@app/_models";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private candidateSubject: BehaviorSubject<Candidate>;
  public candidate: Observable<Candidate>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.candidateSubject = new BehaviorSubject<Candidate>(JSON.parse(localStorage.getItem('candidate')));
    this.candidate = this.candidateSubject.asObservable();
  }

  public get candidateValue(): Candidate {
    return this.candidateSubject.value;
  }
  // tslint:disable-next-line:typedef
  create(candidate: any) {
    return this.http.post(`${environment.apiUrl}/candidates/`, candidate);
  }
  // tslint:disable-next-line:typedef
  getAll() {
    return this.http.get<Candidate[]>(`${environment.apiUrl}/candidates/`);
  }

  // tslint:disable-next-line:typedef
  getById(id: string) {
    return this.http.get<Candidate>(`${environment.apiUrl}/candidates/${id}/`);
  }

  // tslint:disable-next-line:typedef
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/candidates/${id}`, params)
      .pipe(map(x => {
        // tslint:disable-next-line:triple-equals
        if (id == this.candidateValue.id) {
          // update local storage
          const candidate = {...this.candidateValue, ...params};
          // localStorage.setItem('candidate', JSON.stringify(user));

          // publish updated user to subscribers
          this.candidateSubject.next(candidate);
        }
        return x;
      }));
  }

  // tslint:disable-next-line:typedef
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/candidates/${id}/`)
      .pipe(map(x => {
        return x;
      }));
  }
}
