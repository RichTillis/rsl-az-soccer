import { Component, OnInit } from "@angular/core";
import { Plugins } from '@capacitor/core';
import { ModalController, MenuController } from "@ionic/angular";
import { FcmService } from "../../services/push-notifications/fcm.service";
import { Platform } from "@ionic/angular";
import * as _ from "lodash";
const { Device } = Plugins;

// import { OrgHeaderComponent } from '../../components/org-header/org-header.component';
import { ImageModalPage } from "../../components/image-modal/image-modal.page";
// import { FirebaseMessaging } from "@angular/fire";
import { AppFlowService } from "../../services/app-flow/app-flow.service";
import { PostService } from "../../services/post/post.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  public pageTitle: string = "2020 Shootout";
  posts = [];

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
    private appFlow: AppFlowService,
    public postService: PostService,
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    this.platform.ready().then(() => {
      this.initializeServices();
    });
    this.postService.postsData$.subscribe((data: any) => {
      this.posts = _.chain(data)
        .value();
      console.log(this.posts);
    });
  }

  async initializeServices(){
    const device = await Device.getInfo();
    if (device.platform === 'ios' || device.platform === 'android') {
      try {
        this.fcm.init()
        // wrap this in an environment var. in dev = false, in prd = true
        // this.appFlow.performManualUpdate()
      } catch (err) {
        console.warn(err)
      }
    }
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
