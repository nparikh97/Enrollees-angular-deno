import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEnrolleeComponent } from './search-enrollee.component';

describe('SearchEnrolleeComponent', () => {
  let component: SearchEnrolleeComponent;
  let fixture: ComponentFixture<SearchEnrolleeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEnrolleeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEnrolleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
