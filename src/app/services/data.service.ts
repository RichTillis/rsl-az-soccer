import { Injectable } from '@angular/core';

interface UserData {
  fbid: number;
  username: string;
  picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: UserData = {
    fbid: null,
    username: null,
    picture: null
  }

  constructor() { }
}
