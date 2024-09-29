import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('slider') slider!: ElementRef;
  products: any[] = [];
  error: string | null = null;

  // Data for steps
  steps = [
    { 
      title: 'Trouver des produits avec garantie de livraison', 
      details: 'Cherchez des produits qui offrent une garantie de livraison dans les délais spécifiés pour assurer une transaction sécurisée.', 
      imageUrl: 'images/logo.png'
    },
    { 
      title: 'Effectuer le paiement sur Wanteer', 
      details: 'Utilisez notre plateforme sécurisée pour effectuer vos paiements facilement avec divers modes de paiement.', 
      imageUrl: 'https://images.unsplash.com/photo-1579657536927-4fcfe2b2d9f5?fit=crop&w=400&h=300'
    },
    { 
      title: 'Faire une réclamation en cas de problème', 
      details: 'Si vous rencontrez des retards ou des problèmes, faites une réclamation directement depuis votre compte pour obtenir de l\'aide et une compensation.', 
      imageUrl: 'https://images.unsplash.com/photo-1594706451630-95d1e54c8b56?fit=crop&w=400&h=300'
    }
  ];
  
  activeStep: number | null = null; // Track which step is active
  activeImage: string = ''; // URL of the active image

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    // Initialization logic if needed
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => {
        this.products = data.slice(0, 7); // Display only the first 7 products
      },
      error: (error) => {
        this.error = 'Erreur lors de la récupération des produits.';
        console.error('Error fetching products:', error);
      }
    });
  }

  scrollLeft(): void {
    this.scroll(-200);
  }

  scrollRight(): void {
    this.scroll(200);
  }

  private scroll(distance: number): void {
    const slider = this.slider.nativeElement as HTMLElement;
    slider.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  }

  toggleContent(index: number): void {
    this.activeStep = this.activeStep === index ? null : index;
    this.activeImage = this.steps[index]?.imageUrl || '';
  }

  isActiveStep(index: number): boolean {
    return this.activeStep === index;
  }
}
