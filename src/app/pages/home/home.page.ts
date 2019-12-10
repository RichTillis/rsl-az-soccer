import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { ImageModalPage } from "../../components/image-modal/image-modal.page";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  posts = [
    {
      title: "Welcome to the 2020 Shootout!",
      img: "shootout2020logo",
      body: " This year the Tucson Association of Realtors® Shootout is proudly presented by RSL-AZ Southern Arizona SoccervClub. We are honored to celebrate our 30th year of this amazing event.<br/><br/>We look forward to hosting new and returning teams for another great soccer weekend in Tucson, AZ."
    },
    {
      title: "Soccer Olympics",
      img: "Olympics-Events-Locator-maps-Kino",
      body: " The Soccer Olympics and opening ceremonies have been a part of the Fort Lowell Shootout Soccer Tournament since it was founded. The Friday night festivities include a parade, live music, food trucks, games/rides, and more. The big Friday Night event is the one of kind, Soccer Olympics."
    },
    {
      title: "Soccer Olympics",
      img: "madison",
      body: " The Soccer Olympics and opening ceremonies have been a part of the Fort Lowell Shootout Soccer Tournament since it was founded. The Friday night festivities include a parade, live music, food trucks, games/rides, and more. The big Friday Night event is the one of kind, Soccer Olympics."
    },

  ];

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

  // async openPreview(img) {
  //   console.log(img);
  //   const modal = await this.modalController.create({
  //     component: ImageModalPage,
  //     componentProps: {
  //       'img': 'wtf'
  //     }
  //   });
  //   return await modal.present();
  // }


}
