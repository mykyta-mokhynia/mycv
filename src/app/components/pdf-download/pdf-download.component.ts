import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-download',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="pdf-download-btn" 
      (click)="downloadPDF()"
      [attr.aria-label]="'Download PDF'"
      title="Download PDF"
      [disabled]="isGenerating">
      <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="7,10 12,15 17,10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="12" y1="15" x2="12" y2="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `,
  styleUrls: ['./pdf-download.component.scss']
})
export class PdfDownloadComponent {
  isGenerating = false;

  async downloadPDF(): Promise<void> {
    if (this.isGenerating) return;
    
    this.isGenerating = true;
    
    try {
      // Знаходимо елемент CV
      const cvElement = document.querySelector('.cv') as HTMLElement;
      
      if (!cvElement) {
        throw new Error('CV element not found');
      }

      // Створюємо простий клон без CSS класів
      const clonedElement = cvElement.cloneNode(true) as HTMLElement;
      
      // Повністю очищаємо від CSS та налаштовуємо двостовпцевий показ
      this.setupTwoColumnPDF(clonedElement);
      
      // Додаємо до DOM тимчасово
      document.body.appendChild(clonedElement);
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      
      // Конвертуємо в canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true
      });
      
      // Видаляємо клон
      document.body.removeChild(clonedElement);
      
      // Створюємо PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      // Розміри для A4
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Перша сторінка
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Додаткові сторінки
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Завантажуємо
      const fileName = `Mykyta_Mokhynia_CV_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      this.isGenerating = false;
    }
  }

  private setupTwoColumnPDF(element: HTMLElement): void {
    // Прибираємо всі CSS класи
    element.removeAttribute('class');
    element.removeAttribute('style');
    
    // Прибираємо зайві елементи
    const actions = element.querySelector('.cv__header-actions');
    if (actions) actions.remove();
    
    const header = element.querySelector('.cv__header');
    if (header) header.remove();
    
    const emojis = element.querySelectorAll('.emoji');
    emojis.forEach(emoji => emoji.remove());
    
    const progressBars = element.querySelectorAll('.progress__bar');
    progressBars.forEach(bar => bar.remove());
    
    // Налаштовуємо двостовпцевий layout
    element.style.cssText = `
      background: white !important;
      color: black !important;
      font-family: Arial, sans-serif !important;
      font-size: 42px !important;
      line-height: 1.4 !important;
      padding: 20px !important;
      margin: 0 !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      transform: none !important;
      background-image: none !important;
      display: flex !important;
      gap: 30px !important;
    `;
    
    // Знаходимо sidebar та content
    const sidebar = element.querySelector('.cv__sidebar') as HTMLElement;
    const content = element.querySelector('.cv__content') as HTMLElement;
    
    if (sidebar) {
      sidebar.style.cssText = `
        background: white !important;
        color: black !important;
        font-family: Arial, sans-serif !important;
        font-size: 42px !important;
        line-height: 1.4 !important;
        padding: 15px !important;
        margin: 0 !important;
        border: 1px solid #ddd !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        transform: none !important;
        background-image: none !important;
        flex: 0 0 35% !important;
        max-width: 35% !important;
      `;
    }
    
    if (content) {
      content.style.cssText = `
        background: white !important;
        color: black !important;
        font-family: Arial, sans-serif !important;
        font-size: 42px !important;
        line-height: 1.4 !important;
        padding: 15px !important;
        margin: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        transform: none !important;
        background-image: none !important;
        flex: 1 !important;
      `;
    }
    
    // Прибираємо всі CSS класи з усіх елементів та збільшуємо текст
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.removeAttribute('class');
        el.removeAttribute('style');
        
        // Збільшуємо текст в 3 рази
        el.style.cssText = `
          background: white !important;
          color: #222 !important;
          font-family: 'Segoe UI', Arial, sans-serif !important;
          font-size: 42px !important;
          line-height: 1.5 !important;
          margin: 8px 0 !important;
          padding: 6px 0 !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          transform: none !important;
          background-image: none !important;
        `;
      }
    });
    
    // Спеціальні стилі для заголовків (збільшуємо в 3 рази)
    const titles = element.querySelectorAll('h1, h2, h3, h4');
    titles.forEach(title => {
      (title as HTMLElement).style.cssText = `
        color: #0d47a1 !important;
        font-weight: 700 !important;
        font-size: 60px !important;
        border-bottom: 2px solid #ccc !important;
        padding-bottom: 6px !important;
        margin: 20px 0 12px 0 !important;
        background: white !important;
      `;
    });
    
    // Стилі для посилань
    const links = element.querySelectorAll('a');
    links.forEach(link => {
      (link as HTMLElement).style.cssText = `
        color: black !important;
        text-decoration: underline !important;
        background: white !important;
        font-size: 42px !important;
      `;
    });
    
    // Стилі для карток
    const cards = element.querySelectorAll('.card');
    cards.forEach(card => {
      if (card instanceof HTMLElement) {
        card.style.cssText = `
          background: white !important;
          color: black !important;
          border: 1px solid #ddd !important;
          padding: 15px !important;
          margin: 15px 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        `;
      }
    });
    
    // Стилі для списків
    const lists = element.querySelectorAll('ul, ol');
    lists.forEach(list => {
      if (list instanceof HTMLElement) {
        list.style.cssText = `
          background: white !important;
          color: black !important;
          padding-left: 25px !important;
          margin: 10px 0 !important;
          font-size: 42px !important;
        `;
      }
    });
    
    // Стилі для елементів списку
    const listItems = element.querySelectorAll('li');
    listItems.forEach(item => {
      if (item instanceof HTMLElement) {
        item.style.cssText = `
          background: white !important;
          color: black !important;
          margin: 6px 0 !important;
          padding: 3px 0 !important;
          font-size: 42px !important;
        `;
      }
    });
    
    // Стилі для параграфів
    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (p instanceof HTMLElement) {
        p.style.cssText = `
          background: white !important;
          color: black !important;
          margin: 10px 0 !important;
          padding: 5px 0 !important;
          font-size: 42px !important;
          line-height: 1.6 !important;
        `;
      }
    });
  }
}
