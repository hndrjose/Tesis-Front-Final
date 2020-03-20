import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaproveeComponent } from './listaprovee.component';

describe('ListaproveeComponent', () => {
  let component: ListaproveeComponent;
  let fixture: ComponentFixture<ListaproveeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaproveeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaproveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
