import { Routes } from '@angular/router';
import { PostMainComponent } from './post-main/post-main.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: 'posts',
    component: PostMainComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
  },
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/posts',
  },
];
