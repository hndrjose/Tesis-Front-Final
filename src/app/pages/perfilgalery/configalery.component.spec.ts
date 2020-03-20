import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigaleryComponent } from './configalery.component';

describe('ConfigaleryComponent', () => {
  let component: ConfigaleryComponent;
  let fixture: ComponentFixture<ConfigaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigaleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
