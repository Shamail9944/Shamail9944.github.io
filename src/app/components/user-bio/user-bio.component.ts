import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-bio',
  templateUrl: './user-bio.component.html',
  styleUrls: ['./user-bio.component.css']
})
export class UserBioComponent implements OnInit {

  signOutIcon = faSignOutAlt
  user!: User;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user
    console.log(this.spotifyService.user);
  }

  logout() {
    this.spotifyService.logout()
  }

}
