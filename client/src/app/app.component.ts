import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'client';

  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (data) => (this.users = data),
      error: (error) => console.error(error),
      complete: () => console.log('complete'),
    });
  }
}
