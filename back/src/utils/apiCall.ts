export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Request<T> {
  url: string;
  method?: RequestMethods;
  body?: T;
  options?: Omit<RequestInit, "method" | "body">;
}

export async function apiCall<T, U>({
  url,
  method = "GET",
  body,
  options,
}: Request<T>): Promise<U> {
  // Configuration de la requête
  const config: RequestInit = {
    method,
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  // Ajout du corps à la requête si nécessaire
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body);
  }
  console.log(config);

  // Envoi de la requête
  const response = await fetch(url, config);
  if (!response.ok) {
    const error: U = await response.json();
    throw new Error(JSON.stringify(error));
  }
  // Retour des données de la réponse
  const data = await response.json();
  return data;
}
