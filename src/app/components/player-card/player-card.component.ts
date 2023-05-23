import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/common/factories';
import { Songs } from 'src/app/interfaces/songs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  playingSong: Songs = newTrack()
  subs: Subscription[] = []
  //Icons
  backward = faStepBackward
  forward = faStepForward
  play = faPlay

  constructor(private playerService: PlayerService) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.getPLayingSong()
  }

  getPLayingSong() {
    const sub = this.playerService.currentMusic.subscribe(song => {
      this.playingSong = song
      console.log(this.playingSong);

    })
    this.subs.push(sub)
  }

  nextSong() { this.playerService.nextSong() }
  prevSong() { this.playerService.prevSong() }

}
