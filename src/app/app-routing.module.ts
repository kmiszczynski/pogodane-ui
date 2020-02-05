import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityWeatherComponent} from './components/city-weather/city-weather.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'weather/:city', component: CityWeatherComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
