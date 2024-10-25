import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderItemService } from '../services/order-item.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-order',
  standalone: true,
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class AddOrderComponent implements OnInit {
  order: any = {
    order_date: '',
    status: '',
    total_amount: null,
    stock_quantity: null,
    shipping_address: '',
    billing_address: '',
    user_id: null // Ajout de user_id
  };
  orderItems: any[] = [{ product_id: null, quantity: null, price: null }];
  products: any[] = [];
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'canceled', label: 'Canceled' }
  ];

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.isEditMode = true;
      this.loadOrder(orderId);
    }

    // Charger les produits
    this.loadProducts();
    
    // Récupérer l'ID de l'utilisateur connecté
    this.order.user_id = this.authService.getCurrentUserId(); // Assurez-vous que cette méthode existe
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadOrder(id: string) {
    this.orderService.getOrder(+id).subscribe(order => {
      this.order = order;
      // Charger les articles de commande si en mode édition
      this.loadOrderItems(id);
    });
  }

  loadOrderItems(orderId: string) {
    this.orderItemService.getOrderItemsByOrderId(orderId).subscribe(items => {
      this.orderItems = items;
    });
  }

  onSubmit() {
    // Formater la date pour l'envoi
    this.order.order_date = this.formatDate(this.order.order_date);

    // Ajouter l'ID du produit sélectionné
    this.orderItems = this.orderItems.map(item => ({
      ...item,
      product_id: item.product_id // Assurez-vous que product_id est défini correctement dans le formulaire
    }));

    console.log('Données envoyées :', {
      order: this.order,
      orderItems: this.orderItems
    });

    // Créer la commande
    this.orderService.createOrder(this.order).subscribe(
      (orderResponse) => {
        this.successMessage = 'Order created successfully!';
        
        // Créer les articles de commande
        this.orderItemService.createOrderItems(orderResponse.id, this.orderItems).subscribe(
          () => {
            this.successMessage += ' Order items created successfully!';
            this.redirectAfterSuccess();
          },
          error => {
            this.errorMessage = 'Error creating order items: ' + error.message;
            console.error('Error creating order items:', error);
          }
        );
      },
      error => {
        this.errorMessage = 'Error creating order: ' + error.message;
        console.error('Error creating order:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  redirectAfterSuccess() {
    setTimeout(() => {
      this.router.navigate(['/vendor-dashboard/orders']);
    }, 3000);
  }

  addItem() {
    this.orderItems.push({ product_id: null, quantity: null, price: null });
  }

  removeItem(index: number) {
    this.orderItems.splice(index, 1);
  }
}
