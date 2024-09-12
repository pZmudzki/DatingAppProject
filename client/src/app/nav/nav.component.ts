import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  private accountService = inject(AccountService);

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(): void {
    this.accountService.login(this.authForm.value).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error(error),
      complete: () => console.log('complete'),
    });
  }
}
