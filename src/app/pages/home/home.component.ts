import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/common/factories';
import { Songs } from 'src/app/interfaces/songs';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  songs: Songs[] = []
  playIcon = faPlay
  currentSong: Songs = newTrack()
  subs: Subscription[] = []

  constructor(private spotifyService: SpotifyService,
    private playerService: PlayerService) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.getSongs()
    this.getCurrentSong()
  }

  async getSongs() {
    this.songs = await this.spotifyService.searchSongs()
    console.log(this.songs);
  }

  obtainArtist(song: Songs) {
    return song.artists.map(x => x.name).join(', ')
  }

  async playSong(song: Songs) {
    await this.spotifyService.playMusic(song.id)
    this.playerService.setCurrentSong(song)
  }

  getCurrentSong() {
    const sub = this.playerService.currentMusic.subscribe(song => {
      this.currentSong = song;
      console.log('Current Song', this.currentSong);
    })
    this.subs.push(sub)
  }
}
