import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderListComponent } from './components/order-list/order-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'home', component: LandingPageComponent },

    { 
        path: 'vendor-dashboard', 
        component: VendorDashboardComponent, 
      
        children: [

            { path: 'products', component: ProductListComponent },
            { path: 'products/:id', component: ProductDetailComponent },
            { path: 'orders', component: OrderListComponent },
            { path: 'transactions', component: TransactionsComponent },
            { path: 'customers', component: UserListComponent },
            { path: 'customers/:id', component: UserDetailComponent },
            { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
    },

    { path: '**', redirectTo: '/login' }

];
