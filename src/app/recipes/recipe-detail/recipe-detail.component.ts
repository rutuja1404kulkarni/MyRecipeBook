import { Component, OnInit} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'; 
import * as fromApp from '../../store/app.reducers';
import { Observable, from } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import { take } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipeState: Observable<fromRecipe.State>;
   id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router :Router,
              private store: Store<fromApp.AppState>) {

     }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) =>{
        this.id= +params['id'];
        this.recipeState=this.store.select('recipes');
      }
    );

  }
  onAddToShoppingList(){
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe((recipeState: fromRecipe.FeatureState)=>
    {
      this.store.dispatch(new ShoppingListActions.AddIngredients
        (recipeState.recipes[this.id].ingredients));
    });
   
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }

  onDeleteRecipe()
  {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}