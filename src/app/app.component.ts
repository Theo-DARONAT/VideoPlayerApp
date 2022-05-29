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

  currentVideoId: any;

  setCurrentVideoId(videoId: string){
    this.currentVideoId = videoId;
  }

}
