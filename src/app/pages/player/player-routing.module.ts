import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { HomeComponent } from '../home/home.component';
import { AlbumDetailsComponent } from '../album-details/album-details.component';



const routes: Routes = [
    {
        path: '', component: PlayerComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'albumDetails/:type/:id', component: AlbumDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayerRoutingModule { }