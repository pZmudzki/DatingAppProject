import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';

import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [DatePipe, GalleryModule],
  templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);

  member?: Member;
  images: GalleryItem[] = [];

  selectedTab: string = 'about';

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        member.photos.map((photo) => {
          this.images.push(
            new ImageItem({
              src: photo.url,
              thumb: photo.url,
            })
          );
        });
      },
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }
}
