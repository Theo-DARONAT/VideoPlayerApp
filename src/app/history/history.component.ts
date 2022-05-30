import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { DataStructure } from '../data-structure';
import { DataService } from '../data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  currentVideoId: any;
  @Output() historyEvent = new EventEmitter<string>();

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.data.updateHistory();
  }

  // Search the video with the link that the user clicks on
  // The link is not added to history, I think it's useless
  selectVideo(history: DataStructure) : void{
    const params = new URL(history.link).searchParams;
    this.currentVideoId = params.get('v');
    // Set the current video link (Use for bookmark)
    this.data.setCurrentLink(history.link);
    // Output video id (see app.component.ts)
    this.historyEvent.emit(this.currentVideoId);
  }

}
