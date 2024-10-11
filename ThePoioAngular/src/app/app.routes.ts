import { Routes } from '@angular/router';
import { PageIndexComponent } from "../app/components/page-index/page-index.component";
import { MenuComponent } from './components/menu/menu.component';
import { IngredientsRegisterComponent } from './components/admin/ingredients-register/ingredients-register.component';
import { ProductsRegisterComponent } from './components/admin/products-register/products-register.component';
import { Error404Component } from './components/error404/error404.component';
import { OrdersComponent } from './components/orders/orders.component';

const projectTitle = "The Poio"
export const routes: Routes = [
  { path: '', title: `Inicio | ${projectTitle}`, component: PageIndexComponent},
  { path: 'menu', title: `Menu | ${projectTitle}`, component: MenuComponent},
  { path: 'admin-ingredients', title: `Registro de Ingredientes | ${projectTitle}`, component: IngredientsRegisterComponent },
  { path: 'admin-products', title: `Registro de Productos | ${projectTitle}`, component: ProductsRegisterComponent },
  { path: '404', title: `Error 404 | ${projectTitle}`, component: Error404Component },
  { path: 'admin-orders', title: `Pedidos | ${projectTitle}`, component: OrdersComponent },
  { path: '**', pathMatch: 'full', redirectTo: "404" }
];
