import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class CategoryFormComponent implements OnInit {
  category: { id?: number; name: string; description?: string } = { name: '', description: '' };
  private apiUrl = 'http://localhost:8000/api/categories';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.loadCategory(+categoryId);
    }
  }

  loadCategory(id: number): void {
    this.http.get<{ id: number; name: string; description?: string }>(`${this.apiUrl}/${id}`).subscribe(
      (data) => {
        this.category = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de la catégorie:', error);
        this.errorMessage = 'Error loading category.';
      }
    );
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    const request = this.category.id
      ? this.http.put<any>(`${this.apiUrl}/${this.category.id}`, this.category)
      : this.http.post<any>(this.apiUrl, this.category);

    request.subscribe(
      () => {
        this.successMessage = this.category.id ? 'Category updated successfully!' : 'Category added successfully!';
        setTimeout(() => {
          this.router.navigate(['/vendor-dashboard/categories']);
        }, 2000); // Redirection après 2 secondes
      },
      (error) => {
        console.error('Erreur lors de la mise à jour ou de la création de la catégorie:', error);
        this.errorMessage = 'Error updating or creating category.';
      }
    );
  }
}
