import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './components/e404/e404.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'user/:id', component: ViewUserComponent},
  {path: 'newuser', component: FormComponent},
  {path: 'updateuser/:id', component: UpdateFormComponent},
  {path: '**', component: E404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
