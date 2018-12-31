import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-my-teams",
  templateUrl: "./my-teams.page.html",
  styleUrls: ["./my-teams.page.scss"]
})
export class MyTeamsPage implements OnInit {
  constructor(
    public favoritesService: FavoritesService,
    public router: Router
  ) {}

  ngOnInit() {}

  hasFavs() {
    // return this.favoritesService.hasFavs();
    return false;
  }

  goToTeams() {
    this.router.navigate(["/teams"]);
  }
}
