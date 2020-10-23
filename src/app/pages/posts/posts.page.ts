import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController, MenuController, LoadingController } from "@ionic/angular";
import { FcmService } from "../../services/push-notifications/fcm.service";
import { PostService } from "../../services/post/post.service";
import { Platform } from "@ionic/angular";
import * as _ from "lodash";
const { Device } = Plugins;

// import { OrgHeaderComponent } from '../../components/org-header/org-header.component';
import { ImageModalPage } from "../../components/image-modal/image-modal.page";
// import { FirebaseMessaging } from "@angular/fire";
import { AppFlowService } from "../../services/app-flow/app-flow.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  public pageTitle: string = "Manage Posts";
  posts:any = [];

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(
    public postService: PostService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {
      this.postService.postsData$.subscribe((data: any) => {
        this.posts = _.chain(data)
          .value();
        console.log(this.posts);
      });
    })
  }

  async displayLoader() {
    const loading = await this.loadingController.create({
      message: "Getting Posts...",
      spinner: "crescent",
      duration: 1000
    });
    await loading.present();
    return loading;
  }

}
