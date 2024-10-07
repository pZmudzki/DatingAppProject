import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './member-card.component.html',
})
export class MemberCardComponent {
  member = input.required<Member>();
}
