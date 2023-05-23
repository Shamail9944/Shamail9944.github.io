import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.verifyCallbackToken()
  }

  verifyCallbackToken() {
    const token = this.spotifyService.getCallbackCode()
    console.log(token);
    if (!!token) {
      this.spotifyService.defineAccessToken(token)
      this.router.navigate(['/player/home'])
    }

  }

  clicked() {
    window.location.href = this.spotifyService.spotifyAuthLogin();
  }




}
