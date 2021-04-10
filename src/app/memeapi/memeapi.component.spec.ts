import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeapiComponent } from './memeapi.component';

describe('MemeapiComponent', () => {
  let component: MemeapiComponent;
  let fixture: ComponentFixture<MemeapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
