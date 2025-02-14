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
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body);
  }
  if(process.env.NODE_ENV == "production") throw new Error("Not implemented"); 

  const urlBase =
    process.env.NODE_ENV == "development"
      ? "http://localhost:3001/api/v1"
      : "https://192.168.1.21:3001/api/v1";
  const response = await fetch(urlBase + url, config);
  if (!response.ok) {
    const error: T = await response.json();
    throw new Error(JSON.stringify(error));
  }
  const data = await response.json();
  return data.data;
}
