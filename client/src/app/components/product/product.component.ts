import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, CategoryService]
})

export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  newProductName = '';
  newCategoryId: number | null = null;
  selectedProduct: any = { id: null, name: '', categoryId: null };
  isModalOpen = false;
  currentPage = 1;
  pageSize = 5;
  totalPages: number = 1;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log(response); 
        this.products = response.data; // Store the array of products
        this.totalPages = response.totalPages; // Store totalPages for pagination
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => console.error('Error fetching categories:', error)
    });
  }

  createProduct() {
    if (this.newProductName && this.newCategoryId) {
      this.productService.createProduct(this.newProductName, this.newCategoryId).subscribe({
        next: (data: any) => {
          this.products.push(data);
          this.fetchProducts();   
          this.newProductName = '';
          this.newCategoryId = null;
        },
        error: (error: any) => console.error('Error creating product:', error)
      });
    }
  }

  updateProduct() {
    if (this.selectedProduct.id && this.selectedProduct.categoryId) {
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct.name, this.selectedProduct.categoryId).subscribe({
        next: (data: any) => {
          this.fetchProducts();
          this.closeModal();
          this.selectedProduct = { id: null, name: '', categoryId: null };
        },
        error: (error: any) => console.error('Error updating product:', error)
      });
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.productId !== id);
      },
      error: (error: any) => console.error('Error deleting product:', error)
    });
  }

  selectProduct(product: any) {
    console.log('Selected Product:', product); 
    this.selectedProduct = { 
      id: product.productId, 
      name: product.productName, 
      categoryId: product.categoryId 
    };
    this.openModal(); // Open modal on product selection
  }

  openModal() {
    console.log('Opening modal');
    this.isModalOpen = true;
  }

  closeModal() {
    console.log('Closing modal');
    this.isModalOpen = false;
  }

  // Pagination functions
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }
  

  get pageCount() {
    return this.totalPages;
  }       
}
