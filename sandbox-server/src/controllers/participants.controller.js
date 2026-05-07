import * as service from "../services/participants.services.js";

// Contrôleur pour créer un participant -AK
export async function createParticipant(req, res) {
  try {

    // On récupère le body envoyé -AK
    const { name } = req.body;

    // Vérification des données -AK
    if (!name) {
      return res.status(400).json({
        error: "name is required"
      });
    }

    // Appel du service -AK
    const participant = await service.createParticipant(name);

    // Succès -AK
    return res.status(201).json(participant);

  } catch (err) {

    // Erreur serveur -AK
    return res.status(500).json({
      error: "internal server error"
    });

  }
}

// Contrôleur pour récupérer le classement -AK
export async function getLeaderboard(req, res) {
  try {

    // Appel du service -AK
    const leaderboard = await service.getLeaderboard();

    // Succès -AK
    return res.status(200).json(leaderboard);

  } catch (err) {

    // Erreur serveur -AK
    return res.status(500).json({
      error: "internal server error"
    });

  }
}
