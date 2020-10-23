import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreatePage } from './post-create.page';

const routes: Routes = [
  {
    path: '',
    component: PostCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostCreatePageRoutingModule {}
