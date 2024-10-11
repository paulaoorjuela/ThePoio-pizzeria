import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../models/productsModel';
import { ThePoioApiServiceService } from '../../services/the-poio-api-service.service';
import { ProductsTemplateComponent } from '../templates/products-template/products-template.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [
    CommonModule,
    RouterLink,
    ProductsTemplateComponent
  ],
})
export class MenuComponent {
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
