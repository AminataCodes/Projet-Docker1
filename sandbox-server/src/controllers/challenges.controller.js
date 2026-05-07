import * as service from "../services/challenges.services.js";

// Contrôleur pour récupérer tous les challenges -YTM
export async function getChallenges(req, res) {

  try {

    // Appel service -YTM
    const challenges = await service.getChallenges();

    // Succès -YTM
    return res.status(200).json(challenges);

  } catch (err) {

    return res.status(500).json({
      error: "internal server error"
    });

  }

}

// Contrôleur pour créer un challenge -YTM
export async function createChallenge(req, res) {

  try {

    const { question, difficulte, reponse, points } = req.body;

    // Vérification champs obligatoires -YTM
    if (!question || !difficulte|| !reponse || points === undefined) {
      return res.status(400).json({
        error: "missing fields"
      });
    }

    // Vérification type points -YTM
    if (typeof points !== "number") {
      return res.status(400).json({
        error: "points must be a number"
      });
    }

    // Appel service -YTM
    const challenge = await service.createChallenge({
      question,
      difficulte,
      reponse,
      points
    });

    return res.status(201).json(challenge);

  } catch (err) {

    return res.status(500).json({
      error: "internal server error"
    });

  }

}

// Contrôleur pour valider un challenge -YTM
export async function validateChallenge(req, res) {

  try {

    // On récupère l’id du challenge dans l’URL -YTM
    const challengeId = Number(req.params.id);

    // On récupère participantId dans le body ainsi que la réponse -YTM
    const { participantId, reponse } = req.body;

    // Vérification body -YTM
    if (!participantId) {
      return res.status(400).json({
        error: "participantId is required"
      });
    }

    if (!reponse) {
      return res.status(400).json({
        error: "reponse is required"
      });
    }

    // Appel du service -YTM
    const result = await service.validateChallenge(
      challengeId,
      participantId,
      reponse
    );

    // Succès -YTM
    return res.status(200).json(result);

  } catch (err) {

    // Gestion erreurs personnalisées -YTM
    if (err.message === "challenge not found") {
      return res.status(404).json({
        error: err.message
      });
    }

    if (err.message === "participant not found") {
      return res.status(404).json({
        error: err.message
      });
    }

    if (err.message === "already validated") {
      return res.status(400).json({
        error: err.message
      });
    }

    // Erreur serveur -YTM
    return res.status(500).json({
      error: "internal server error"
    });

  }

}