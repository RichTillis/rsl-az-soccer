import { Component, OnInit } from "@angular/core";
import { FacebookService } from "../../services/facebook.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  posts: any;
  formattedPosts: any[] = [];

  constructor(
    private facebookService: FacebookService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    // this.presentLoading().then(() => {
    //   this.facebookService.getPosts().subscribe(data => {
    //     this.posts = data;
    //     this.formattedPosts = data.map(this.mapPosts);
    //     console.log(this.formattedPosts);
    //   });
    // });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Retrieving Data",
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

  redirectToImage(url: string) {
    this.openWithCordovaBrowser(url);
  }

  public openWithCordovaBrowser(url: string) {
    let target = "_self";
    // let browser = this.theInAppBrowser.create(url, target, this.options);
    // browser.show();
  }
}
