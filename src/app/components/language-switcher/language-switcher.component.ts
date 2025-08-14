import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  private languageService = inject(LanguageService);
  
  currentLanguage$ = this.languageService.currentLanguage$;
  currentLanguage = this.languageService.getCurrentLanguage();
  supportedLanguages = this.languageService.getSupportedLanguages();

  constructor() {
    // Подписываемся на изменения языка
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  getLanguageName(lang: Language): string {
    return lang === 'ua' ? 'Українська' : 'English';
  }
} 