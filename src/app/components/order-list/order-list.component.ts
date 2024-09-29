
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [CommonModule, RouterModule] // Include RouterModule here
})
export class OrderListComponent implements OnInit {
  orders: any[] = []; // Array to hold the orders
  loading: boolean = true; // Flag to show loading state

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrders(); // Fetch orders on initialization
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data; // Assign fetched data to the orders array
        this.loading = false; // Hide loading state
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.loading = false; // Hide loading state even on error
      }
    );
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          this.orders = this.orders.filter(order => order.id !== id); // Remove deleted order from the array
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
}
