import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsRoutingModule } from './streams-routing.';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostsFormComponent } from '../components/posts/posts-form/posts-form.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SidebarComponent,
    PostsComponent,
    PostsFormComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StreamsRoutingModule
  ],
  providers: [TokenService, PostService]
})
export class StreamsModule { }
