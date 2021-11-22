import { RouteProps } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Requests from "./pages/requests";
import Ingredient from "./pages/ingredient/ingredient";
import IngredientDetail from "./pages/ingredient/ingredient_detail";
import Recipe from "./pages/recipe/recipe";
import RecipeDetail from "./pages/recipe/recipe_detail";

export const routes: Array<RouteProps> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
];

export const privateRoutes: Array<RouteProps> = [
  {
    path: "/dashboard",
    component: Requests,
  },
  {
    path: "/ingredient",
    component: Ingredient,
  },
  {
    path: "/ingredient/:id",
    component: IngredientDetail,
  },
  {
    path: "/recipe",
    component: Recipe,
  },
  {
    path: "/recipe/:id",
    component: RecipeDetail,
  },
];
