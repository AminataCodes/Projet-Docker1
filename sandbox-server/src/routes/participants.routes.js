import { Router } from "express";
import { getLeaderboard } from "../controllers/participants.controller.js";
import { createParticipant } from "../controllers/participants.controller.js";

// Routeurs pour les participants -AK
const router = Router();

// Route pour récupérer le classement des participants -AK
router.get("/leaderboard", getLeaderboard);

// Route pour créer un participant -AK
router.post("/", createParticipant);

export default router;