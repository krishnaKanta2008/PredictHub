/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_PREDICTION_URL: string;
  readonly VITE_PREDICTION_LSTM_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}