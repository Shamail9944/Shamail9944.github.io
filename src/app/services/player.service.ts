import { Injectable } from '@angular/core';
import { Songs } from '../interfaces/songs';
import { BehaviorSubject } from 'rxjs';
import { newTrack } from '../common/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentMusic = new BehaviorSubject<Songs>(newTrack())
  timerId: any = null

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentSong()
  }

  async getCurrentSong() {
    clearTimeout(this.timerId)

    // get song
    const song = await this.spotifyService.getCurrentSong()
    this.setCurrentSong(song)

    // song loops
    this.timerId = setInterval(async () => {
      await this.getCurrentSong()
    }, 10000)
  }

  setCurrentSong(song: Songs) {
    this.currentMusic.next(song)
  }

  async nextSong() { await this.spotifyService.nextSong() }
  async prevSong() { await this.spotifyService.prevSong() }
}
