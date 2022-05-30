import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataStructure } from '../data-structure';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  show : boolean = false;
  currentVideoId: any;
  @Output() bookmarkEvent = new EventEmitter<string>()

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.data.updateBookmarks();
  }

  // Add the current video to bookmarks.
  addBookmarks() : void {
      const currentLink = this.data.getCurrentLink();
      if (currentLink != null){
        let isAlreadyAdded = false;
        // If the link is already persent in bookmarks, don't add it again.
        this.data.getBookmarks().forEach(link => {
          if (link.link == currentLink)
            isAlreadyAdded = true;
        })
        if (!isAlreadyAdded){
          this.data.addBookmarks(currentLink);
        }
    }
  }

  // Show or hide bookmarks
  showBookmarks(): void {
    this.show = !this.show;
  }


  // Search the video with the link that the user clicks on
  selectVideo(bookmark: DataStructure) : void{
    const params = new URL(bookmark.link).searchParams;
    this.currentVideoId = params.get('v');
    // Update current link, but useless because
    // it is only used to add bookmarks and a link
    // cannot be twice in the bookmarks.
    this.data.setCurrentLink(bookmark.link);
    // Output video id (see app.component.ts)
    this.bookmarkEvent.emit(this.currentVideoId);
  }

}
