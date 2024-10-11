import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThePoioApiServiceService {
  private http = inject(HttpClient);
  private urlApi: string = 'http://localhost:4000/api';

  constructor() {}

  // INGREDIENTS SERVICES ----------------------------------
  getIngredients() {
    return this.http.get(`${this.urlApi}/read-ingredients`);
  }

  getOneIngredient(id: string) {
    return this.http.get(`${this.urlApi}/read-one-ingredient/${id}`);
  }

  postIngredient(ingredientData: any) {
    return this.http.post(`${this.urlApi}/create-ingredient`, ingredientData);
  }

  deleteIngredient(id: string) {
    return this.http.delete(`${this.urlApi}/delete-ingredient/${id}`);
  }

  putIngredient(id: string, ingredientData: any) {
    return this.http.put(
      `${this.urlApi}/update-ingredient/${id}`,
      ingredientData
    );
  }

  // PRODUCTS SERVICES ----------------------------------
  getProducts() {
    return this.http.get(`${this.urlApi}/read-products`);
  }

  getOneProduct(id: string) {
    return this.http.get(`${this.urlApi}/read-one-product/${id}`);
  }

  postProduct(productData: any) {
    return this.http.post(`${this.urlApi}/create-product`, productData);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.urlApi}/delete-product/${id}`);
  }

  putProduct(id: string, productData: any) {
    return this.http.put(`${this.urlApi}/update-product/${id}`, productData);
  }

// USER SERVICES ----------------------------------

getUsers() {
  return this.http.get(`${this.urlApi}/read-users`);
}

getOneUser(id: string) {
  return this.http.get(`${this.urlApi}/read-one-user/${id}`);
}

postUser(productData: any) {
  return this.http.post(`${this.urlApi}/create-user`, productData);
}

deleteUser(id: string) {
  return this.http.delete(`${this.urlApi}/delete-user/${id}`);
}

putUser(id: string, productData: any) {
  return this.http.put(`${this.urlApi}/update-user/${id}`, productData);
}

  // -------------------------------------token validation------------------------
  isLoggedIn(): boolean {
    let status = sessionStorage.getItem('token') ? true : false;
    return status;
  }

  postUserLogin(dataLogin: any) {
    return this.http.post(`${this.urlApi}/login`, dataLogin);
  }

  getDesencriptarPayload(token: string | null): any {
    if (token != null) {
        const headers = new HttpHeaders().set(
            'Authorization',
            `Beares ${token}`
        );
        return this.http.get(this.urlApi + '/token-info', { headers });
    } else {
        return { msg: 'no hay token' };
    }
}

// ORDERS SERVICES ----------------------------------
getOrders() {
  return this.http.get(`${this.urlApi}/read-orders`);
}

getOneOrder(id: string) {
  return this.http.get(`${this.urlApi}/read-one-order/${id}`);
}

postOrder(orderData: any) {
  return this.http.post(`${this.urlApi}/create-order`, orderData);
}

deleteOrder(id: string) {
  return this.http.delete(`${this.urlApi}/delete-order/${id}`);
}

putOrder(id: string, orderData: any) {
  return this.http.put(
    `${this.urlApi}/update-order/${id}`,
    orderData
  );
}

}
