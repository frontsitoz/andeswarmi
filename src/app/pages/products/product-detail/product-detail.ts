import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { CartService } from '../../../core/cart/cart.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Product } from '../../../service/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit, OnDestroy {
  product: any;
  isAdded = false;
  relatedProducts: any[] = [];
  private sub: any;

  @ViewChild('slider') sliderRef!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService,
    public auth: AuthService,
    private productService: Product
  ) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadProduct(id);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe?.();
  }

  private loadProduct(id: number) {
    this.productService.obtenerproducto(id).subscribe(product => {
      this.product = product;

      if (product) {
        this.productService.listarProductos().subscribe(allProducts => {
          this.relatedProducts = allProducts
            .filter(p => p.id !== id)
            .slice(0, 4);
        });
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: any) {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    this.cart.openDrawer();
    this.isAdded = true;
    setTimeout(() => (this.isAdded = false), 600);
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/img/default-placeholder.png';
  }

  scrollSlider(direction: 'left' | 'right') {
    if (!this.sliderRef?.nativeElement) return;

    const slider = this.sliderRef.nativeElement;
    const scrollAmount = 250;

    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
}
