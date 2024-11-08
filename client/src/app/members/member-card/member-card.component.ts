import { Component, computed, inject, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './member-card.component.html',
})
export class MemberCardComponent {
  private likesService = inject(LikesService);
  member = input.required<Member>();
  hasLiked = computed(() =>
    this.likesService.likeIds().includes(this.member().id)
  );
}
