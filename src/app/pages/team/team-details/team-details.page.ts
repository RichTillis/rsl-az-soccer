import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { TournamentService } from "../../../services/tournament.service";

@Component({
  selector: "app-team-details",
  templateUrl: "./team-details.page.html",
  styleUrls: ["./team-details.page.scss"]
})
export class TeamDetailsPage implements OnInit {
  teamId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public tournamentService: TournamentService
  ) {}

  ngOnInit() {
    console.log("team details:");
    // this.teamId = this.activatedRoute.snapshot.paramMap.get("id");
    // console.log(this.teamId);
    const someData = this.activatedRoute.parent.params.subscribe(
      (params: Params) => {
        this.teamId = params.teamId;
        console.log(this.teamId);
        this.tournamentService.setTeamId(this.teamId);
      }
    );
  }
}
