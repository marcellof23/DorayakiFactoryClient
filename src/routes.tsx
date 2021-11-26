import { RouteProps } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Request from "./pages/request/request";
import Ingredient from "./pages/ingredient/ingredient";
import NewIngredient from "./pages/ingredient/new_ingredient";
import Recipe from "./pages/recipe/recipe";
import RecipeDetail from "./pages/recipe/recipe_detail";
import AddRecipe from "./pages/recipe/new_recipe";
import Navbar from "./components/Navbar";

export const routes: Array<RouteProps> = [
	{
		path: "/login",
		component: Login,
	},
];

export const privateRoutes: Array<RouteProps> = [
	{
		path: "/request",
		component: Request,
	},
	{
		path: "/ingredient/new",
		component: NewIngredient,
	},
	{
		path: "/ingredient",
		component: Ingredient,
	},
	{
		path: "/recipe/new",
		component: AddRecipe,
	},
	{
		path: "/recipe",
		component: Recipe,
	},
	{
		path: "/recipe/:id",
		component: RecipeDetail,
	},
	{
		path: "/",
		component: Home,
	},
];
