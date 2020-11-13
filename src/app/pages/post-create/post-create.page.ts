import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Link } from '../../interfaces/link';
import { Post } from '../../interfaces/post';
import { PostService } from "../../services/post/post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {
  public pageTitle: string = "Create Post";
  post: any;
  public createPostForm: FormGroup;

  constructor(
    private modalController: ModalController, 
    private loadingController: LoadingController,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      images: this.formBuilder.array([
        this.initSliderImages()
      ]),
      body: this.formBuilder.array([
        this.initBodyLine()
      ]),
      links: this.formBuilder.array([
        this.initLinks()
      ])   
    });
  }

  initSliderImages() : FormGroup {
    return this.formBuilder.group({
      image: ['', ]
    })
  }

  initBodyLine() : FormGroup {
    return this.formBuilder.group({
      line: ['', ]
    })
  }

  initLinks() : FormGroup {
    return this.formBuilder.group({
      link: ['', ],
      linkTitle: ['', ] 
    })
  }

  addNewImageField() : void {
    const control = <FormArray>this.createPostForm.controls.images;
    control.push(this.initSliderImages());
  }

  removeImageField(i : number) : void {
   const control = <FormArray>this.createPostForm.controls.images;
   control.removeAt(i);
  }

  addNewLineField() : void {
    const control = <FormArray>this.createPostForm.controls.body;
    control.push(this.initBodyLine());
  }

  removeLineField(i : number) : void {
   const control = <FormArray>this.createPostForm.controls.body;
   control.removeAt(i);
  }

  addNewLinkField() : void {
    const control = <FormArray>this.createPostForm.controls.links;
    control.push(this.initLinks());
  }

  removeLinkField(i : number) : void {
   const control = <FormArray>this.createPostForm.controls.links;
   control.removeAt(i);
  }

  removeField(control : FormArray, i : number) : void {
    control.removeAt(i);
   }

  async createPost() {
    const loading = await this.loadingController.create();
    await loading.present();
    let newLinks = [];

    this.createPostForm.value.links.forEach(function(linkItem) {
      if(linkItem.link){
        let newLink: Link = {
          link: linkItem.link,
          linkTitle: linkItem.linkTitle
        }
        newLinks.push(newLink);
      }
    })
  
    const newPost: Post = {
      title: this.createPostForm.value.title,
      images: this.createPostForm.value.images,
      body: this.createPostForm.value.body,
      links: newLinks,
      status: "draft"
    }

    this.postService
      .createPost(newPost)
      .then(
        (res) => {
          loading.dismiss();
          this.close();
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: ':(',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      )
      return loading;
  }

  close() {
    this.modalController.dismiss();
  }

}
