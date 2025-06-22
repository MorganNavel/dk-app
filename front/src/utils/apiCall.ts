export async function apiCall(
  url: string,
  method: string = "GET",
  body?: any,
  options?: RequestInit
): Promise<Response> {
  const config: RequestInit = {
    method,
    ...options,
    credentials: "include",

    headers: {
      "Content-Type": "application/json",

      ...options?.headers,
    },
  };
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body);
  }

  const urlBase = "http://localhost:3000";
  return await fetch(urlBase + url, config);
}
