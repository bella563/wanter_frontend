import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  isEditing: boolean = false;
  notification: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      stock_quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      image_url: ['']
    });
  }

  ngOnInit(): void {
    if (this.data?.product) {
      this.isEditing = true;
      this.productForm.patchValue(this.data.product);
    }

    this.categoryService.getCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
      },
      error: (err: any) => {
        console.error('Error loading categories', err);
        this.notification = 'Failed to load categories. Please try again later.';
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productId = this.isEditing ? this.data?.product?.id : null;

      formValue.user_id = this.authService.currentUserValue.id; // Assurez-vous que c'est l'ID de l'utilisateur connecté
      console.log('Données envoyées :', formValue);

      const action$ = this.isEditing 
        ? this.productService.updateProduct(productId!, formValue)
        : this.productService.createProduct(formValue);

      action$.subscribe({
        next: () => {
          this.notification = 'Product saved successfully!';
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(this.isEditing ? 'Update failed' : 'Creation failed', err);
          this.notification = 'An error occurred while saving the product. Please check the console for more details.';
        }
      });
    } else {
      this.notification = 'Please fill in the required fields.';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
