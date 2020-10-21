import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Enrollee } from '../../models/enrollee';
import { EnrolleesService } from '../../services/enrollees.service';

@Component({
  selector: 'app-enrollees',
  templateUrl: './enrollees.component.html',
  styleUrls: ['./enrollees.component.css'],
})

export class EnrolleesComponent implements OnInit {

/* **************************************Defining all variable******************************* */

  enrollees: Enrollee[]; // enrollees variable to store enrollees
  recordForm: FormGroup; // variable to build, get, and set the value of form
  showFormDiv = false; // to display form

  // inline form variable
  EditRowID: any = '';
  showEditButton = true;
  showXButton = false;

  // variable for search function
  input: any;

  // variables for sorting
  key = 'ID';
  reverse = false;

  // pagination variable
  totalRecords: number;
  page = 1;

  // active function variable
  allowParticuarEnrollee = true;
  members: Enrollee[];
  activeValue = '';
  assignBooleanValueToActive: boolean;
  paginationToShow = false;

  /* **************************************Constructor******************************* */

  constructor(
    private enrolleeService: EnrolleesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.enrolleeService.getEnrollees().
    subscribe((data) => {
      this.enrollees = data;
      this.totalRecords = data.length;
    });
    // getting data and assigning to enrollees
    this.buildFormControls();
  }

  // building reactive form
  // tslint:disable-next-line: typedef
  buildFormControls() {
    this.recordForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      dateOfBirth: [''],
      active: ['']
    });
  }

  // getting and setting values to the form
  // tslint:disable-next-line: typedef
  pullEnrolleeAndPlaceItInForm(enrollee: Enrollee) {
    this.showFormDiv = true;
    this.recordForm.get('id').setValue(enrollee.id);
    this.recordForm.get('name').setValue(enrollee.name);
    this.recordForm.get('dateOfBirth').setValue(enrollee.dateOfBirth);
    this.recordForm.get('active').setValue(enrollee.active);
  }

  // submiting and updating enrollee using submitThisEnrollee() from enrollee.component.serivce
  // tslint:disable-next-line: typedef
  submitEnrollee(id: string, name: string, active: boolean) {
    const foundEnrollee = this.enrollees.find((enrollee) => enrollee.id === id);
    if (foundEnrollee.id === id) {
      foundEnrollee.name = name;
      foundEnrollee.active = active;
    } else {
      alert('Please enter a valid details');
    }
  }

  // assigning data through put request
  // tslint:disable-next-line: typedef
  updateEnrollee(id: string, enrollee: Enrollee){
      if (enrollee.name.startsWith(' ') || enrollee.name === ''){
        if (enrollee.name === ''){
          this.EditRowID = id;
          alert('text-box is empty!');
        }else if (enrollee.name.startsWith('')){
          this.EditRowID = id;
          alert('You left a space in the beginning');
        }
      }else{
        this.EditRowID = '';
        this.enrolleeService.updateEnrollee(enrollee.id, enrollee).
        subscribe (res => {
          if (!!res && res.status){
            this.enrollees = res.data;
          }
        });
      }
    }

  // cancels and reset the form
  // tslint:disable-next-line: typedef
  cancelButton(){
      this.recordForm.reset();
      this.showFormDiv = false;
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
  // sorts ID and Name
  // tslint:disable-next-line: typedef
  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // allows inline editing disables edit button and enable cancel button
  // tslint:disable-next-line: typedef
  edit(val){
    this.EditRowID = val;
    this.showEditButton = false;
    this.showXButton = true;
  }

  // close inline editing enables edit button and disables cancel button
  // tslint:disable-next-line: typedef
  close(){
    this.showEditButton = true;
    this.showXButton = false;
    this.EditRowID = '';
  }

  // search an enrollee by name or ID
  // tslint:disable-next-line: typedef
  search(){
    this.allowParticuarEnrollee = true;
    if (this.input === ''){
      this.ngOnInit();
    }else{
      this.enrollees = this.enrollees.filter(enrollees => {
        const value = (enrollees.id.match(this.input)) || (enrollees.name.toLocaleLowerCase().match(this.input.toLocaleLowerCase()));
        return value;
      });
    }
  }

  // displays all members, active members, inactive members when been chosen by user through select tag
  // tslint:disable-next-line: typedef
  activeMembers(){
    this.activeValue = ((document.getElementById('activeMember') as HTMLInputElement).value);
    if (this.activeValue === 'Enrollees'){
      this.allowParticuarEnrollee = true;
    }else if (this.activeValue === 'Inactive'){
      this.assignBooleanValueToActive = false;
      this.members = this.enrollees.filter(enrollee => this.assignBooleanValueToActive === enrollee.active);
      this.allowParticuarEnrollee = false;
    }
    else if (this.activeValue === 'Active'){
      this.assignBooleanValueToActive = true;
      this.members = this.enrollees.filter(enrollee => this.assignBooleanValueToActive === enrollee.active);
      this.allowParticuarEnrollee = false;
    }
  }
}
