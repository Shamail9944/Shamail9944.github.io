import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artists-images',
  templateUrl: './artists-images.component.html',
  styleUrls: ['./artists-images.component.css']
})
export class ArtistsImagesComponent {

  @Input() artistImgSrc = ''
  @Output() click = new EventEmitter<void>()

  onClick() {
    this.click.emit()
  }

}
