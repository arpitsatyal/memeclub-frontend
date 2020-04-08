import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsRoutingModule } from './streams-routing.';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostsFormComponent } from '../components/posts-form/posts-form.component';

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SidebarComponent,
    PostsComponent,
    PostsFormComponent
  ],
  imports: [
    CommonModule,
    StreamsRoutingModule
  ],
  providers: [TokenService]
})
export class StreamsModule { }
