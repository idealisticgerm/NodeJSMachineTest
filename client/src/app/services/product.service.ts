import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  productId: number;
  productName: string;
  categoryId: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

 
  getProducts(currentPage: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${currentPage}&limit=${pageSize}`);
  }

  createProduct(name: string, categoryId: number): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/create`, { name, categoryId });
  }

  updateProduct(id: number, name: string, categoryId: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, { name, categoryId });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
