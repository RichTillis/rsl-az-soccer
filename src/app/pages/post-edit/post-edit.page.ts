import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { ModalController, NavParams, IonRouterOutlet, LoadingController, AlertController } from '@ionic/angular';
import { PostService } from "../../services/post/post.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.page.html',
  styleUrls: ['./post-edit.page.scss'],
})
export class PostEditPage implements OnInit {
  public pageTitle: string = "Edit Post";
  post: any;
  editPostForm: FormGroup;

  constructor(
    private modalController: ModalController, 
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navParams: NavParams,
    public formBuilder: FormBuilder,
    private postService: PostService,
    ) {
    this.post = this.navParams.get('post');
   }

  ngOnInit() {
    this.editPostForm = this.formBuilder.group({
      id: [this.post.id],
      title: [this.post.title, Validators.required],
      body: [this.post.body, Validators.required],
      status: [this.post.status, Validators.required]
      // link: [this.post.link.link, Validators.required],
      // linkTitle: [this.post.link.linkTitle, Validators.required]      
    });
  }

  async savePost() {
    const loading = await this.loadingController.create();
    //await loading.present();
    console.log("am i here");

    this.postService
      .updatePost(this.editPostForm.value)
      // .then(
      //   (res) => {
      //     loading.dismiss();
      //     this.close();
      //   },
      //   async (err) => {
      //     loading.dismiss();
      //     const alert = await this.alertController.create({
      //       header: ':(',
      //       message: err.message,
      //       buttons: ['OK'],
      //     });

      //     await alert.present();
      //   }
      // )
      //return loading;
  }

  close() {
    this.modalController.dismiss();
  }

}
