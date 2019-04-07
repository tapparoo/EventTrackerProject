import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GroupComponent } from './components/group/group.component';
import { EventComponent } from './components/event/event.component';
import { CommentComponent } from './components/comment/comment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { NewEventComponent } from './components/new-event/new-event.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserPageComponent },
  { path: 'users/:id', component: UserPageComponent },
  { path: 'newuser', component: NewUserComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'groups/:id', component: GroupComponent },
  { path: 'newgroup', component: NewGroupComponent },
  { path: 'events', component: EventComponent },
  { path: 'events/:id', component: EventComponent },
  { path: 'newevent', component: NewEventComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'comments/:id', component: CommentComponent },
  // { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
