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

  selectVideo(history: DataStructure) : void{
    const params = new URL(history.link).searchParams;
    this.currentVideoId = params.get('v');
    this.data.setCurrentLink(history.link);
    this.historyEvent.emit(this.currentVideoId);
  }

}
