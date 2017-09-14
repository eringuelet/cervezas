import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserEditComponent } from './components/user-edit.component';
import { UserListComponent } from './components/user-list.component';

import { HomeComponent } from './components/home.component';

import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent} from './components/artist-add.component';
import { ArtistEditComponent} from './components/artist-edit.component';
import { ArtistDetailComponent} from './components/artist-detail.component';

import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';

import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';

const appRoutes: Routes = [
    {path: '', component: UserListComponent},
    {path: 'users', component: UserListComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'artista/:id', component: ArtistDetailComponent},
    {path: 'crear-cancion/:album', component: SongAddComponent},
    {path: 'editar-cancion/:id', component: SongEditComponent},
    {path: 'crear-artista', component: ArtistAddComponent},
    {path: 'crear-album/:artist', component: AlbumAddComponent},
    {path: 'editar-album/:id', component: AlbumEditComponent},
    {path: 'album/:id', component: AlbumDetailComponent},
    {path: 'editar-artista/:id', component: ArtistEditComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path: '**', component: ArtistListComponent}    
]

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);