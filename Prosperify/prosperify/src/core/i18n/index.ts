import type { Lang, EventCode } from './types';
import { eventMessages, errorMessages } from './messages';

/**
 * Récupère le message d'un événement selon la langue
 * @param code - Code de l'événement (ex: 'user.created')
 * @param lang - Langue ('en' | 'fr')
 * @returns Message traduit ou le code lui-même si non trouvé
 */
export function getEventMessage(code?: string, lang: Lang = 'en'): string | undefined {
  if (!code) return undefined;
  return eventMessages[lang]?.[code as EventCode] ?? code;
}

/**
 * Récupère le message d'erreur selon le code HTTP et la langue
 * @param code - Code HTTP (ex: 404, 500)
 * @param lang - Langue ('en' | 'fr')
 * @returns Message d'erreur traduit
 */
export function getErrorMessage(code?: number | string, lang: Lang = 'en'): string | undefined {
  if (code == null) return undefined;
  const key = String(code);
  return errorMessages[lang]?.[key] ?? `Unknown error (${key})`;
}

// Réexporte pour usage direct
export { eventMessages, errorMessages };
export * from './types';