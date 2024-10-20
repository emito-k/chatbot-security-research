import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextDialogComponent } from './edit-text-dialog.component';

describe('EditTextDialogComponent', () => {
  let component: EditTextDialogComponent;
  let fixture: ComponentFixture<EditTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTextDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
