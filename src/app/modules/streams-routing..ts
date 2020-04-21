import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component'
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { UsersComponent } from '../components/users/users.component';
import { FollowingComponent } from '../components/users/following/following.component';
import { followersComponent } from '../components/users/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';


let routes:Routes = [
  {
    path: '',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/followers',
    component: followersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
