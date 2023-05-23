import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerRoutingModule } from './player-routing.module';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { ButtonMenuComponent } from 'src/app/components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserBioComponent } from './../../components/user-bio/user-bio.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { FetchRecentComponent } from 'src/app/components/fetch-recent/fetch-recent.component';
import { FormsModule } from '@angular/forms';
import { AllTopArtistsComponent } from 'src/app/components/all-top-artists/all-top-artists.component';
import { ArtistsImagesComponent } from 'src/app/components/artists-images/artists-images.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    RightPanelComponent,
    ButtonMenuComponent,
    UserBioComponent,
    HomeComponent,
    TopArtistComponent,
    FetchRecentComponent,
    AllTopArtistsComponent,
    ArtistsImagesComponent,
    PlayerCardComponent,
    AlbumDetailsComponent,
    BannerComponent

  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }
