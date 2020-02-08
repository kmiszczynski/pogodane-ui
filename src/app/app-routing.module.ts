import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityWeatherComponent} from './components/city-weather/city-weather.component';
import {HomeComponent} from './components/home/home.component';
import {environment} from '../environments/environment';
import {CityMonthlyWeatherComponent} from './components/city-monthly-weather/city-monthly-weather.component';
import {InfoComponent} from './components/info/info.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: environment.weatherPath + '/:city', component: CityWeatherComponent },
  { path: environment.weatherPath + '/:city/:year', component: CityMonthlyWeatherComponent },
  { path: 'informacje', component: InfoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
