import express from "express";

import participantsRoutes from "./routes/participants.routes.js";
import challengesRoutes from "./routes/challenges.routes.js";

// Création de l'application Express
const app = express();

// Middleware pour parser le JSON dans le body des requêtes dans insomnia
app.use(express.json());

// Utilisation des routeurs pour les participants et les challenges
app.use("/participants", participantsRoutes);
app.use("/challenges", challengesRoutes);


// Route de santé pour vérifier que le serveur fonctionne
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});