import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-redirection-card',
  templateUrl: './redirection-card.component.html',
  styleUrls: ['./redirection-card.component.scss']
})
export class RedirectionCardComponent {

  @Input() isInitialUrl: boolean = false;
  @Input() hasFollowerCard: boolean = true;
  @Input() hasRedirection: boolean = true;

  @Input() statusCodeNumber: number = 0;
  @Input() statusCodeName: string = '';
  @Input() url: string = '';

}
