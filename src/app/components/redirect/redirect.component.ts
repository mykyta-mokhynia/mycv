import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: '<div>Redirecting...</div>',
  standalone: true
})
export class RedirectComponent implements OnInit {
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Автоматично перенаправляємо на /en
    this.router.navigate(['/en']);
  }
}
