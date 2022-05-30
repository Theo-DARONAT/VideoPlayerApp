import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { DataList, DataStructure } from './data-structure';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Base URL
  bookmarkUrl = 'http://localhost:8000/bookmark';
  historyUrl = 'http://localhost:8000/history';

  history: any = [];

  bookmarks: any = [];

  // Current video link (Used in bookmarks)
  currentLink: any = null;

  constructor(private http: HttpClient) { }
  
  setCurrentLink(newLink: string) : void{
    this.currentLink = newLink;
  }

  getCurrentLink() : any {
    return this.currentLink;
  }

  // Send the Get request 
  getRequest(url: string) : Observable<DataList> {
    return this.http.get<DataList>(url);
  }

  /** Convert the response of the Get request in list (history or bookmarks).
   *  url is the url of the request.
   *  name is used in error case, allows to know if the error occured in history or bookmarks.
   *  isHistory allows me to make the difference between history and bookmark without string comparison.
   */  
  getRequestConvert(url: string, name: string, isHistory: boolean) : void {
    this.getRequest(url).subscribe((data) => {
      if (isHistory)
        this.history = data;
      else
        this.bookmarks = data;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('[DataService] get' + name + ' error occured.');
      } else {
        console.log('[server] get' + name + ' error occured.');
      }
    });
  }
  
  /** Update the history list by sending a get request
   *  Not used in component (except at initialization), we want to update the list
   *  only after adding a link.
  */
  updateHistory() : void {  
    console.log("Update History");
    this.getRequestConvert(this.historyUrl, 'History', true);
  }

  // Update the bookmarks list by sending a get request
  updateBookmarks() : void {
    console.log("Update Bookmark");
    this.getRequestConvert(this.bookmarkUrl, 'Bookmarks', false);
  }

  /** This is the part used in component.
   *  Return the history list.
   */
  getHistory() : DataStructure[] {
    return this.history;
  }

  // Return the bookmarks list.
  getBookmarks() : DataStructure[] {
    return this.bookmarks;
  }
  

  //same functions, could be merged

  // Add link to the history by sending a post request
  addHistory(newLink: string) : void {
    console.log("Add History");
    const val = {link: newLink};
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8000');
    headers.append('Content-Type', 'application/json');
    
    this.http.post<any>(this.historyUrl + "/add", val, {headers: headers}).subscribe(data =>{
      this.updateHistory();
    });
    
  }

  // Add link to the bookmarks by sending a post request
  addBookmarks(newLink: string) : void {
    console.log("Add Bookmark");
    const val = {link: newLink};
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8000');
    headers.append('Content-Type', 'application/json');
    
    this.http.post<any>(this.bookmarkUrl + "/add", val, {headers: headers}).subscribe(data =>{
      this.updateBookmarks();
    });
  }

}
