import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  standalone: true,
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  imports: [
    CommonModule,
     FormsModule
    ]

})
export class AddOrderComponent implements OnInit {
  order: any = {
    user_id: null,
    order_date: '',
    status: '',
    total_amount: null,
    shipping_address: '',
    billing_address: ''
  };
  orderItems: any[] = [{ product_id: null, quantity: null, price: null }];
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.isEditMode = true;
      this.loadOrder(orderId);
    }
  }

  loadOrder(id: string) {
    this.orderService.getOrder(+id).subscribe(order => {
      this.order = order;
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.orderService.updateOrder(this.order.id, this.order).subscribe(
        () => {
          this.successMessage = 'Order updated successfully!';
          this.redirectAfterSuccess();
        },
        error => {
          this.errorMessage = 'Error updating order: ' + error.message;
        }
      );
    } else {
      this.orderService.createOrder(this.order).subscribe(
        () => {
          this.successMessage = 'Order created successfully!';
          this.redirectAfterSuccess();
        },
        error => {
          this.errorMessage = 'Error creating order: ' + error.message;
        }
      );
    }
  }

  redirectAfterSuccess() {
    setTimeout(() => {
      this.router.navigate(['/vendor-dashboard/orders']);
    }, 3000); // Redirection après 3 secondes
  }

  addItem() {
    this.orderItems.push({ product_id: null, quantity: null, price: null });
  }

  removeItem(index: number) {
    this.orderItems.splice(index, 1);
  }
}
