/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_ML_PREDICTION_URL: string;
  readonly VITE_DL_PREDICTION_URL: string;
  readonly VITE_DEVBOT_API_KEY: string;
  readonly VITE_DEVBOT_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}