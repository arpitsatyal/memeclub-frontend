import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AppRoutingModule } from './app.routing';
import { StreamsModule } from './modules/streams.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    StreamsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
