import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillistaComponent } from './fillista.component';

describe('FillistaComponent', () => {
  let component: FillistaComponent;
  let fixture: ComponentFixture<FillistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
