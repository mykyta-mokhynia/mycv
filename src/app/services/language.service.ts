import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export type Language = 'ua' | 'en';

export interface Translations {
  [key: string]: {
    ua: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: Translations = {
    'name': {
      ua: 'Мохиня Микита',
      en: 'Mykyta Mokhynia'
    },
    'title': {
      ua: 'Резюме',
      en: 'Resume'
    },
    'fullStackDeveloper': {
      ua: 'Full Stack Developer',
      en: 'Full Stack Developer'
    },
    'experience': {
      ua: 'Досвід',
      en: 'Experience'
    },
    'education': {
      ua: 'Освіта',
      en: 'Education'
    },
    'skills': {
      ua: 'Навички',
      en: 'Skills'
    },
    'contact': {
      ua: 'Контакти',
      en: 'Contact'
    },
    'downloadCV': {
      ua: 'Завантажити CV',
      en: 'Download CV'
    },
    'about': {
      ua: 'Про мене',
      en: 'About me'
    },
    'projects': {
      ua: 'Проекти',
      en: 'Projects'
    },
    'tools': {
      ua: 'Інструменти',
      en: 'Tools'
    },
    'frontend': {
      ua: 'Frontend',
      en: 'Frontend'
    },
    'backend': {
      ua: 'Backend',
      en: 'Backend'
    },
    'seniorDeveloper': {
      ua: 'Senior Full Stack Developer',
      en: 'Senior Full Stack Developer'
    },
    'period': {
      ua: '2022 - Поточний час',
      en: '2022 - Present'
    }
  };

  constructor(private router: Router) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const urlLang = this.getLanguageFromUrl();
    if (urlLang) {
      this.currentLanguageSubject.next(urlLang);
    } else {
      // Якщо мова не знайдена в URL, встановлюємо 'en' за замовчуванням
      this.currentLanguageSubject.next('en');
    }
  }

  getLanguageFromUrl(): Language | null {
    const path = this.router.url;
    const langMatch = path.match(/^\/(ua|en)/);
    return langMatch ? (langMatch[1] as Language) : null;
  }

  setLanguage(lang: Language): void {
    this.currentLanguageSubject.next(lang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
    return translation[this.getCurrentLanguage()];
  }

  getSupportedLanguages(): Language[] {
    return ['ua', 'en'];
  }
} 