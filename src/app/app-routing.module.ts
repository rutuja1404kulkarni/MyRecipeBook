import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'recipes', component: RecipesComponent, children:[
    {path:'',component:RecipeStartComponent },
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
    {path:':id', component: RecipeDetailComponent},
    {path:':id/edit', component:RecipeEditComponent, canActivate: [AuthGuard]}
  ]},
  {path: 'signup',component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
 
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
