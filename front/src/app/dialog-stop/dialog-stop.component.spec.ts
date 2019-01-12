import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStopComponent } from './dialog-stop.component';

describe('DialogStopComponent', () => {
  let component: DialogStopComponent;
  let fixture: ComponentFixture<DialogStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogStopComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
