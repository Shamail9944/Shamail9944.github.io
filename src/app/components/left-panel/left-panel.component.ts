import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faGuitar, faHouse, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from 'src/app/interfaces/playlist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})

export class LeftPanelComponent implements OnInit {

  menuSelected = 'Home'

  playlists: Playlist[] = []

  homeIcon = faHouse
  searchIcon = faSearch
  artistIcon = faGuitar
  libraryIcon = faBook
  PlaylistIcon = faMusic

  constructor(private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchPlaylist()
  }

  btnClick(btn: string) {
    this.menuSelected = btn
    this.router.navigateByUrl('player/home')
  }

  goToPlaylist(playlistId: string) {
    this.menuSelected = playlistId
    this.router.navigateByUrl(`player/albumDetails/playlist/${playlistId}`)
  }

  async searchPlaylist() {
    this.playlists = await this.spotifyService.searchUserPlaylist(0, 50)
    console.log(this.playlists);
  }

}
