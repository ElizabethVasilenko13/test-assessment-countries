declare interface Env {
  readonly NODE_ENV: string;
  [key: string]: string | undefined;
  readonly NG_APP_API_BASE_URL: string;
}

declare interface ImportMeta {
  readonly env: Env;
}

declare const _NGX_ENV_: Env;

declare namespace NodeJS {
  export interface ProcessEnv extends Env {}
}
