import React, { createContext, useContext } from "react";

export type AdminType = {
    id: string;
    name: string | null;
    email: string | null;
    created_at: string;
    status: boolean;
    role: string;
    commission1: number;
    commission2: number;
    reffcode: string;
    balance: string;
    paid: string;
} | null;

const AdminContext = createContext<AdminType>(null);

export const AdminProvider = AdminContext.Provider;

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};
