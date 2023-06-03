import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConexionesModule } from './conexiones/conexiones.module';
import { FeedModule } from './feed/feed.module';
import { GrupoModule } from './grupo/grupo.module';
import { LoginModule } from './login/login.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NgxLoadingModule } from 'ngx-loading';
import { ProfileModule } from './profile/profile.module';
import { AboutUsModule } from './about-us/about-us.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ConexionesModule,
    FeedModule,
    GrupoModule,
    LoginModule,
    ProfileModule,
    NotificationsModule,
    AboutUsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
