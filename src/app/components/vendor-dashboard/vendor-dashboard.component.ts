import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  menuItems: string[] = ['dashboard', 'sales', 'orders', 'customers', 'products'];
  sidebarVisible: boolean = true;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
  
  logout(): void {
    // Clear user session or token here
    // For example, localStorage.removeItem('userToken');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
