import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './componenets/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { EventComponent } from './components/event/event.component';
import { CommentComponent } from './components/comment/comment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    HomeComponent,
    UserGroupComponent,
    EventComponent,
    CommentComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
