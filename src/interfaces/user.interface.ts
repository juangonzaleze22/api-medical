import { Auth } from "./auth.interface";

export interface User extends Auth {
  displayName: string;
  isGoogle?: boolean;
  photoURL?: string;
  isAdmin?: boolean;
  userId?: string
}