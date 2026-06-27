import { Router } from "express";

import {
  getCharacters,
  getCharacterById,
} from "../controllers/charactersController.js";
import { validatePage, validateId } from "../middlewares/validateParams.js";

const router = Router();

router.get("/", validatePage, getCharacters);
router.get("/:id", validateId, getCharacterById);

export default router;
