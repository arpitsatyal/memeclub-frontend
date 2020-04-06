import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router'

let routes: Routes = [
    {
        path: '', loadChildren: './modules/auth/auth.module#AuthModule'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}