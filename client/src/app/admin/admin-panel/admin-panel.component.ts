import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.component.html',
  imports: [TabsModule],
})
export class AdminPanelComponent {}
