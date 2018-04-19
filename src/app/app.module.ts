import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING} from './app.routes';

import { PostsService } from './services/posts.service';
import { AuthService } from './services/auth.service';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { YourOwnCarsComponent } from './components/your-own-cars/your-own-cars.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostsComponent,
    YourOwnCarsComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE'
    })
  ],
  providers: [
    PostsService, 
    AuthService,
    AuthGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
