import { Component, OnInit } from "@angular/core";
import { ModalController, MenuController } from "@ionic/angular";


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
      body: "This year the Tucson Association of Realtors® Shootout is proudly presented by RSL-AZ Southern Arizona Soccer Club.",
      body1: "We are honored to celebrate our 30th year of this amazing event. We look forward to hosting new and returning teams for another great soccer weekend in Tucson, AZ."
    },    
    {
      title: "Friday Opening Ceremonies",
      img: "Olympics-Events-Locator-maps-Kino",
      body: "The opening ceremonies have been a part of the Fort Lowell Shootout Soccer Tournament since it was founded. ",
      body2: "The Friday night festivities include a parade, live music, food trucks, games/rides, and more. The big Friday Night event is the one of kind.",
      body3: "Gates open at 3pm. Opening Ceremony, followed directly by the Parade of Teams will begin at 6pm. Soccer Olympics to start at 7:15pm.",
      link: ""
    },
    {
      title: "Soccer Olympics",
      img: "olympics",
      body: "The Soccer Olympics have been a part of the Fort Lowell Shootout Soccer Tournament since it was founded. ",
      body1: "Its a fun and exciting way for young athletes to showcase their technical skills and abilities. Soccer Olympics will start at 7:15pm on Friday night.",
      body2: "Skills challenges include: Juggling, Foot Glof, Dribble Relay, & The Shootout (Penalty Kicks)",
      link: ""
    },
    {
      title: "Kino Sports Complex Rules",
      img: "kinoLogo",
      images: ["clear-bag-web","guest-allowable-items-updated","patron-items-not-allowed-updated","players-and-coaches-updated"],
      body1: "Our Friday Night Opening Ceremony will adhere to a strict clear bag policy for the safety of all of our athletes, families, and spectators in attendance. Please refer to the Kino Sports Complex – Clear Bag Policy. Please see the accepted and prohibited items lists above.",
      body2: "Spectators will only be allowed to bring select items into the Kino Sports Complex on game days.",
      body3: "Coaches will be allowed to bring in coolers with sports drinks and water for players.",
      link: ""
    },
  ];

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(
    private modalController: ModalController,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(true);
  }

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
