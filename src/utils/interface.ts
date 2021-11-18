import {UnitEnum} from "./enum";

export interface IIngredient {
	ingredient_id: number;
	name: string;
	stock: number;
	unit: UnitEnum;
}
