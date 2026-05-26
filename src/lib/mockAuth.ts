import * as React from "react";

export type MockRole = "admin" | "artist";

export interface MockAccount {
  initials: "EJ" | "GJ";
  name: string;
  role: MockRole;
  homePath: string;
}

const STORAGE_KEY = "adforge.mockAccount";

export const mockAccounts: Record<MockRole, MockAccount> = {
  admin: {
    initials: "EJ",
    name: "EJ Admin",
    role: "admin",
    homePath: "/",
  },
  artist: {
    initials: "GJ",
    name: "GJ Artist",
    role: "artist",
    homePath: "/artist",
  },
};

function readRole(): MockRole {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "artist" ? "artist" : "admin";
}

export function setMockRole(role: MockRole) {
  window.localStorage.setItem(STORAGE_KEY, role);
  window.dispatchEvent(new CustomEvent("adforge:mock-role-change", { detail: role }));
}

export function useMockAccount() {
  const [role, setRole] = React.useState<MockRole>(() => readRole());

  React.useEffect(() => {
    function handleRoleChange() {
      setRole(readRole());
    }

    window.addEventListener("storage", handleRoleChange);
    window.addEventListener("adforge:mock-role-change", handleRoleChange);
    return () => {
      window.removeEventListener("storage", handleRoleChange);
      window.removeEventListener("adforge:mock-role-change", handleRoleChange);
    };
  }, []);

  return mockAccounts[role];
}
