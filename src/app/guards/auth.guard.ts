import { inject } from '@angular/core';

import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  

    

      const isValidToken = localStorage.getItem('token') != null && localStorage.getItem('token') !== '';
      const router = inject(Router);

      if (isValidToken )
      {
        return true;
      } 
      
      else {

              router.navigateByUrl('/');
              return false;
            } 
  }
