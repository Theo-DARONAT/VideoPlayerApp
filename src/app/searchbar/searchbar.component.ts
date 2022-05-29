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

  searchVideo() : void {
    const params = new URL(this.videoLink).searchParams;
    this.currentVideoId = params.get('v');
    
    this.isNotValidLink = (this.currentVideoId == null);
    if (!this.isNotValidLink){
      this.data.addHistory(this.videoLink);
      this.data.setCurrentLink(this.videoLink);
      this.sendVideoId();
    }
  }

  sendVideoId() : void {
    this.videoIdEvent.emit(this.currentVideoId);
  }

}