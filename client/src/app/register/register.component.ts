import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private toast = inject(ToastrService);
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();

  model: any = {};

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.cancel();
      },
      error: (error) => this.toast.error(error.error, 'Error'),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
