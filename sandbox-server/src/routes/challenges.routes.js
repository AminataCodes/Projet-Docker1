import { Router } from "express";
import { validateChallenge } from "../controllers/challenges.controller.js";
import { createChallenge } from "../controllers/challenges.controller.js";
import { getChallenges } from "../controllers/challenges.controller.js";

// Routeurs pour les challenges -YTM
const router = Router();

// Route pour créer un challenge -YTM
router.post("/", createChallenge);

// Route pour récupérer tous les challenges sans les réponses -YTM
router.get("/show", getChallenges);

// Route pour valider un challenge -YTM
router.post("/:id/validate", validateChallenge);

export default router;