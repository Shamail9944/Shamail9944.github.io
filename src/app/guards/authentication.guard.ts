import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {

  constructor(private router: Router, private spotifyService: SpotifyService) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token')

    if (!token) {
      this.noAuthentication()
    }

    return new Promise(async (res) => {
      const userCredentials = this.spotifyService.initializerService()
      if (await userCredentials) {
        res(true)
      } else
        res(this.noAuthentication())

    })
    return true;
  }

  noAuthentication() {
    localStorage.clear()
    this.router.navigate(['/login'])
    return false;
  }
}
