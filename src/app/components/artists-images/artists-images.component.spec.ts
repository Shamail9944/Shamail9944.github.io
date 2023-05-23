import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsImagesComponent } from './artists-images.component';

describe('ArtistsImagesComponent', () => {
  let component: ArtistsImagesComponent;
  let fixture: ComponentFixture<ArtistsImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
