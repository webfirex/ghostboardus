import crypto from "crypto";

// Constants
const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = crypto
  .createHash("sha256")
  .update("745b1d9a03fa5ec74f8405e6a46d7cd8b4c59c6f335a3755284026dce1edca95") // Replace this with your actual secret key
  .digest("base64")
  .slice(0, 32); // Ensure 32 bytes
const IV_LENGTH = 16; // AES block size

// Function to encode the user ID
export function encodeUserId(userId: string): string {
  const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(userId, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted; // Include IV in the result
}

// Function to decode the user ID
export function decodeUserId(encodedId: string): string | null {
  try {
    const [ivHex, encrypted] = encodedId.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error decoding user ID:", error);
    return null;
  }
}
