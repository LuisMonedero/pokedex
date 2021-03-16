import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: ':region/pokedex',  component: PokedexComponent },
  { path: ':region/pokedex/:name',  component: PokeDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
