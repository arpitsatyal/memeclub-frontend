import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AppRoutingModule } from './app.routing';
import { StreamsModule } from './modules/streams.module';
import {CookieService} from 'ngx-cookie-service';
import { MemeapiComponent } from './memeapi/memeapi.component';


@NgModule({
  declarations: [
    AppComponent,
    MemeapiComponent
    ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    StreamsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
