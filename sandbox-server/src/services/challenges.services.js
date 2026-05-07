//imports des fonctions et variables necessaire  -YTM
import { readFile, writeFile } from "node:fs/promises";
import { participantsPath, validationPath } from "../config/paths.js";
import { challengesPath } from "../config/paths.js";


//fonction pour récupérer les challenges sans les réponses -YTM
export async function getChallenges() {

  // Lecture fichier JSON qu'on peut utiliser dans tous les services de challenges -YTM
  const data = await readFile(challengesPath);

  //Transformation en objet javascript qu'on peut utiliser dans tous les services de challenges -YTM
  const challenges = JSON.parse(data);

  // On retire la réponse via un mapping pour ne pas l'envoyer au client -YTM
  const safeChallenges = challenges.map(challenge => {
    // On retourne tout sauf la réponse -YTM
    return {
      id: challenge.id,
      question: challenge.question,
      difficulte: challenge.difficulte,
      points: challenge.points
    };

  });
  
  return safeChallenges;

}

//fonction pour créer un challenge -YTM
export async function createChallenge(data) {
  // Création d'un challenge avec les données fournies -YTM
  const newChallenge = {
    id: challenges.length + 1,
    question: data.question,
    reponse: data.reponse,
    difficulte: data.difficulte,
    points: data.points
  };

  // Ajout temporairedu challenge à la liste des challenges -YTM
  challenges.push(newChallenge);

  // Enregistrement final du challenge dans le fichier challenges.json -YTM
  await writeFile(
    challengesPath,
    JSON.stringify(challenges, null, 2)
  );
  // Retour du challenge créé -YTM
  return newChallenge;
}

export async function validateChallenge(challengeId, participantId, reponse) {

  // Lecture challenges -YTM
  const challengesData = await readFile(challengesPath);
  const challenges = JSON.parse(challengesData);

  // Lecture participants -YTM
  const participantsData = await readFile(participantsPath);
  const participants = JSON.parse(participantsData);

  // Lecture validations -YTM
  const validationData = await readFile(validationPath);
  const validations = JSON.parse(validationData);

  // Recherche du challenge en fonction de son id -YTM
  const challenge = challenges.find(
    c => c.id === challengeId
  );

  //Renvoie l'erreur si le challenge n'existe pas avant de continuer -YTM
  if (!challenge) {
    throw new Error("challenge not found");
  }

  // Recherche participant en fonction de son id -YTM
  const participant = participants.find(
    p => p.id === participantId
  );

  // Renvoie l'erreur si le participant n'existe pas avant de continuer -YTM
  if (!participant) {
    throw new Error("participant not found");
  }

  // Vérifier si un meme utilisateur n'essaye pas de valider un meme challenge plusieurs fois -YTM
  const alreadyValidated = validations.find(
    v =>
      v.challengeId === challengeId &&
      v.participantId === participantId
  );

  // Si alreadyValidated existe, cela signifie que le participant a déjà validé ce challenge -YTM
  if (alreadyValidated) {
    throw new Error("already validated");
  }

  // Si la réponse est fausse, ajoute pas de points et retourne le message -YTM
  if (challenge.reponse !== reponse) {
    return {
      message: "wrong answer ",
      points: 0 
    };
  }

  // Ajouter les points au score du participant si la réponse est correcte -YTM
  participant.score += challenge.points;

  // Enregistrement de la validation dans le fichier validations.json (historique) -YTM
  const newValidation = {
    id: validations.length + 1,
    challengeId,
    participantId,
    participantReponse: reponse
  };

  validations.push(newValidation);

  // Sauvegarde participants avec le nouveau score -YTM
  await writeFile(
    participantsPath,
    JSON.stringify(participants, null, 2)
  );

  // Sauvegarde validations -YTM
  await writeFile(
    validationPath,
    JSON.stringify(validations, null, 2)
  );

  return {
    message: "challenge validated",
    points: challenge.points
  };

}