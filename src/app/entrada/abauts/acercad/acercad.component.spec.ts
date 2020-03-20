import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercadComponent } from './acercad.component';

describe('AcercadComponent', () => {
  let component: AcercadComponent;
  let fixture: ComponentFixture<AcercadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
