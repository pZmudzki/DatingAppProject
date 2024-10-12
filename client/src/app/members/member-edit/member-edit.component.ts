import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, GalleryModule],
  templateUrl: './member-edit.component.html',
})
export class MemberEditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member?: Member;

  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toast = inject(ToastrService);

  images: GalleryItem[] = [];
  selectedTab: string = 'about';

  editForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    const user = this.accountService.currentUser();

    if (!user) return;

    this.memberService.getMember(user.username).subscribe({
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

        this.editForm = new FormGroup({
          introduction: new FormControl(this.member?.introduction),
          lookingFor: new FormControl(this.member?.lookingFor),
          interests: new FormControl(this.member?.interests),
          city: new FormControl(this.member?.city),
          country: new FormControl(this.member?.country),
        });
      },
    });
  }

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  update() {
    console.log(this.editForm.value);
    this.toast.success('Profile updated successfully');
    this.editForm.reset(this.editForm.value);
  }
}
