import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;  // Déclaration de la propriété pour stocker les détails du produit
  isLoading = true;  // État de chargement
  error: string | null = null;  // Variable pour stocker les messages d'erreur

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Obtenez l'ID depuis les paramètres de la route, en fournissant une valeur par défaut si nécessaire
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    // Appelez le service pour obtenir les détails du produit
    this.productService.getProduct(id).pipe(
      map(data => {
        this.product = data;
        this.isLoading = false;
      }),
      catchError(error => {
        console.error('Error fetching product details', error);
        this.error = 'Failed to load product details. Please try again later.';
        this.isLoading = false;
        return of(null);  // Retourner un Observable vide pour ne pas casser le flux
      })
    ).subscribe();
  }
}
