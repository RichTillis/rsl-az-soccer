import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";

import { FavoritesService } from "../../services/favorites/favorites.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-my-teams",
  templateUrl: "./my-teams.page.html",
  styleUrls: ["./my-teams.page.scss"]
})
export class MyTeamsPage implements OnInit {
  public pageTitle: string = "My Favorite Teams";
  favorites$: Observable<any[]>;

  constructor(
    public favoritesService: FavoritesService,
    public router: Router
  ) {}

  ngOnInit() {
    this.favorites$ = this.favoritesService.getFavorites();
    // console.log(this.favorites$.length);
  }
}
