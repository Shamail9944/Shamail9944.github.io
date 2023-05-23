import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.css']
})
export class ButtonMenuComponent {

  @Input() description = ''

  @Input() selected = false

  @Output() click = new EventEmitter<void>()

  onClick() {this.click.emit()}
}
