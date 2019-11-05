import { TestBed } from '@angular/core/testing';

import { TeacherAuthGuardService } from './teacher-auth-guard.service';

describe('TeacherAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherAuthGuardService = TestBed.get(TeacherAuthGuardService);
    expect(service).toBeTruthy();
  });
});
