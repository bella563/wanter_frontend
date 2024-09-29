import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; // URL de l'API Laravel
  private registerUrl = 'http://localhost:8000/api/register'; // URL d'enregistrement
  private resetPasswordUrl = 'http://localhost:8000/api/reset-password'; // URL de réinitialisation du mot de passe

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un utilisateur spécifique par ID
  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, { headers: this.jsonHeaders });
  }

  // Enregistrer un nouvel utilisateur
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, user, { headers: this.jsonHeaders });
  }

  // Réinitialiser le mot de passe
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl, { email }, { headers: this.jsonHeaders });
  }

  // Mettre à jour un utilisateur existant
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user, { headers: this.jsonHeaders });
  }

  // Supprimer un utilisateur par ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
