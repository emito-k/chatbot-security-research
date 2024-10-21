import { TestBed } from '@angular/core/testing';

import { ConversationSettingsService } from './conversation-settings.service';

describe('ConversationSettingsService', () => {
  let service: ConversationSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
