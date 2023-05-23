import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/common/factories';
import { Songs } from 'src/app/interfaces/songs';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {

  bannerImgUri = ''
  bannerText = ''


  songs: Songs[] = []
  playingSong: Songs = newTrack()
  playIcon = faPlay
  subs: Subscription[] = []

  title = '';

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getSongs()
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  getSongs() {
    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      console.log(params.get('type'));
      console.log(params.get('id'));
      const type = params.get('type')
      const id = params.get('id')
      await this.getPageData(type!, id!)
    })
    this.subs.push(sub)
  }

  async getPageData(type: string, id: string) {
    if (type === 'playlist')
      await this.getPlaylistData(id)
    else
      await this.getArtistData(id)
  }

  async getPlaylistData(playlistId: string) {
    const playlistSongs = await this.spotifyService.getPlaylistSongs(playlistId)
    console.log(playlistSongs);
    this.setPageData(playlistSongs?.imgUrl!, playlistSongs?.name!, playlistSongs?.song!)
    this.title = 'Music Playlist : ' + playlistSongs?.name
  }

  async getArtistData(artistId: string) {
  }

  setPageData(bannerImg: string, bannerTitle: string, songs: Songs[]) {
    this.bannerImgUri = bannerImg
    this.bannerText = bannerTitle
    this.songs = songs
  }



  obtainArtist(song: Songs) {
    return song.artists.map(x => x.name).join(', ')
  }

  async playSong(song: Songs) {
    await this.spotifyService.playMusic(song.id)
    this.playerService.setCurrentSong(song)
  }


}
