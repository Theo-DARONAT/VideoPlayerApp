import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataService } from '../data.service';
import { DataStructure } from '../data-structure';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  })
export class SearchbarComponent implements OnInit {

  videoLink : string = '';
  currentVideoId: any;
  isNotValidLink: boolean = false;

  @Output() videoIdEvent = new EventEmitter<string>()

  constructor(private data : DataService) { }

  ngOnInit(): void {
  }

  // Search a video with the link given in the textbox.
  searchVideo() : void {
    const videoUrl = new URL(this.videoLink);
    const params = videoUrl.searchParams;
    this.currentVideoId = params.get('v');
    
    // Check if the given link is not a valid youtube video link.
    // we want to display a message when the link is wrong.
    this.isNotValidLink = (this.currentVideoId == null);

    if (!this.isNotValidLink){
      // Add link to history data
      this.data.addHistory(this.videoLink);
      // Set the current link (Used for bookmarks)
      this.data.setCurrentLink(this.videoLink);
      this.sendVideoId();
    }
  }

  // Output the video id (See app.component.ts)
  sendVideoId() : void {
    this.videoIdEvent.emit(this.currentVideoId);
  }

}