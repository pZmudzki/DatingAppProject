import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './member-card.component.html',
})
export class MemberCardComponent {
  member = input.required<Member>();
}
