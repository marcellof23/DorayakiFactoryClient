import { DorayakiRequestStatus, UnitEnum } from "./enum";

export interface IUser {
  user_id: number;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IRequest {
  dorayakirequest_id: number;
  recipe_id: number;
  qty: number;
  status: DorayakiRequestStatus;
  created_at: Date;
  updated_at: Date;
  Recipe: IRecipe;
}

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
