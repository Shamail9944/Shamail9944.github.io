import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SpotifyAuthorization } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { SpotifyArtists, SpotifyPlaylist, SpotifySinglePlaylist, SpotifyTracks, SpotifyUserProfileResponce } from '../common/spotifyHelper';
import { Playlist } from '../interfaces/playlist';
import { Router } from '@angular/router';
import { Artists } from '../interfaces/artist';
import { Songs } from '../interfaces/songs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs
  user!: User

  constructor(private router: Router) {
    this.spotifyApi = new Spotify()
  }

  spotifyAuthLogin() {
    const authEndpoint = `https://accounts.spotify.com/authorize?`;
    const clientId = `client_id=3108e5d2317244bbaf4a4d6dfc3670b8&`;
    const redirectUrl = `redirect_uri=https://spotify-angular-sdk.vercel.app/login/&`;
    const scopes = `scope=user-read-currently-playing&user-read-recently-played&user-read-playback-state&user-top-read&user-modify-playback-state&user-library-read&playlist-read-private&playlist-read-collaborative&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType
  }
  //   spotifyAuthLogin() {
  //     const authEndpoint = `${SpotifyAuthorization.authEndpoint}?`;
  //     const clientId = `client_id=${SpotifyAuthorization.clientId}&`;
  //     const redirectUrl = `redirect_uri=${SpotifyAuthorization.redirectUrl}&`;
  //     const scopes = `scope=${SpotifyAuthorization.scopes.join('%20')}&`;
  //     const responseType = `response_type=token&show_dialog=true`;
  //     return authEndpoint + clientId + redirectUrl + scopes + responseType
  //   }
  //   export const SpotifyAuthorization = {
  //     authEndpoint: 'https://accounts.spotify.com/authorize',
  //     clientId: '3108e5d2317244bbaf4a4d6dfc3670b8',
  //     clientSecret: '13109872cecc47de83502ab6f2ae905e',
  //     redirectUrl: 'http://localhost:4200/login/',
  //     // redirectUrl: '/login/',
  //     scopes: [
  //         "user-read-currently-playing",
  //         "user-read-recently-played",
  //         "user-read-playback-state",
  //         "user-top-read",
  //         "user-modify-playback-state",
  //         "user-library-read",
  //         "playlist-read-private",
  //         "playlist-read-collaborative",
  //     ]
  // }


  getCallbackCode() {
    console.log(window.location.hash);
    if (!window.location.hash)
      return ''
    const params = window.location.hash.substring(1).split('&')
    console.log(params);
    return params[0].split('=')[1]
  }

  defineAccessToken(token: string) {
    this.spotifyApi?.setAccessToken(token)
    localStorage.setItem('token', token)
    this.spotifyApi?.skipToNext()
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi?.getMe()
    console.log(userInfo);
    this.user = SpotifyUserProfileResponce(userInfo!)

  }

  async initializerService() {
    if (!!this.user)
      return true;

    const token = localStorage.getItem('token')

    if (!token)
      return false;

    try {
      this.defineAccessToken(token)
      await this.getSpotifyUser()
      return !!this.user;
    } catch (e) {
      return false;
    }
  }

  async searchUserPlaylist(offset = 0, limit = 50): Promise<Playlist[]> {
    const playlists = await this.spotifyApi?.getUserPlaylists(this.user?.id, { offset, limit })
    console.log(playlists);
    return playlists?.items.map(SpotifyPlaylist)!
  }

  async getPlaylistSongs(playlistId: string, offset = 0, limit = 50) {
    const spotifyPlaylist = await this.spotifyApi.getPlaylist(playlistId)
    if (!spotifyPlaylist) return null
    const playlist = SpotifySinglePlaylist(spotifyPlaylist)
    const spotifySongs = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit })
    playlist.song = spotifySongs.items.map(song => SpotifyTracks(song.track as SpotifyApi.TrackObjectFull))
    return playlist
  }

  async getTopArtists(limit = 10): Promise<Artists[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit })
    console.log(artists);
    return artists.items.map(SpotifyArtists)
  }

  async searchSongs(offset = 0, limit = 50): Promise<Songs[]> {
    const songsLists = await this.spotifyApi.getMySavedTracks({ offset, limit })
    return songsLists.items.map(x => SpotifyTracks(x.track))
  }

  async playMusic(songId: string) {
    await this.spotifyApi.queue(songId)
    await this.spotifyApi.skipToNext()
  }

  async getCurrentSong(): Promise<Songs> {
    const song = await this.spotifyApi.getMyCurrentPlayingTrack()
    return SpotifyTracks(song.item!)
  }

  async nextSong() { await this.spotifyApi.skipToNext() }
  async prevSong() { await this.spotifyApi.skipToPrevious() }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
