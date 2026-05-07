//imports -AK

import { readFile, writeFile } from "node:fs/promises";
import { participantsPath } from "../config/paths.js";

// Lecture du fichier JSON qui se trouvedans la variable participantsPath (reutilisable dans tout le fichier) -AK
const data = await readFile(participantsPath);

// On parse le JSON pour l'avoir sous forme de tableau d'objets (reutilisable dans tout le fichier) -AK
const participants = JSON.parse(data);


//fontion de creation d'un participant -AK
export async function createParticipant(name) {

  // Création d'un participant -AK
  const newParticipant = {
    id: participants.length + 1,
    name,
    score: 0
  };

  // Ajout ephemere d'un participant (la data s'efface a chaque redémarrage) -AK
  participants.push(newParticipant);

  // Sauvegarde du participant dans le fichier JSON -AK
  await writeFile(
    participantsPath,
    JSON.stringify(participants, null, 2) // transforme le json recu en entrée en string -AK
  );

  return newParticipant;
}

//fonction pour récupérer le classement des participants -AK
export async function getLeaderboard() {

  // Trier les participants par score décroissant -AK
  participants.sort((a, b) => b.score - a.score);

  return participants;
}