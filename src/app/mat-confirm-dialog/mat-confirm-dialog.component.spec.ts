import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogComponent } from './mat-confirm-dialog.component';

describe('MatConfirmDialogComponent', () => {
  let component: MatConfirmDialogComponent;
  let fixture: ComponentFixture<MatConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatConfirmDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
