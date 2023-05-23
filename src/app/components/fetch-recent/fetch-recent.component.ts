import { Component } from '@angular/core';

@Component({
  selector: 'app-fetch-recent',
  templateUrl: './fetch-recent.component.html',
  styleUrls: ['./fetch-recent.component.css']
})

export class FetchRecentComponent {

  searchRecent = ['Pakistan', 'India', 'Iran', 'Bangladesh', 'Nepal', 'Srilanka']

  searchField = ''

  defineSearches(search: string) {
    this.searchField = search
  }

  searchThis() {
    console.log("sarch This", this.searchField);
  }

}
