import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolleesComponent } from './components/enrollees/enrollees.component';
import { HomeComponent } from './components/home/home.component';
import { SearchEnrolleeComponent } from './components/search-enrollee/search-enrollee.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'enrollee', component: EnrolleesComponent},
  {path: 'search', component: SearchEnrolleeComponent},
  {path: '', redirectTo: '/enrollee', pathMatch: 'full'} // redirecting back to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
