import { UnitEnum } from "./enum";

export interface IIngredient {
  ingredient_id: number;
  name: string;
  stock: number;
  unit: UnitEnum;
}

export interface IRecipe {
  recipe_id: number;
  name: string;
  ingredients: Array<IIngredient>;
}
