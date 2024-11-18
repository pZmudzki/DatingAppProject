import {
  Component,
  OnInit,
  ViewChild,
  inject,
  input,
  output,
} from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './member-messages.component.html',
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messageForm?: NgForm;
  private messageService = inject(MessageService);
  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent = '';
  updateMessages = output<Message>();

  sendMessage() {
    this.messageService
      .sendMessage(this.username(), this.messageContent)
      .subscribe({
        next: (message) => {
          this.updateMessages.emit(message);
          this.messageForm?.reset();
        },
      });
  }
}
