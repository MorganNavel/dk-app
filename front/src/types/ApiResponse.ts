interface ApiResponse<T> {
  code: number;
  data?: T;
  error?: string | object;
}
