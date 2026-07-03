export interface GeminiGenerateRequest {
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GeminiGenerateResponse {
  text: string;
}
