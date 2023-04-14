import { Router } from "express";
export const Route = Router();

import authController from "../controllers/auth.controller"

Route.post('/auth/registro', authController.registro);
Route.post('/auth/login', authController.login);
Route.get('/auth/perfil', authController.perfil);