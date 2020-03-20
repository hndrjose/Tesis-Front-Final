import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataclientComponent } from './dataclient.component';

describe('DataclientComponent', () => {
  let component: DataclientComponent;
  let fixture: ComponentFixture<DataclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
