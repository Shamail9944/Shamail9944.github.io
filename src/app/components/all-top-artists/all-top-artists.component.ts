import { Component, OnInit } from '@angular/core';
import { Artists } from 'src/app/interfaces/artist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-all-top-artists',
  templateUrl: './all-top-artists.component.html',
  styleUrls: ['./all-top-artists.component.css']
})

export class AllTopArtistsComponent implements OnInit {

  allTopArtists: Artists[] = []

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getTopArtists()
  }

  async getTopArtists() {
    this.allTopArtists = await this.spotifyService.getTopArtists(5)
    console.log(this.allTopArtists);

  }

}
