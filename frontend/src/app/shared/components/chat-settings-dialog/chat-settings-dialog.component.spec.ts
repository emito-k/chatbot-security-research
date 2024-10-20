import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSettingsDialogComponent } from './chat-settings-dialog.component';

describe('ChatSettingsDialogComponent', () => {
  let component: ChatSettingsDialogComponent;
  let fixture: ComponentFixture<ChatSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSettingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
