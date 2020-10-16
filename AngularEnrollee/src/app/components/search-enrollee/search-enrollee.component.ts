import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollee } from '../../models/enrollee';
import { EnrolleesService } from '../../services/enrollees.service';

@Component({
  selector: 'app-search-enrollee',
  templateUrl: './search-enrollee.component.html',
  styleUrls: ['./search-enrollee.component.css']
})
export class SearchEnrolleeComponent implements OnInit {

  enrollees: Enrollee[];
  particularEnrollee: Enrollee;
  searchForm: FormGroup;

  showEnrollees = true;
  members: Enrollee[];
  activeValue = '';
  assignBooleanValueToActive: boolean;

  allowParticuarEnrollee = false;
  showFormDiv = false;
  recordForm: FormGroup;

  totalRecords: number;
  page = 1;
  paginationToShow = false;

  constructor(private enrolleeService: EnrolleesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.enrolleeService.getEnrollees().subscribe((data) => {
      this.enrollees = data;
      this.totalRecords = data.length;
    });
    this.buildFormControls();
    this.buildFormControlsForSearchComponent();
  }

  // This builds a search form
  // tslint:disable-next-line: typedef
  buildFormControls() {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  // This builds a reactive form
  // tslint:disable-next-line: typedef
  buildFormControlsForSearchComponent() {
    this.recordForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      dateOfBirth: [''],
      active: ['']
    });
  }

  // getting and setting values in the form when clicked on enrollee ID
  // tslint:disable-next-line: typedef
  pullEnrolleeAndPlaceItInForm(enrollee: Enrollee) {
    this.showFormDiv = true;
    this.recordForm.get('id').setValue(enrollee.id);
    this.recordForm.get('name').setValue(enrollee.name);
    this.recordForm.get('dateOfBirth').setValue(enrollee.dateOfBirth);
    this.recordForm.get('active').setValue(enrollee.active);
  }

  // searching an enrollee through ID
  // tslint:disable-next-line: typedef
  searchEnrollees(id: string){
    this.enrolleeService.getEnrollee(id).subscribe((enrolleeData) => { this.particularEnrollee = enrolleeData; });
    this.allowParticuarEnrollee = true;
    return this.particularEnrollee;
  }

  // tslint:disable-next-line: typedef
  submitEnrollee(id: string, name: string, active: boolean) {
    const foundEnrollee = this.enrollees.find((enrollee) => enrollee.id === id);
    console.log(foundEnrollee);
    if (foundEnrollee.id === id) {
      foundEnrollee.name = name;
      foundEnrollee.active = active;
    } else {
      alert('Please enter a valid details');
    }
  }

  // assigning data through put request
  // tslint:disable-next-line: typedef
  updateEnrollee(id: string, enrollee: Enrollee) {
    if (enrollee.name.startsWith(' ') || enrollee.name === ''){
      if (enrollee.name === ''){
        alert('text-box is empty!');
      }else if (enrollee.name.startsWith('')){
        alert('You left a space in the beginning');
      }
    }else{
      this.enrolleeService.updateEnrollee(enrollee.id, enrollee).
      subscribe (res => {
        if (!!res && res.status){
          this.enrollees = res.data;
        }
      });
      window.location.reload();
    }
  }

  // resets forms
  // tslint:disable-next-line: typedef
  cancelForm(){
    this.recordForm.reset();
    this.showFormDiv = false;
  }

  // filters active/inactive members
  // tslint:disable-next-line: typedef
  activeMembers(){
    this.activeValue = ((document.getElementById('activeMember') as HTMLInputElement).value);
    if (this.activeValue === 'Inactive'){
      this.assignBooleanValueToActive = false;
      this.members = this.enrollees.filter(enrollee => this.assignBooleanValueToActive === enrollee.active);
    }
    else if (this.activeValue === 'Active'){
      this.assignBooleanValueToActive = true;
      this.members = this.enrollees.filter(enrollee => this.assignBooleanValueToActive === enrollee.active);
    }
    this.allowParticuarEnrollee = false;
    this.paginationToShow = true;
  }

  // sets value to true to displays form at the bottom
  // tslint:disable-next-line: typedef
  showEnrolleeForm(){
    this.showEnrollees = true;
  }

  // formats DOB in more readable format
  // tslint:disable-next-line: typedef
  formatedDOB(data: string){
    if (data !== undefined){
      const year = data.slice(0, 4);
      const month = data.slice(5, 7);
      const date = data.slice(8, 10);
      data = month + '/' + date + '/' + year;
    }
    return data;
  }
}
