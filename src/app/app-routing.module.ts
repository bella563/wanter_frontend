import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { VendorSubscriptionsComponent } from './vendor-subscriptions/vendor-subscriptions.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { TransactionsDetailComponent } from './transactions-detail/transactions-detail.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirection to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'home', component: LandingPageComponent },
  { 
    path: 'vendor-dashboard', 
    component: VendorDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/add', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
      { path: 'categories/:id', component: CategoriesDetailComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/add', component: AddOrderComponent }, // Add Order
      { path: 'orders/edit/:id', component: AddOrderComponent }, // Edit Order
      { path: 'orders/:id', component: OrderDetailComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transactions/:id', component: TransactionsDetailComponent },
      { path: 'vendor_subscriptions', component: VendorSubscriptionsComponent },
      { path: 'users', component: UserListComponent },
      { path: 'user/:id', component: UserDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
