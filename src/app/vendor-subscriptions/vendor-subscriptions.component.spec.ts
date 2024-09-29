import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSubscriptionsComponent } from './vendor-subscriptions.component';

describe('VendorSubscriptionsComponent', () => {
  let component: VendorSubscriptionsComponent;
  let fixture: ComponentFixture<VendorSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorSubscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
