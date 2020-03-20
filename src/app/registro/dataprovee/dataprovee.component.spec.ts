import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataproveeComponent } from './dataprovee.component';

describe('DataproveeComponent', () => {
  let component: DataproveeComponent;
  let fixture: ComponentFixture<DataproveeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataproveeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataproveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
