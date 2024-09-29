import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8000/api/subscriptions';

  constructor(private http: HttpClient) { }

  getSubscriptions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSubscription(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createSubscription(subscription: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, subscription);
  }

  updateSubscription(id: number, subscription: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, subscription);
  }

  deleteSubscription(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
