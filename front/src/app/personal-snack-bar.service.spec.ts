import { TestBed } from '@angular/core/testing';

import { PersonalSnackBarService } from './personal-snack-bar.service';

describe('PersonalSnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonalSnackBarService = TestBed.get(PersonalSnackBarService);
    expect(service).toBeTruthy();
  });
});
