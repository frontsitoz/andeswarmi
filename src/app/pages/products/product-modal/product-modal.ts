import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CartService } from '../../../core/cart/cart.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './product-modal.html',
  styleUrls: ['./product-modal.css'],
})
export class ProductModal {
  @Input() product: any = null;
  @Input() images: string[] = [];

  isAdded = false;
  imagesLoaded: boolean[] = [];

  constructor(
    private router: Router,
    private cart: CartService,
    public auth: AuthService
  ) {}

  onImageLoad(i: number) {
    this.imagesLoaded[i] = true;
  }

  onOverlayClick() {
    this.closeModal();
  }

  closeModal() {
    this.product = null;
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
}
