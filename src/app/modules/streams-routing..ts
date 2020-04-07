import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component'

let routes:Routes = [
  {
    path: '',
    component: StreamsComponent
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
