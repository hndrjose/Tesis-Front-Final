import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilgaleryComponent } from './perfilgalery.component';

describe('PerfilgaleryComponent', () => {
  let component: PerfilgaleryComponent;
  let fixture: ComponentFixture<PerfilgaleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilgaleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilgaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
