import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsAndproductsRegisterComponent } from './ingredients-register.component';

describe('IngredientsAndproductsRegisterComponent', () => {
  let component: IngredientsAndproductsRegisterComponent;
  let fixture: ComponentFixture<IngredientsAndproductsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsAndproductsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsAndproductsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
