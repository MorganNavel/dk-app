export async function apiCall<T>(
  url: string,
  method: string = "GET",
  body?: any,
  options?: RequestInit
): Promise<T> {
  const config: RequestInit = {
    method,
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",

      ...options?.headers,
    },
  };
  console.log(config);
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body);
  }
  const urlBase = process.env.API_BASE_URL || "http://localhost:3001/api/v1";
  const response = await fetch(urlBase + url, config);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.code);
  }
  const data = await response.json();
  return data.data;
}
