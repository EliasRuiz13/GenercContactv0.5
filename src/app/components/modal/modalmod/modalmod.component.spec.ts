import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmodComponent } from './modalmod.component';

describe('ModalmodComponent', () => {
  let component: ModalmodComponent;
  let fixture: ComponentFixture<ModalmodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
