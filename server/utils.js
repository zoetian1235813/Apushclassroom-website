import crypto from "crypto";

export const isoNow = () => new Date().toISOString();

export const minutesFromNow = (minutes) =>
  new Date(Date.now() + minutes * 60_000).toISOString();

export const secondsFromNow = (seconds) =>
  new Date(Date.now() + seconds * 1000).toISOString();

export const generateNumericCode = (length = 6) => {
  const digits = [];
  for (let i = 0; i < length; i += 1) {
    digits.push(Math.floor(Math.random() * 10));
  }
  return digits.join("");
};

export const generateState = () => crypto.randomUUID();
