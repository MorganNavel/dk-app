import { toast } from "sonner";

export async function apiCall<T>(
  url: string,
  method: string = "GET",
  body?: any,
  options?: RequestInit
): Promise<T> {
  const config: RequestInit = {
    method,
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body);
  }
  const urlBase = process.env.API_BASE_URL || "http://192.168.1.27:3001";
  const response = await fetch(urlBase + url, config);

  if (!response.ok) {
    const error = await response.json();
    if (method !== "GET") toast.error(error.error);
    throw new Error(error.error);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
