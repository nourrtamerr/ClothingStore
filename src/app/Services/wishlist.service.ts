import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5248/api/WishList'; 
  // prdId: Number = 0; //  match .NET DTO
  // userId: string = '';

  constructor(private http: HttpClient) {}
  
  addToWishlist(productId: number ): Observable<any> {

    return this.http.post(`${this.apiUrl}/create`,{"prodid":productId}
     // tells the server that the data being sent in the request body is in JSON format.
      , { headers: { 'Content-Type': 'application/json' }, withCredentials:true }).pipe(
      tap(response => console.log('Item added to wishlist:', response)),
      catchError(error => {
        console.error('Failed to add item to wishlist:', error);
        return throwError(() => error);
      })
    );
  
  }
  
  getWishlist(): Observable<any[]> {
    
    return this.http.get<any>(`${this.apiUrl}/GetFavoriteByUserId`, {withCredentials:true}).pipe(
      //Log what the backend sends(response).
      tap(response => console.log('API Response:', response)), 
      //if the response is valid it gives real data, if null gives empty list.
      map(response => response || []) 
    );
  }

 
  
  removeFromWishlist(productId: number): Observable<any> {
    console.log('Attempting to remove product ID:', productId);
    
    if (!productId) {
      console.error('Invalid product ID:', productId);
      return throwError(() => new Error('Invalid product ID'));
    }
  
    return this.http.delete(`${this.apiUrl}/Delete`, { params: { productId: productId},withCredentials:true },).pipe(
      tap(() => console.log(`Product ID ${productId} removed successfully`)),
      catchError(error => {
        console.error('Failed to remove item from wishlist:', error);
        return throwError(() => error);
      })
    );
  }
  
}
