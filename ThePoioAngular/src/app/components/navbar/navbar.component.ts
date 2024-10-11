import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThePoioApiServiceService } from '../../services/the-poio-api-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductsTemplateComponent } from '../templates/products-template/products-template.component';
import { IProduct } from '../../models/productsModel';
import { IShoppingCart } from '../../models/shoppingCartModel';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ProductsTemplateComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  loggedIn: boolean = false;
  payloadId!: string;
  payloadAdmin: boolean = false;
  login: FormGroup;
  registration: FormGroup;
  orders: FormGroup;
  private Services = inject(ThePoioApiServiceService);
  regexEmail =
    /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  regexAlfa = /^[A-Za-z ]+$/;
  Products = signal<IProduct[]>([]);
  listShopingCartItem: IShoppingCart[] = [];

  constructor(private router: Router, private fb: FormBuilder) {
    // LOGIN------------------
    this.login = this.fb.group({
      user_password: ['', [Validators.required, Validators.minLength(4)]],
      user_email: [
        '',
        [Validators.required, Validators.pattern(this.regexEmail)],
      ],
    });
    // REGISTRATION------------------
    this.registration = this.fb.group({
      user_name: [
        '',
        [Validators.required, Validators.pattern(this.regexAlfa)],
      ],
      user_email: [
        '',
        [Validators.required, Validators.pattern(this.regexEmail)],
      ],
      user_password: ['', [Validators.required]],
      user_admin: [''],
    });

    //ORDER---------------------------
    this.orders = this.fb.group({
      user_name: [
        '',
        [Validators.required, Validators.pattern(this.regexAlfa)],
      ],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      products: [''],
      products_total_price: [''],
    });
  }

  payloadInfo() {
    let sessiontoken = sessionStorage.getItem('token');
    console.log(sessiontoken);

    this.Services.getDesencriptarPayload(sessiontoken).subscribe(
      (ApiResponse: any) => {
        console.log(ApiResponse);

        this.payloadId = ApiResponse.id;
        // console.log(this.payloadId);

        this.payloadAdmin = ApiResponse.user_admin;
        // console.log(this.payaloadAdmin);
      }
    );
  }

  ngOnInit() {
    if (sessionStorage.getItem('token') != null) {
      this.router.navigate(['']);
    }
    this.loggedIn = this.Services.isLoggedIn();
    this.payloadInfo();
    this.showAddedItemsShoppingCart();
  }

  clearSessionStorage() {
    sessionStorage.clear();
    location.reload();
  }

  userLogin() {
    const user_email = this.login.get('user_email')!.value;
    const user_password = this.login.get('user_password')!.value;
    this.Services.postUserLogin({ user_email, user_password }).subscribe(
      (data) => {
        console.log(data);
        let dataApi: any = data;
        sessionStorage.setItem('token', dataApi.token);
        location.reload();
      },
      (err) => {
        console.log(err);
        Swal.fire({
          title: 'Ingrese los datos correctamente!',
          icon: 'error',
        });
      }
    );
  }

  userRegistration() {
    if (
      this.registration.value.user_admin == '' ||
      this.registration.value.user_admin == null
    ) {
      this.registration.value.user_admin = false;
    }
    console.log(this.registration.value);
    this.Services.postUser(this.registration.value).subscribe(
      (respuestaAPI) => {
        Swal.fire({
          title: 'Usuario creado correctamente!',
          icon: 'success',
        });
        let dataApi: any = respuestaAPI;
        console.log(respuestaAPI);
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },
      (error) => {
        Swal.fire({
          title: 'El correo electronico ya existe!',
          icon: 'error',
        });
      }
    );
  }

  showAddedItemsShoppingCart() {
    let shoppingCartLocalStorage = localStorage.getItem(
      'shoppingCart'
    ) as string;
    let shoppingCart = JSON.parse(shoppingCartLocalStorage);
    this.listShopingCartItem = shoppingCart;
  }

  clearCart() {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar el carrito de compras?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.listShopingCartItem = [];
      }
    });
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    if (this.listShopingCartItem !== null) {
      for (let item of this.listShopingCartItem) {
        totalPrice += item.product_quantity * item.product_price;
      }
    }
    return totalPrice;
  }

  submitFormOrder() {
    let totalPrice = 0;
    for (let item of this.listShopingCartItem) {
      totalPrice += item.product_quantity * item.product_price;
    }

    const user_name = this.orders.get('user_name')!.value;
    const address = this.orders.get('address')!.value;
    const phone = this.orders.get('phone')!.value;
    const products = this.listShopingCartItem;
    const products_total_price = totalPrice;

    this.Services.postOrder({
      user_name,
      address,
      phone,
      products,
      products_total_price,
    }).subscribe(
      (respuestaAPI) => {
        Swal.fire({
          title: 'Datos enviados correctamente!',
          icon: 'success',
        });
        let dataApi: any = respuestaAPI;
        console.log(respuestaAPI);
      },
      (error) => {
        Swal.fire({
          title: 'Ingresa los datos requeridos para realizar el envío',
          icon: 'error',
        });
      }
    );
  }
}
