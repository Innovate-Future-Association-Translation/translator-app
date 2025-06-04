export interface TranslationLanguage {
  value: string;
  label: string;
}

export interface TranslationPreference {
  language: string;
  autoTranslate: boolean;
}

export interface TranslationMessage {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  roomId: string;
  userId: string;
}

export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
}
