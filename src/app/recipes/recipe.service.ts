
import {Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';



export class RecipeService{

    recipesChanged =new Subject<Recipe[]>();

  private  recipes: Recipe[]=[
        new Recipe('Pizza', 'Delicious',
        'https://therecipecritic.com/wp-content/uploads/2018/08/zucchini_crust_pizza-1-of-1.jpg',
        [
          new Ingredient('base',1),
          new Ingredient('olives',5)  
        ]),
    
        new Recipe('SweetCorn Fried Rice', 'I am loving it!',
        'https://farm6.staticflickr.com/5568/15272346101_f7dbb07e83_o.jpg',
        [
          new Ingredient('rice',2),
          new Ingredient('sweetcorn',1)
        ])
      ];

      constructor(){

      }

      getRecipes(){
          return this.recipes.slice() ;
      }

      getRecipe(index: number)
      {
        return this.recipes[index];
      }

     

      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe:Recipe)
      {
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());

      }

      deleteRecipes(index: number)
      {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }

      setRecipes(recipes: Recipe[])
      {
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}