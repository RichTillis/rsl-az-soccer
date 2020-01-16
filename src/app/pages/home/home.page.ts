import { Component, OnInit } from "@angular/core";
import { ModalController, MenuController } from "@ionic/angular";
import { FcmService } from "../../services/push-notifications/fcm.service";
import { Platform } from "@ionic/angular";



import { ImageModalPage } from "../../components/image-modal/image-modal.page";
import { FirebaseMessaging } from "@angular/fire";
import { AppFlowService } from "../../services/app-flow/app-flow.service";

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
      img: "Kino-Opening-Ceremony",
      body: "The opening ceremonies have been a part of the Fort Lowell Shootout Soccer Tournament since it was founded. ",
      body2: "The Friday night festivities include a parade, live music, food trucks, games/rides, and more. The big Friday Night event is the one of kind.",
      body3: "Gates open at 3pm. Opening Ceremony, followed directly by the Parade of Teams will begin at 6pm. Soccer Olympics to start at 7:15pm.",
      link: ""
    },
    {
      title: "Tucson Roadrunners Tickets!",
      img: "Roadrunners-Game-FB",
      body: "The Tucson Roadrunners are proud to partner with The Tucson Association of REALTORS Fort Lowell Shootout! $5 from each ticket purchased through this offer will support the tournament. ",
      body2: "Everyone is invited to wear their soccer jersey to represent their team and celebrate the Shootout. ",
      body3: "",
      link: "http://www.rrtix.com/fort",
      linkTitle: "Buy Tickets Here!"
    },
    {
      title: "Soccer Olympics",
      // img: "Olympics-Events",
      images: ["Olympics-Events","dribbling", "footGolf", "juggling", "shootout"],
      body: "The Soccer Olympics have been a part of the Fort Lowell Shootout Soccer Tournament since it was founded. ",
      body1: "Its a fun and exciting way for young athletes to showcase their technical skills and abilities. Soccer Olympics will start at 7:15pm on Friday night.",
      body2: "Skills challenges include: Juggling, Foot Glof, Dribble Relay, & The Shootout (Penalty Kicks)",
      link: "",
      links: [
        { 
          linkTitle: " Friday Night Schedules",
          link: "http://fortlowellshootout.org/wp-content/uploads/2020/01/2020-Fri-Olympics-schedules-1.pdf"
        },
        {
          linkTitle: " Saturday Night Schedules",
          link: "http://fortlowellshootout.org/wp-content/uploads/2020/01/2020-Saturday-Olympics-Schedules.pdf"
        },
        {
          linkTitle: " Juggling Volunteer Instructions",
          link: "http://fortlowellshootout.org/wp-content/uploads/2020/01/Juggling-Vol-Instrs-2020.pdf"
        },
        {
          linkTitle: " Foot Golf Volunteer Instructions",
          link: "http://fortlowellshootout.org/wp-content/uploads/2020/01/Footgolf-Vol-Instrs-2020.pdf"
        },
        {
          linkTitle: " Dribbling Volunteer Instructions",
          link: "http://fortlowellshootout.org/wp-content/uploads/2020/01/Dribbling-Vol-Instrs-2020.pdf"
        },
        { 
          linkTitle: " More Info",
          link: "https://fortlowellshootout.org/soccer-olympics/"
        },
      ]
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
    {
      title: "Tournament Field Maps",
      //img: "kinoLogo",
      images: ["Kino-entire-complex","Olympics-Events","Kino-North-Fields","Kino-South-Fields"],
      // body1: "Our Friday Night Opening Ceremony will adhere to a strict clear bag policy for the safety of all of our athletes, families, and spectators in attendance. Please refer to the Kino Sports Complex – Clear Bag Policy. Please see the accepted and prohibited items lists above.",
      // body2: "Spectators will only be allowed to bring select items into the Kino Sports Complex on game days.",
      // body3: "Coaches will be allowed to bring in coolers with sports drinks and water for players.",
      // link: ""
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
    private menu: MenuController,
    private platform: Platform,
    private fcm: FcmService,
    private appFlow: AppFlowService
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    this.platform.ready().then(() => {
      if(this.platform.is('ios') || this.platform.is('android')){
        try {
          this.fcm.init()
          //this.appFlow.performManualUpdate()
        } catch (err) {
          console.warn(err)
        }
      }
    });
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
