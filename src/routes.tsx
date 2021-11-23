import { RouteProps } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Request from "./pages/request/request";
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
    path: "/request",
    component: Request,
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
