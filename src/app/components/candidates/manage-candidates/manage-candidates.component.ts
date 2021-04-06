import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../_services/acount.service";
import {CandidateService} from "@app/_services/candidate.service";

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.css']
})
export class ManageCandidatesComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  fileSel: File = null;
  options = ['in_progress_application',
    'rejected_application',
    'new_application',
    'confirmed_application'];
  optionss = [
    {id: 'in_progress_application', value: 'in_progress_application'},
    {id: 'rejected_application', value: 'rejected_application'},
    {id: 'new_application', value: 'new_application'},
    {id: 'confirmed_application', value: 'confirmed_application'}];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private accountService: AccountService,
    private candidateService: CandidateService,
  ) {
  }

  ngOnInit() {
    // #chekiha
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      application_status: ['', Validators.required],
      curriculum_vitae: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.candidateService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
    // this.form = this.formBuilder.group.app({
    //   curriculum_vitae: ['']
    // });
  }

// convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCandidate();
    } else {
      this.updateCandidate();
    }
  }

// tslint:disable-next-line:typedef

  createCandidate() {
    const formData = new FormData();
    const aaa = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      phone_number: this.form.value.phone_number,
      application_status: this.form.value.application_status,
      curriculum_vitae: this.fileSel
    };

    Object.keys(aaa).forEach(key => formData.append(key, aaa[key]));


    // formData.append('curriculum_vitae', this.fileSel);
    // formData.append('curriculum_vitae', this.form.get('curriculum_vitae').value);
    // console.log(formData, 'FFFFFFFFFF')
    // this.form.curr
    // this.form.value.curriculum_vitae = formData;
    console.log('FORMAMAMA', this.form);
    console.log('F DATA ', formData);
    this.candidateService.create(formData)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success('User added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      });
  }


  updateCandidate() {
    const formData = new FormData();
    const aaa = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      phone_number: this.form.value.phone_number,
      application_status: this.form.value.application_status,
      curriculum_vitae: this.fileSel
    };

    Object.keys(aaa).forEach(key => formData.append(key, aaa[key]));
    this.candidateService.update(this.id, formData)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        error: error => {
          // this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onFileChange(event) {

    // this.form.setValue({curriculum_vitae: event.target.files});
    // this.form.value.curricurriculum_vitae = event.target.files[0];
    const files = event.target.files[0];
    this.fileSel = event.target.files[0] as File;
  }

}
