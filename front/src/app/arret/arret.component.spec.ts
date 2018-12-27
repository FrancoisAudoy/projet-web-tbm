import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArretComponent } from './arret.component';

describe('ArretComponent', () => {
  let component: ArretComponent;
  let fixture: ComponentFixture<ArretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArretComponent],
      imports: [MatDialogModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
