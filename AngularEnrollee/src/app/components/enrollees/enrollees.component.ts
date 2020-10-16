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

  enrollees: Enrollee[]; // enrollees variable to store enrollees
  recordForm: FormGroup; // variable to build, get, and set the value of form
  showFormDiv = false; // to display form

  // inline form variable
  EditRowID: any = '';
  showEditButton = true;
  showXButton = false;


  // variables for sorting
  key = 'ID';
  reverse = false;

  // pagination variable
  totalRecords: number;
  page = 1;

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
      // this.showForm = false;
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
        // const foundEnrollee = this.enrollees.find((enrollee) => enrollee.id === id);
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

  // tslint:disable-next-line: typedef
  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  edit(val){
    this.EditRowID = val;
    this.showEditButton = false;
    this.showXButton = true;
  }
  close(){
    this.showEditButton = true;
    this.showXButton = false;
    this.EditRowID = '';
  }

  // printStatus(data: boolean){
  //   if (data === true){
  //     return '<img style="color:red;" src="../../../assets/camera_test.png" alt="active-icon"> Active';
  //   }else if (data === false ){
  //     return '<img class="iconImg" src="../../../assets/cross-script.png" alt="active-icon" title="Inactive"> Inactive';
  //   }
  // }
}
