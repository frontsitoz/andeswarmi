import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../service/product';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './category.html',
})
export class CategoryPage implements OnInit, OnDestroy {
  categoryName = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ps: Product,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.params.subscribe((params) => {
        this.categoryName = params['name'] || 'Todos';
        this.categoryService.setCategory(this.categoryName);
        this.loadProducts();
      })
    );
  }

  loadProducts() {
    this.subs.add(
      this.ps.listarProductos().subscribe((list: any[]) => {
        this.products = list || [];
        this.applyFilters();
      })
    );
  }

  applyFilters() {
    const category = this.categoryName || 'Todos';
    this.filteredProducts = this.products.filter((p) => {
      if (category === 'Todos') return true;
      if (Array.isArray(p.category)) {
        return p.category.map((c: any) => c.toString().toLowerCase()).includes(category.toLowerCase());
      }
      return (p.category || '').toString().toLowerCase() === category.toLowerCase();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openProduct(product: any) {
    this.router.navigate(['/product', product.id]);
  }
}
