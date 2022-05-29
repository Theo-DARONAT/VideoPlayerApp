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

  addBookmarks() : void {
      const currentLink = this.data.getCurrentLink();
      if (currentLink != null){
        let isAlreadyAdded = false;
        this.data.getBookmarks().forEach(link => {
          if (link.link == currentLink)
            isAlreadyAdded = true;
        })
        if (!isAlreadyAdded){
          this.data.addBookmarks(currentLink);
        }
    }
  }

  showBookmarks(): void {
    this.show = !this.show;
  }

  selectVideo(bookmark: DataStructure) : void{
    const params = new URL(bookmark.link).searchParams;
    this.currentVideoId = params.get('v');
    this.bookmarkEvent.emit(this.currentVideoId);
  }

}
