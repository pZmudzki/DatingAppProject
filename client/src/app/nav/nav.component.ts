import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '../_directives/has-role.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HasRoleDirective,
  ],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login(): void {
    this.accountService.login(this.authForm.value).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/members');
        console.log(data);
      },
      error: (error) => this.toast.error(error.error, 'Error'),
      complete: () => console.log('complete'),
    });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
