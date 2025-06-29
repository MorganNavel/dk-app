export interface ResponseType<K, T = any> {
  code: number;
  key?: K;
  data?: T;
  redirectTo?: string;
}
