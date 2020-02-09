import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.page.html',
  styleUrls: ['./rules.page.scss'],
})
export class RulesPage implements OnInit {
  public pageTitle: string = "Tournament Rules";

  constructor() { }

  ngOnInit() {
  }

}
