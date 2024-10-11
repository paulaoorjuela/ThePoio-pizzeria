import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { IProduct } from '../../models/productsModel';
import { ThePoioApiServiceService } from '../../services/the-poio-api-service.service';
import { ProductsTemplateComponent } from '../templates/products-template/products-template.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-index',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductsTemplateComponent],
  templateUrl: './page-index.component.html',
  styleUrl: './page-index.component.css',
})
export class PageIndexComponent {
  Products = signal<IProduct[]>([]);
  private Services = inject(ThePoioApiServiceService);

  ngOnInit() {
    this.Services.getProducts().subscribe({
      next: (product) => {
        this.Products.set(product as IProduct[]);
        console.log(this.Products());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fromProductsTemplate(event: string) {
    console.log(event);
  }
}
