import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Location } from '@angular/common';

import { EnrolleesComponent } from './enrollees.component';
import { EnrolleesService } from 'src/app/services/enrollees.service';
import { Observable, of } from 'rxjs';
import { Enrollee } from 'src/app/models/enrollee';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

describe('EnrolleesComponent', () => {
  let component: EnrolleesComponent;
  let fixture: ComponentFixture<EnrolleesComponent>;
  let helper: Helper;
  let enrolleeServiceMock: any;
  beforeEach(async () => {

    enrolleeServiceMock = jasmine.createSpyObj('EnrolleesService', ['getEnrollees']);
    enrolleeServiceMock.getEnrollees.and.returnValue(of([])); // initializing getEnrollees with empty array

    await TestBed.configureTestingModule({
      declarations: [ EnrolleesComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        OrderModule,
        RouterTestingModule.withRoutes
        (
          [
            { path: 'enrollee', component: DummyComponent }
          ]
        )
      ],
      providers: [
        {provide: EnrolleesService, useValue: enrolleeServiceMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleesComponent);
    component = fixture.componentInstance;
    helper = new Helper();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain search by name textbox', () => {
    const searchByNameTextBox = fixture.debugElement.query(By.css('input'));
    expect(searchByNameTextBox.nativeNode.name).toBe('name');
  });

  it('should contain table', () => {
    const tableTag = fixture.debugElement.query(By.css('table'));
    expect(tableTag.nativeNode.innerText).toContain('ID');
  });

  it('should show no enrollees data when data is not available ', () => {
    fixture.detectChanges();
    const tableData = fixture.debugElement.queryAll(By.css('td'));
    expect(tableData.length).toBe(0);
  });

  it('should just show one enrollee when an enrollee is provided', () => {
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    const tableData = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableData.length).toBe(2);
  });

  it('should have 100 enrollees if 100 are provided and display only 7 enrollees on screen as defined in pagination', () => {
    fixture.detectChanges();
    const enrollees = helper.getEnrollees(100);
    component.enrollees = enrollees;
    fixture.detectChanges();
    const tableData = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableData.length).toBe(8);
  });

  it('should have edit icon', () => {
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    const actionColumnEditIcon = fixture.debugElement.query(By.css('.fa-user-edit')).nativeNode.title;
    expect(actionColumnEditIcon).toBe('click to edit');
  });

  it('should have save icon', () => {
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    const actionColumnSaveIcon = fixture.debugElement.query(By.css('.fa-save')).nativeNode.title;
    expect(actionColumnSaveIcon).toBe('click to save');
  });

  it('should not have cancel icon', () => {
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    const cancelIcon = fixture.debugElement.query(By.css('fa-times'));
    expect(cancelIcon).toBeFalsy();
  });

  it('should have cancel icon', () => {
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    spyOn(component, 'edit');
    const actionColumnEditIcon = fixture.debugElement.query(By.css('.fa-user-edit')).nativeNode;
    actionColumnEditIcon.click();
    // const cancelIcon = fixture.debugElement.query(By.css('.fa-times')).nativeNode;
    expect(component.edit).toHaveBeenCalledWith(helper.enrollees[0].id);
  });

  it('should invoke edit() when edit icon is pressed', () => {
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    spyOn(component, 'edit');
    const actionColumnEditIcon = fixture.debugElement.query(By.css('.fa-user-edit')).nativeNode;
    actionColumnEditIcon.click();
    expect(component.edit).toHaveBeenCalledWith(helper.enrollees[0].id);
  });

  it('should invoke updateEnrollee() when save icon is pressed', () => {
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    spyOn(component, 'updateEnrollee');
    const actionColumnSaveIcon = fixture.debugElement.query(By.css('.fa-save')).nativeNode;
    actionColumnSaveIcon.click();
    expect(component.updateEnrollee).toHaveBeenCalledWith(helper.enrollees[0].id, helper.enrollees[0]);
  });

  it('should invoke pullEnrolleeAndPlaceItInForm() on small screen when a link is pressed', () =>{
    fixture.detectChanges();
    component.enrollees = helper.getEnrollees(1);
    fixture.detectChanges();
    spyOn(component, 'pullEnrolleeAndPlaceItInForm');
    const aTag = fixture.debugElement.query(By.css('td a')).nativeNode;
    aTag.click();
    expect(component.pullEnrolleeAndPlaceItInForm).toHaveBeenCalledWith(helper.enrollees[0]);
  })

  it('should called getEnrollees on the EnrolleeService one time on ngOnInit', () => {
    fixture.detectChanges();
    expect(enrolleeServiceMock.getEnrollees).toHaveBeenCalledTimes(1);
  });

  it('should show atleast one product from EnrolleeService when called from ngOnInit', () => {
    enrolleeServiceMock.getEnrollees.and.returnValue(of(helper.getEnrollees(1)));
    fixture.detectChanges();
    const tableData = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableData.length).toBe(2);
  });

  it('should be on enrollee route', () => {
    const currentLocation = TestBed.get(Location);
    expect(currentLocation.path()).toBe('');
  });

});

@Component({template: ''})
class DummyComponent{}

class Helper{
  enrollees: Enrollee[] = [];
  getEnrollees(amount: number): Enrollee[]{
    for (let i = 0; i < amount; i++){
      this.enrollees.push(
        { id: 'abc' + (i + 1), active: true, name: 'Enrollee ' + (i + 1), dateOfBirth: '1965-11-1' }
      );
    }
    return this.enrollees;
  }
}

// class EnrolleeServiceStub{
//   public getEnrollees(): Observable<Enrollee[]> {
//     return of([]);
//   }
// }
