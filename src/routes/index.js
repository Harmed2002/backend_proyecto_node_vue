import { Router } from "express";
export const Route = Router();

import authController from "../controllers/auth.controller"

Route.post('/auth/registro', authController.registro);