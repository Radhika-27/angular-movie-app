import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieListingComponent } from './movie-listing/movie-listing.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'movie', component:MovieListingComponent}
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
