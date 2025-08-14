import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, LanguageSwitcherComponent],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent {
  private languageService = inject(LanguageService);
  private route = inject(ActivatedRoute);

  currentLanguage$ = this.languageService.currentLanguage$;
  currentLanguage = this.languageService.getCurrentLanguage();

  constructor() {
    // Подписываемся на изменения языка
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    // Также подписываемся на изменения параметров маршрута
    this.route.params.subscribe(params => {
      const lang = params['lang'] as Language;
      if (lang && ['ua', 'en'].includes(lang)) {
        this.languageService.setLanguage(lang);
      }
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 