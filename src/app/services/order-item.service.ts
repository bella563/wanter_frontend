import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiUrl = 'https://your-api-url.com/api/order-items'; // Remplacez par votre URL API

  constructor(private http: HttpClient) {}

  // Créer un nouvel élément de commande
  createOrderItem(orderItem: any): Observable<any> {
    return this.http.post(this.apiUrl, orderItem);
  }

  // Mettre à jour un élément de commande
  updateOrderItem(id: number, orderItem: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, orderItem);
  }

  // Supprimer un élément de commande
  deleteOrderItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtenir tous les éléments de commande pour un order_id
  getOrderItems(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?order_id=${orderId}`);
  }
}
