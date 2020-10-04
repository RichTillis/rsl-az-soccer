import { Component, OnInit, Input } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'org-header',
  templateUrl: './org-header.component.html',
  styleUrls: ['./org-header.component.scss'],
})
export class OrgHeaderComponent implements OnInit {

  @Input() public pageTitle: string;
  rslLogo: string = 'assets/images/rsl_az_logo.svg';

  constructor() { }

  ngOnInit() {
    console.log('pagetitle: ', this.pageTitle);
  }

  async redirectToTarSite(e){
    e.preventDefault();
    await Browser.open({ url: "https://www.tucsonrealtors.org/" });

  }

}
