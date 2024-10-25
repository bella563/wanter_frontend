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
  menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];
  sidebarVisible = true;
  showChart = true; // Afficher le graphique par défaut

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    // Logique de déconnexion ici
    this.router.navigate(['/login']);
  }

  changeView(view: string) {
    if (view === 'dashboard') {
      this.showChart = true; // Afficher le graphique pour le tableau de bord
    } else {
      this.showChart = false; // Masquer le graphique pour les autres onglets
    }
  }
}
