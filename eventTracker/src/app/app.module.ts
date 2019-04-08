import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';
import { CommentComponent } from './components/comment/comment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupComponent } from './components/group/group.component';
import { GroupService } from './services/group.service';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { EventService } from './services/event.service';
import { FilterUsersPipe } from './pipes/filter-users.pipe';
import { FilterGroupsPipe } from './pipes/filter-groups.pipe';
import { FilterEventsPipe } from './pipes/filter-events.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GroupComponent,
    EventComponent,
    CommentComponent,
    NotFoundComponent,
    UserPageComponent,
    NewUserComponent,
    NewGroupComponent,
    NewEventComponent,
    FilterUsersPipe,
    FilterGroupsPipe,
    FilterEventsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    GroupService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
