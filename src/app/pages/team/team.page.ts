import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-team",
  templateUrl: "./team.page.html",
  styleUrls: ["./team.page.scss"]
})
export class TeamPage implements OnInit {
  teamId: any;

  constructor(private activatedRoute: ActivatedRoute,) {}

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
