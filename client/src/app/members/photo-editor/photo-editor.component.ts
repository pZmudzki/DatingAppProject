import { Component, input } from '@angular/core';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [],
  templateUrl: './photo-editor.component.html',
})
export class PhotoEditorComponent {
  member = input.required<Member>();
}
