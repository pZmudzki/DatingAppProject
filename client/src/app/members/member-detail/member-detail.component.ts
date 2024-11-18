import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
  private messageService = inject(MessageService);
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);

  member: Member = {} as Member;
  images: GalleryItem[] = [];

  selectedTab: string = 'about';

  messages: Message[] = [];

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.member = data['member'];
        this.member &&
          this.member.photos.map((p) => {
            this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
          });
      },
    });
    this.route.queryParams.subscribe({
      next: (params) => {
        params['tab'] && this.changeTab(params['tab']);
      },
    });
  }

  onUpdateMessages(event: Message) {
    this.messages.push(event);
  }

  changeTab(tab: string) {
    this.selectedTab = tab;

    if (
      this.selectedTab === 'messages' &&
      this.messages.length === 0 &&
      this.member
    ) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: (messages) => (this.messages = messages),
      });
    }
  }
}
