import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]  // Providing the service here if not provided globally
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  newCategoryName = '';
  selectedCategory = { id: null, name: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  // Fetch all categories
  fetchCategories() {
    // Using the new syntax for subscribe, as the old syntax is deprecated
    // The 'next' callback is used for handling the data, and 'error' is used for handling errors
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => console.error('Error fetching categories:', error)
    });
  }

  // Create a new category
  createCategory() {
    if (this.newCategoryName) {
      this.categoryService.createCategory(this.newCategoryName).subscribe({
        next: (data: any) => {
          this.categories.push(data);
          this.fetchCategories();
          this.newCategoryName = '';
        },
        error: (error: any) => console.error('Error creating category:', error)
      });
    }
  }

  // Update selected category
  updateCategory() {
    if (this.selectedCategory.id) {
      this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory.name).subscribe({
        next: (data: any) => {
          this.fetchCategories(); // Refresh categories after update
          this.selectedCategory = { id: null, name: '' };
        },
        error: (error: any) => console.error('Error updating category:', error)
      });
    }
  }

  // Delete category
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(category => category.id !== id);
      },
      error: (error: any) => console.error('Error deleting category:', error)
    });
  }

  // Select category for editing
  selectCategory(category: any) {
    this.selectedCategory = { ...category };
  }
}
