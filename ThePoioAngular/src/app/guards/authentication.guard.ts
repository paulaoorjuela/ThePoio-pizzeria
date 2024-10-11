import { CanMatchFn } from '@angular/router';
import { ThePoioApiServiceService } from '../services/the-poio-api-service.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanMatchFn = (route, segments) => {
  const Services = inject(ThePoioApiServiceService)
    return Services.isLoggedIn()
};
