import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'org-header',
  templateUrl: './org-header.component.html',
  styleUrls: ['./org-header.component.scss'],
})
export class OrgHeaderComponent implements OnInit {

  @Input() public pageTitle: string;

  constructor() { }

  ngOnInit() {
    console.log('pagetitle: ', this.pageTitle);
  }

}
