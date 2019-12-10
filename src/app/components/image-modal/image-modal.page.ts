import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  // @Input() img: string;
  img: any;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.img = this.navParams.get('img');
  }

  ngOnInit() { }

  zoom(zoomIn: boolean) { }

  close() {
    this.modalController.dismiss();
  }

}
