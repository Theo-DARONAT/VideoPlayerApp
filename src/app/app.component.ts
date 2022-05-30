import { Component } from '@angular/core';
import { Video } from './model/video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'YouRelief';
  color = 'red';

  /** Used to communicated between components.
   * searchbar, history and bookmark can change the current video,
   * so they output current video Id.
   * video-view component needs a video id in input to run the good one.
   */
  currentVideoId: any;

  setCurrentVideoId(videoId: string){
    this.currentVideoId = videoId;
  }

}
