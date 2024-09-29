import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ajoutez ceci

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Ajoutez FormsModule ici
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  searchText: string = '';

  constructor(public categoryService: CategoryService, public router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    );
  }

  deleteCategory(id: number | undefined): void {
    if (id !== undefined) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.loadCategories(); // Recharge les catégories après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie:', error);
        }
      );
    } else {
      console.error('ID de la catégorie non défini');
    }
  }

  get filteredCategories() {
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
