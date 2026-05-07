import { URL } from "node:url";

//Chemin vers le fichier participants.json
export const participantsPath = new URL("../../data/participants.json", import.meta.url);

//Chemin vers le fichier challenges.json
export const challengesPath = new URL("../../data/challenges.json", import.meta.url);

//Chemin vers le fichier validation.json
export const validationPath = new URL("../../data/validation.json", import.meta.url);