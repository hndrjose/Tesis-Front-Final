import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeractividadComponent } from './veractividad.component';

describe('VeractividadComponent', () => {
  let component: VeractividadComponent;
  let fixture: ComponentFixture<VeractividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeractividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeractividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
