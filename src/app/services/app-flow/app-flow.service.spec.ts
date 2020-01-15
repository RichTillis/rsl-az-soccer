import { TestBed } from '@angular/core/testing';

import { AppFlowService } from './app-flow.service';

describe('AppFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppFlowService = TestBed.get(AppFlowService);
    expect(service).toBeTruthy();
  });
});
