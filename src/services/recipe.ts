import axios from "../lib/axios";
import { IRecipe } from "../utils/interface";

interface ICreateRecipe {
	name: string;
	Ingredients: IIngredientCreateRecipe[];
}

interface IIngredientCreateRecipe {
	ingredient_id: number;
	qty_required: number;
}

export const getRecipes = async (): Promise<Array<IRecipe>> => {
	const url = `/Recipe`;
	const res = await axios.get(url);
	return res.data.data;
};

export const getRecipe = async (recipe_id: number): Promise<IRecipe> => {
	const url = `/recipe/${recipe_id}`;
	const res = await axios.get(url);
	return res.data.data;
};

export const createRecipe = async (payload: ICreateRecipe) => {
	const url = `/recipe`;
	const res = await axios.post(url, payload);
	return res.data.data;
};

export const updateRecipe = async (payload: IRecipe) => {
  const url = `/recipe/${payload.recipe_id}`;
  const res = await axios.put(url, payload);
  return res.data.data;
};
