import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ThePoioApiServiceService } from '../../../services/the-poio-api-service.service'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients-resgister',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ingredients-register.component.html',
  styleUrl: './ingredients-register.component.css',
})
export class IngredientsRegisterComponent {

  RegIngredientsForm: FormGroup;
  numRegex = /^[0-9]+$/;
  regexUrl =
    /^https?:\/\/\w+(\.\w+)+(\/[a-zA-Z0-9_.-]+)*(\/[a-zA-Z0-9_.-]+\.[a-zA-Z]+)?$/;
  private Services = inject(ThePoioApiServiceService);

  CurrentIngredientsList = signal<any>([]);
  inputHiddenID = new FormControl()

  constructor(private router: Router, private fb: FormBuilder) {
    this.RegIngredientsForm = this.fb.group({
      ingredient_name: ['', [Validators.required]],
      ingredient_quantity: ['', [Validators.required]],
      ingredient_price: ['', [Validators.required, Validators.pattern(this.numRegex)]],
      ingredient_src_img: [
        'https://via.placeholder.com/500x500',
        [Validators.required, Validators.pattern(this.regexUrl)],
      ],
    });
  }

  ngOnInit(): void {
    console.log('Se inicio el componente');
    this.listIngredients();
    if (sessionStorage.getItem('token') == null) {
      this.router.navigate(['404']);
    }
  }

  submitForm() {
    this.Services
      .postIngredient(this.RegIngredientsForm.value)
      .subscribe((respuestaAPI) => {
        Swal.fire({
          icon: 'success',
          title: 'Listo!',
          text: 'Ingrediente agregado correctamente',
        });
      });
  }

  listIngredients() {
    this.Services.getIngredients().subscribe({
      next: (ingredient) => {
        this.CurrentIngredientsList.set(ingredient);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteIngredient(id: string, nombre: string) {
    let mensaje = '';
    if (nombre == undefined || nombre == null) {
      mensaje = `Tenga en cuenta que al eliminar este ingrediente no se podrá restablecer`;
    } else {
      mensaje = `Tenga en cuenta que al eliminar ${nombre}, no se podrá restablecer`;
    }
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar este ingrediente?',
      icon: 'question',
      text: mensaje,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Services.deleteIngredient(id).subscribe({
          next: (ingredient) => {
            Swal.fire({
              title: 'Ingrediente eliminado correctamente!',
              icon: 'success',
            });
            this.listIngredients();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }


  updateIngredient(id: string){
    this.Services.getOneIngredient(id).subscribe({
      next: (ingredient) => {
        let ingredientData:any = ingredient
        this.RegIngredientsForm.setValue({
          ingredient_name: ingredientData.ingredient_name,
          ingredient_quantity: ingredientData.ingredient_quantity,
          ingredient_src_img: ingredientData.ingredient_src_img,
          ingredient_price: ingredientData.ingredient_price
        });
        this.inputHiddenID.setValue(ingredientData._id)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
