import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { EventComponent } from './components/event/event.component';
import { CommentComponent } from './components/comment/comment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'groups', component: UserGroupComponent },
  { path: 'groups/:id', component: UserGroupComponent },
  { path: 'events', component: EventComponent },
  { path: 'events/:id', component: EventComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'comments/:id', component: CommentComponent },
  // { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
