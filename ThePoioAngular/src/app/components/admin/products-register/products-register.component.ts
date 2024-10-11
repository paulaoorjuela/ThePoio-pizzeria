import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ThePoioApiServiceService } from '../../../services/the-poio-api-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products-register.component.html',
  styleUrl: './products-register.component.css',
})
export class ProductsRegisterComponent {
  RegProductsForm: FormGroup;
  numRegex = /^[0-9]+$/;
  regexUrl =
    /^https?:\/\/\w+(\.\w+)+(\/[a-zA-Z0-9_.-]+)*(\/[a-zA-Z0-9_.-]+\.[a-zA-Z]+)?$/;
  private Services = inject(ThePoioApiServiceService);

  CurrentProductsList = signal<any>([]);
  inputHiddenID = new FormControl();

  constructor(private router: Router, private fb: FormBuilder) {
    this.RegProductsForm = this.fb.group({
      product_name: ['', [Validators.required]],
      product_price: [
        '',
        [Validators.required, Validators.pattern(this.numRegex)],
      ],
      product_type: ['', [Validators.required]],
      product_ingredients: [''],
      product_src_img: [
        'https://via.placeholder.com/500x500',
        [Validators.required, Validators.pattern(this.regexUrl)],
      ],
    });
  }

  ngOnInit() {
    console.log('Se inicio el componente');
    this.listProducts();
    if (sessionStorage.getItem('token') == null) {
      this.router.navigate(['404']);
    }
  }

  submitForm() {
    this.Services.postProduct(this.RegProductsForm.value).subscribe(
      (respuestaAPI) => {
        Swal.fire({
          icon: 'success',
          title: 'Listo!',
          text: 'Producto agregado correctamente',
        });
      }
    );
  }

  listProducts() {
    this.Services.getProducts().subscribe({
      next: (product) => {
        this.CurrentProductsList.set(product);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProduct(id: string, name: string) {
    let msg = '';
    if (name == undefined || name == null) {
      msg = `Tenga en cuenta que al eliminar este producto no se podrá restablecer`;
    } else {
      msg = `Tenga en cuenta que al eliminar ${name}, no se podrá restablecer`;
    }
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar este producto?',
      icon: 'question',
      text: msg,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Services.deleteProduct(id).subscribe({
          next: (ingredient) => {
            Swal.fire({
              title: 'producto eliminado correctamente!',
              icon: 'success',
            });
            this.listProducts();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  updateProduct(id: string) {
    this.Services.getOneIngredient(id).subscribe({
      next: (product) => {
        let productData: any = product;
        this.RegProductsForm.setValue({
          product_name: productData.product_name,
          product_src_img: productData.product_src_img,
          product_price: productData.product_price,
          product_type: productData.product_type,
          product_ingredients: productData.product_ingredients,
        });
        this.inputHiddenID.setValue(productData._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
