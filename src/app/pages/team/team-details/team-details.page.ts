import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-team-details",
  templateUrl: "./team-details.page.html",
  styleUrls: ["./team-details.page.scss"]
})
export class TeamDetailsPage implements OnInit {
  teamId: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log("someDatasdfsdfdsdf:");
    this.teamId = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.teamId);
    // const someData = this.activatedRoute.parent.params.pipe(
    //   switchMap(params => {
    //     return params.id;
    //   })
    // );
    // console.log(someData)
  }
}
