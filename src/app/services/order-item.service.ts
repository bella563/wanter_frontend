import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiUrl = 'http://localhost:8000/api/order-items';

  constructor(private http: HttpClient) {}

  createOrderItems(orderId: number, orderItems: any[]): Observable<any> {
    return this.http.post(this.apiUrl, { order_id: orderId, items: orderItems });
  }

  getOrderItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrderItemsByOrderId(orderId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order/${orderId}`);
  }

  getOrderItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateOrderItem(id: number, orderItem: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, orderItem);
  }

  deleteOrderItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
