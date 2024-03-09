import { Routes } from '@angular/router';
import { PostMainComponent } from './post-main/post-main.component';

export const routes: Routes = [
  {
    path: 'posts',
    component: PostMainComponent,
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
