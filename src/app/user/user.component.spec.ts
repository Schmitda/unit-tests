import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";
import {FormsModule} from "@angular/forms";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let dataService: DataService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UserComponent],
      providers: [
        UserService,
        DataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the username from the service', () => {
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("p").textContent).toContain(component.user.name);
  });

  it('shouldn\'t display the user name if user is not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("p").textContent).not.toContain(component.user.name);
  });

  it('shouldn\'t fetch data successfully if not called asyncrhonously', () => {
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve("Data"));
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });

  it('should fetch data successfully if called asynchronously', async(() => {
    let spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve("Data"));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe("Data");
    });
  }));

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    let fixture = TestBed.createComponent(UserComponent);
    let component = fixture.debugElement.componentInstance;
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('Data');
  }));

  it("firstname should be updates", fakeAsync(() => {
    let input = fixture.nativeElement.querySelector("input");
    expect(input.value).toBeFalsy();
    input.value = "Hello World";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    expect(input.value).toBe("Hello World");
    expect(input.value).toBe(component.user.firstname);
  }));

});
