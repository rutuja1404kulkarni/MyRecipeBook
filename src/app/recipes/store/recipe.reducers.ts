import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes:State
}

export interface State {
    recipes: Recipe[];
}

const initialState : State={
   
    recipes:[
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
      ]

};

export function recipeReducer(state= initialState, action:RecipeActions.RecipeActions)
{
    switch(action.type){
        case(RecipeActions.SET_RECIPES):
        return {
            ...state,
            recipes: [...action.payload]
        };
        case(RecipeActions.ADD_RECIPES):
        return{
            ...state,
            recipes:[...state.recipes, action.payload]
        };
        case (RecipeActions.UPDATE_RECIPE):
        const recipe =state.recipes[action.payload.index];
        const updatedRecipe ={
            ...recipe,
            ...action.payload.updateRecipe
        };
        const recipes =[...state.recipes];
        recipes[action.payload.index]=updatedRecipe;
        return{
            ...state,
            recipes: recipes
        };

        case (RecipeActions.DELETE_RECIPE):
        const oldRecipes=[...state.recipes];
        oldRecipes.splice(action.payload, 1);
        return{
            ...state,
            recipes: oldRecipes
        };
        default:
        return state;
    }

}