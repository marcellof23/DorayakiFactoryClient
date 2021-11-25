import axios from "../lib/axios";
import {IIngredient} from "../utils/interface";

export const getIngredients = async (): Promise<Array<IIngredient>> => {
	const url = `/ingredient`;
	const res = await axios.get(url);
	return res.data.data;
};

export const getIngredient = async (
	ingredient_id: number
): Promise<IIngredient> => {
	const url = `/ingredient/${ingredient_id}`;
	const res = await axios.get(url);
	return res.data.data;
};

export const updateIngredient = async (
	ingredient_id: number,
	payload: IIngredient
) => {
	const url = `/ingredient/${ingredient_id}`;
	const res = await axios.put(url, payload);
	return res.data.data;
};

export const createIngredient = async (payload: IIngredient) => {
	const url = `/ingredient`;
	const res = await axios.post(url, payload);
	return res.data.data;
};