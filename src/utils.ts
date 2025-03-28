import { Result } from "./types.js";

export function tryCatch<T, E = Error>(callback: (...args: any[]) => T): Result<T, E> {
  try {
    const data = callback();
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as E };
  }
}
