import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000/api/categories'; // URL de ton API pour les catégories

  constructor(private http: HttpClient) { }

  // Récupérer la liste de toutes les catégories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer une catégorie par son ID
  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Créer une nouvelle catégorie
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour une catégorie existante
  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer une catégorie par son ID
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error(error.message || 'Une erreur inconnue est survenue'));
  }
}
