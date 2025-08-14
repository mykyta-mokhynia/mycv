import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

export const languageRedirectGuard = () => {
  const router = inject(Router);
  const languageService = inject(LanguageService);
  
  // Отримуємо поточну мову з localStorage або використовуємо 'en' за замовчуванням
  const currentLang = languageService.getCurrentLanguage();
  
  // Якщо користувач на головній сторінці, перенаправляємо на /en
  if (router.url === '/') {
    return router.createUrlTree(['/en']);
  }
  
  return true;
};
