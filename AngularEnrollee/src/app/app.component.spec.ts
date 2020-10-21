import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyHomeComponent },
          { path: 'enrollee', component: DummyEnrolleeComponent },
          { path: 'search', component: DummySearchComponent }
        ])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.nav .nav-item').textContent).toContain('Home');
  });

  it('should take me to home route', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // tslint:disable-next-line: deprecation
    const location = TestBed.get(Location);
    const aTag = fixture.debugElement.queryAll(By.css('a'));
    const nativeATag: HTMLElement = aTag[1].nativeNode;
    nativeATag.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home');
    });
  });

  it('should take me on enrollee route', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // tslint:disable-next-line: deprecation
    const location = TestBed.get(Location);
    const aTag = fixture.debugElement.queryAll(By.css('a'));
    const nativeATag: HTMLElement = aTag[2].nativeNode;
    nativeATag.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/enrollee');
    });
  });

  it('should take me on search route', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // tslint:disable-next-line: deprecation
    const location = TestBed.get(Location);
    const aTag = fixture.debugElement.queryAll(By.css('a'));
    const nativeATag: HTMLElement = aTag[3].nativeNode;
    nativeATag.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/search');
    });
  });
});

@Component({template: ''})
class DummyHomeComponent{}

@Component({template: ''})
class DummyEnrolleeComponent{}

@Component({template: ''})
class DummySearchComponent{}
