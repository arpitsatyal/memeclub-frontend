import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router'

let routes: Routes = [
    {
        path: '', loadChildren: './modules/auth.module#AuthModule'
    },
    {
        path: 'streams', loadChildren: './modules/streams.module#StreamsModule'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}