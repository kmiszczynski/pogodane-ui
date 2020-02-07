import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityWeatherComponent} from './components/city-weather/city-weather.component';
import {HomeComponent} from './components/home/home.component';
import {environment} from '../environments/environment';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: environment.weatherPath + '/:city', component: CityWeatherComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
