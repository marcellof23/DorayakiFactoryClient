import axios from "../lib/axios";
import { IRecipe } from "../utils/interface";

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

export const updateRecipe = async (payload: IRecipe) => {
  const url = `/recipe/${payload.recipe_id}`;
  const res = await axios.put(url, payload);
  return res.data.data;
};
