import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FavoritesService } from "../../services/favorites/favorites.service";

@Component({
  selector: "app-my-teams",
  templateUrl: "./my-teams.page.html",
  styleUrls: ["./my-teams.page.scss"]
})
export class MyTeamsPage implements OnInit {
  favorites$: any;

  constructor(
    public favoritesService: FavoritesService,
    public router: Router
  ) {}

  ngOnInit() {
    this.favorites$ = this.favoritesService.getFavorites();
    console.log(this.favorites$.length);
  }
}
