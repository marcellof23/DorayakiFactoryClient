import { RouteProps } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Ingredient from "./pages/ingredient/ingredient";
import IngredientDetail from "./pages/ingredient/ingredient_detail";

export const routes: Array<RouteProps> = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/ingredient",
		component: Ingredient,
	},
	{
		path: "/ingredient/:id",
		component: IngredientDetail,
	},
];

export const privateRoutes: Array<RouteProps> = [];