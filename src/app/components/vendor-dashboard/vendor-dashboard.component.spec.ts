import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class VendorDashboardComponent {
  menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];
  sidebarVisible = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
