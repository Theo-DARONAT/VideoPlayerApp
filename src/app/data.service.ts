import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

import { DataList, DataStructure } from './data-structure';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  bookmarkUrl = 'http://localhost:8000/bookmark';
  historyUrl = 'http://localhost:8000/history';

  history: any = [];

  bookmarks: any = [];

  // it is a string but it could be null a the beginning
  currentLink: any = null;

  constructor(private http: HttpClient) { }

  setCurrentLink(newLink: string) : void{
    this.currentLink = newLink;
  }

  getCurrentLink() : any {
    return this.currentLink;
  }

  getRequest(url: string) : Observable<DataList> {
    return this.http.get<DataList>(url);
  }

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
  
  updateHistory() : void {  
    console.log("Update History");
    this.getRequestConvert(this.historyUrl, 'History', true);
  }

  updateBookmarks() : void {
    console.log("Update Bookmark");
    this.getRequestConvert(this.bookmarkUrl, 'Bookmarks', false);
  }

  getHistory() : DataStructure[] {
    return this.history;
  }

  getBookmarks() : DataStructure[] {
    return this.bookmarks;
  }
  

  //same functions, could be merged
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
