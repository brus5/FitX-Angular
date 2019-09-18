import {Component, Input} from '@angular/core';

@Component({
  selector: 'component-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  @Input('description') description: string;
}
