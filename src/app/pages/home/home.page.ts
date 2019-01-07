import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FacebookService } from "../../services/facebook/facebook.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  posts: any;
  formattedPosts: any[] = [];

  constructor(
    public loadingController: LoadingController,
    private facebookService: FacebookService
  ) {
    // this.facebookService.getPosts().pipe(map(
    //   data => data.map(this.mapPosts)));
  }

  ngOnInit() {
    // this.gettingActivityLoader().then(() => {
      this.facebookService.getPosts().subscribe(data => {
        this.posts = data;
        this.formattedPosts = data.map(this.mapPosts);
        console.log(this.formattedPosts);
      });
    // });
  }

  // getPosts(){
  //   this.facebookService.getPosts();
  // }

  async gettingActivityLoader() {
    const loading = await this.loadingController.create({
      message: "Getting Activity...",
      duration: 2000
    });
    return await loading.present();
  }

  mapPosts = post => {
    return {
      from: post.from,
      time: post.created_time * 1000, // convert to milliseconds
      message: post.message,
      photos: this.getPhotos(post)
    };
  };

  getPhotos = post => {
    if (!post.attachments) return [];

    let attachments =
      post.attachments.data[0].subattachments || post.attachments;

    return (
      attachments.data
        //.filter(x => x.type == "minutiae_event")  //"photo_link_share", "photo", "video_inline"
        .map(x => x.media.image)
    );
  };
}
