import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/common/factories';
import { Artists } from 'src/app/interfaces/artist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.css']
})
export class TopArtistComponent implements OnInit {

  topArtist: Artists = newArtist()

  constructor(private spotifyService: SpotifyService) { }
  
  ngOnInit(): void {
    this.getArtist()
  }

  async getArtist() {
    const artists = await this.spotifyService.getTopArtists(1)
    if (!!artists) {
      this.topArtist = artists.pop()!
    }
    console.log(this.topArtist);
  }
}
