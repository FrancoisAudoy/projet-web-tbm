import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusComponent } from './dialog-bus.component';

describe('DialogBusComponent', () => {
  let component: DialogBusComponent;
  let fixture: ComponentFixture<DialogBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
