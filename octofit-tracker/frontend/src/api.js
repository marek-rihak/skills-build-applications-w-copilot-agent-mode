export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records;
  }

  return [];
}

export async function fetchResource(resource) {
  const response = await fetch(getApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}`);
  }

  const payload = await response.json();
  return normalizeApiResponse(payload);
}
