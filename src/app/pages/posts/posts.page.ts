import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController, LoadingController, IonRouterOutlet } from "@ionic/angular";
import { PostService } from "../../services/post/post.service";
import * as _ from "lodash";
const { Device } = Plugins;

import { PostCreatePage } from '../post-create/post-create.page';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  public pageTitle: string = "Manage Posts";
  posts = [];
  filter: string;

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(
    private router: Router,
    public postService: PostService,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.filter = "active";
   }

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

  async openPost(post) {
    let navigationExtras: NavigationExtras = {
      state: {
        post: post
      }
    };
    this.router.navigate(['/post'], navigationExtras);
  }

  async openCreate() {
    const modal = await this.modalController.create({
      component: PostCreatePage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
    });
    await modal.present();
  }

}
