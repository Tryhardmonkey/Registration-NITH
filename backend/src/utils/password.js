import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(plainPassword) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(plainPassword, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(plainPassword, storedHash) {
  const [salt, key] = storedHash.split(":");
  const hashBuffer = scryptSync(plainPassword, salt, KEY_LENGTH);
  const keyBuffer = Buffer.from(key, "hex");

  if (hashBuffer.length !== keyBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashBuffer, keyBuffer);
}
