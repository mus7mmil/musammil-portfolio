export const isCryptoSubtleSupported = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.crypto !== "undefined" &&
    typeof window.crypto.subtle !== "undefined" &&
    typeof window.crypto.subtle.digest === "function"
  );
};

async function generateAESKey(password: string): Promise<CryptoKey> {
  if (!isCryptoSubtleSupported()) {
    throw new Error(
      "Web Cryptography API (crypto.subtle) is not available in this context. Browsers require a Secure Context (HTTPS or localhost) for subtle crypto."
    );
  }
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await window.crypto.subtle.digest(
    "SHA-256",
    passwordBuffer
  );
  return window.crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  if (!isCryptoSubtleSupported()) {
    throw new Error(
      "Web Cryptography API (crypto.subtle) is not available in this context. Browsers require a Secure Context (HTTPS or localhost) for subtle crypto."
    );
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch encrypted model at ${url}: ${response.statusText}`
    );
  }
  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return window.crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
