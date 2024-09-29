import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Ensure to use Angular Material if needed
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component'; // Assuming you have a form component for adding/editing products
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatConfirmDialogComponent } from '../../mat-confirm-dialog/mat-confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  isLoading = true;

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    );
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts(); // Refresh product list after dialog is closed
      }
    });
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts(); // Refresh product list after dialog is closed
      }
    });
  }

  deleteProduct(product: any): void {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this product?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            this.loadProducts(); // Refresh product list after deletion
          },
          (error: any) => {
            console.error('Error deleting product', error);
          }
        );
      }
    });
  }
}
