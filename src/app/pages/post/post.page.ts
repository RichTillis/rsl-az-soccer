import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IonRouterOutlet, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { ImageModalPage } from '../../components/image-modal/image-modal.page';
import { PostService } from '../../services/post/post.service';
import { PostEditPage } from '../post-edit/post-edit.page';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public pageTitle: string = "Post";
  post: Post;

  constructor(
    public postService: PostService,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
      }
    });
  }

  ngOnInit() {
    console.log(this.post);
  }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

  async openEdit() {
    console.log(this.post);
    const modal = await this.modalController.create({
      component: PostEditPage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        post: this.post
      },
    });
    await modal.present();
  }

  markAsArchive() {
    this.post.status = "archived";
    this.postService.updatePost(this.post);
  }
  markAsDraft() {
    this.post.status = "draft";
    this.postService.updatePost(this.post);
  }
  markAsActive() {
    this.post.status = "active";
    this.postService.updatePost(this.post);
  }
}
