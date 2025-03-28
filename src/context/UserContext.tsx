import React, { createContext, useContext } from "react";

export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  pfpic: string | null;
  created_at: string;
  status: boolean;
  premium: boolean;
  subdate: string | null;
  expdate: string | null;
  trialdate: string | null;
  trialexpdate: string | null;
  discord_code: string | null;
  notifications: object | null;
  email_stat: boolean;
} | null;

const UserContext = createContext<UserType>(null);

export const UserProvider = UserContext.Provider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
